import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader";
import droite from '../../icons/images/flechedroite.png';

export function EmailVerify(){
    // let [loading, setLoading] = useState(true);
    // const [reponse, setReponse]=useState(false)
    // let [color, setColor] = useState("black");
    // const [erreur, setErreur]=useState('')
    const navigate=useNavigate()

    // const {id}=useParams('id')
    // const {token}=useParams('token')
    // const verification=async()=>{
    //   await axios.post(`${process.env.REACT_APP_BACKEND_URL}/verify-email`,{id,token} ).then((res)=>{
    //     console.log(res.data)
    //     if(res.data?.statut=='200'){
    //       localStorage.setItem('token_foi_chretienne',JSON.stringify(res.data?.token))
    //      setReponse(true)
    //      setLoading(false)
    //     }else if(res.data?.statut=='500'){
    //       setErreur(res.data?.message)
    //       setLoading(false)
    //     }
    //     })
    // }
    // useEffect(()=>{
    //   verification()
    // },[])
    
    return <>
    {/* <h2 className="text-xl flex flex-row items-center p-3 text-red-700 font-medium">{erreur}</h2> */}
   {/* <span style={{display:loading==false ? 'none' : 'flex'}} className="text-xl flex flex-row items-center p-3">  <span>En cours de vérification...</span>  <ClipLoader color={color}  loading={loading}  size={30}/> </span> */}
   <div className="w-full flex flex-col p-2">
    <p className="text-center text-green-700">Félicitations ! Votre inscription a réussie.</p>
    <a href={'/premiere-suggestion'} className="w-full text-center text-white bg-violet-700 font-medium flex flex-row items-center justify-center gap-x-2 rounded-lg py-2 text-decoration-none"><span>Continuer</span> <img style={{height:'25px'}} src={droite} alt="" /> </a>
    </div>
    </>
}