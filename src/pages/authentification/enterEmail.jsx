import { Link, useNavigate } from "react-router-dom";
import left from '../../icons/images/left.png';
import axios from "axios";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";

export function EnterEmail(){
    const navigate=useNavigate();
    const [email,setEmail]=useState()
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
    const [erreur, setErreur]=useState('')

    const forgotPassword=()=>{
        // event.preventDefault()
        // const formData=new FormData()
      
        // formData.append('email',email)
       axios.post(`${process.env.REACT_APP_BACKEND_URL}/forgot-password`,{email}).then((res)=>{
        console.log(res.data)
        if(res?.data?.statut=='500'){
          setErreur(res.data?.message)
          setLoading(false)
        }else if(res?.data?.statut=='200'){
          // console.log(res.data)
          navigate('/forgot-notice/'+email)
        }
      }).catch((err)=>{
        console.log(err)
        setLoading(false)
        toast('Une erreur s\'est produite. Veuillez reessayer svp.')
      })
    }
    return <>
     <ToastContainer/>
    <div class="card text-center" style={{width:"300px;"}}>
    <p className="text-start mb-3 flex flex-row justify-start items-center gap-x-4 w-full pl-3 mt-3"><span onClick={()=>{navigate(-1)}} className='cursor-pointer'><img style={{height:'16px'}} src={left} alt="" /></span></p>
    <div class="card-header text-sm text-white bg-violet-700 text-white">Réinitialisation du mot de passe</div>
    <div class="card-body px-5">
        <p class="card-text py-2">
        Entrez votre adresse e-mail et nous vous enverrons un e-mail contenant des instructions pour réinitialiser votre mot de passe.
        </p>

        <p className="text-red-700 font-medium">{erreur}</p>
        <div>
        <div  class="form-outline">
        <label class="form-label position-relative top-4 text-sm" for="typeEmail">Votre adresse e-mail</label>
        <input required type="email"  onChange={(e)=>{ setEmail(e.target.value) }} id="typeEmail" class="form-control my-3" />
           
        </div>
        <button
        onClick={()=>{forgotPassword(); setLoading(true) ;toast('Un instant svp...')}}
                  type="submit"
                  className="flex flex-row gap-x-2 items-center w-full justify-center rounded-md bg-violet-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:violet-700 "
                >
                 <span>Envoyer</span>
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