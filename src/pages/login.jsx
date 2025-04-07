import axios from 'axios';
import fc from '../icons/images/fc.jpg';
import eye from '../icons/images/eye.png'
import hidden from '../icons/images/hidden.png'
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';
import { useContext, useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { tokenContexte } from '../contexte/tokenContexte';
import { toast, ToastContainer } from 'react-toastify';

export default function Login() {
 
  const {token, addToken}=useContext(tokenContexte)
  useEffect(()=>{
    if(token){
      navigate(-1)
    }
  },[])

  let [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  let [color, setColor] = useState("#ffffff");
  const [erreur, setErreur]=useState('')
const [email,setEmail]=useState('')
const [password, setPassword]=useState('')
  const login=(event)=>{
    event.preventDefault()
   const formData=new FormData()
   setLoading(true)
   formData.append('email',email)
   formData.append('password',password)
   axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, formData).then((res)=>{
    if(res.data.statut=='500'){
      setErreur(res.data.message)
      setLoading(false)
    }else{
      addToken(res.data.token)
      localStorage.setItem('token_foi_chretienne',JSON.stringify(res.data.token))
      setLoading(false)
      navigate('/')
    }
  }).catch((err)=>{
      setLoading(false)
      toast('Une erreur s\'est produite. Veuillez réessayer svp.')
  })

 

}

 // look passowrd 
 const [lookpassword, setLookpassword]=useState(true)

    return (
      <>
       <ToastContainer/>
       <div className="h-full w-full flex flex-col justify-center items-center">
       <div className="flex flex-col justify-center px-3 py-12 loginform">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex flex-row justify-center items-center gap-x-2">
            <img style={{height:'35px',borderRadius:'8px'}}
              alt="logo foi chretienne"
              src={fc}
            />
            <span className="font-bold text-violet-700 text-xl">FOI CHRÉTIENNE</span>
            </div>
            <h2 className="mt-10 text-center text-xl font-bold tracking-tight text-violt-700">
              Connectez-vous à votre compte
            </h2>
            <p className="text-center text-red-700 font-medium mt-3">{erreur}</p>
          </div>
  
          <div className="mt-10 w-full">
            <form onSubmit={login} className="space-y-6 w-full">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Addresse e-mail
                </label>
                <div className="mt-2">
                  <input
                  onChange={(e)=>{ setEmail(e.target.value) }}
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-violet-700 focus:border-violet-700 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div className='w-full'>
                <div className="flex flex-row items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 position-relative top-1">
                   Mot de passe
                  </label>
                  <img onClick={()=>{setLookpassword(!lookpassword)}} src={lookpassword ? eye : hidden} className='h-6 position-relative right-4 top-10' alt="" />
                </div>
                <div className="mt-2 flex flex-row items-center w-full">
                  <input
                  onChange={(e)=>{ setPassword(e.target.value) }}
                    id="password"
                    name="password"
                    type={lookpassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-violet-700 focus:border-violet-700 sm:text-sm/6"
                  />
                  
                </div>
              </div>
  
              <div>

              <div className="flex flex-row justify-between text-xs font-medium mb-4">
                    <span className="flex flex-row justify-center items-center gap-x-2">
                        <input type="checkbox" /><span>Se souvenir de moi</span>
                    </span>
                    <Link to={'/enter-email'} className="font-semibold text-violet-700 hover:text-violet-600 text-decoration-none">
                      Mot de passe oublié?
                    </Link>
                  </div>

                <button
                  type="submit"
                  className="flex flex-row gap-x-2 items-center w-full justify-center rounded-md bg-violet-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:violet-700 "
                >
                 <span>Se connecter</span>
                  <ClipLoader color={color}  loading={loading}  size={30}
                 />
                </button>
              

              </div>
            </form>
  
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Vous n'avez pas de compte?{' '}
              <Link to={'/signup'} className="font-semibold text-violet-600 hover:text-violet-700 underline">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
    
       </div>
       </>
    )
  }
  