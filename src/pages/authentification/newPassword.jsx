import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import { tokenContexte } from "../../contexte/tokenContexte";

export function NewPassword(){

    const {email}=useParams('email')
    // const {tokene}=useParams('token')
    const [tokene, setTokene]=useState(useParams('token')?.token)
     const {token}=useContext(tokenContexte)
    const [password, setPassword]=useState()
     let [loading, setLoading] = useState(false);
     let [color, setColor] = useState("#ffffff");
     const [erreur, setErreur]=useState('')
     const navigate=useNavigate();

      const changePassword=()=>{
       
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/change-password`, {email,tokene,password}).then((res)=>{
          console.log(res.data)
              setLoading(false)
            if(res.data.statut=='500'){
              setErreur(res.data.message)
              setLoading(false)
            }else if(res.data.statut=='404'){
                setErreur('Les informations sont insuffisantes')
                setLoading(false)
            }
            else if (res.data.statut=='200'){
              navigate('/login')
            }
          }).catch((err)=>{
            setLoading(false)
            console.log(err)
            setErreur('Une erreur s\'est produite veuillez reessayer svp.')
          })
      }

    return <>
     <ToastContainer/>
    <div class="card text-center" style={{width:"300px;"}}>
    <div class="card-header text-sm text-white bg-violet-700 text-white">Nouveau mot de passe</div>
    <div class="card-body px-5">
        <p class="card-text py-2">
        Entrez le nouveau mot de passe.
        </p>
        <p className="text-center text-red-700 font-medium">{erreur}</p>
        <div>
        <div data-mdb-input-init class="form-outline">
        <label class="form-label position-relative top-4 text-sm" for="motdepasse">Votre nouveau mot de passe</label>
        <input required name="password"  onChange={(e)=>{ setPassword(e.target.value) }} type="password" id="motdepasse" class="form-control my-3" />
           
        </div>
        <button
        onClick={()=>{changePassword();setLoading(true)}}
       
                  type="submit"
                  className="flex flex-row gap-x-2 items-center w-full justify-center rounded-md bg-violet-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:violet-700 "
                >
                 <span>Valider</span>
                  <ClipLoader color={color}  loading={loading}  size={30}
                 />
                </button>
        </div>
        <div class="d-flex justify-content-between mt-4 text-xs">
            <Link className="hover:text-violet-700" to={'/login'}>Se connecter</Link>
            <Link className="hover:text-violet-700" to={'/signup'}>Creer un compe</Link>
        </div>
    </div>
</div>
    </>
}