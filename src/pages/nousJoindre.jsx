import fc from '../icons/images/fc.jpg';
import { Link, useNavigate } from "react-router-dom";
import left from '../icons/images/left.png';
import { Header } from '../components/header';
import { useContext, useState } from 'react';
import { tokenContexte } from '../contexte/tokenContexte';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';


export default function NousJoindre() {
    const navigate=useNavigate()
    const {token}=useContext(tokenContexte)
    const [motif, setMotif]=useState()
    const [email, setEmail]=useState()
    const send=()=>{
      toast('envoi en cours')
      token ?  axios.post(`${process.env.REACT_APP_BACKEND_URL}/nous-joindre-fc`,{motif,email},{
          headers:{
              "Authorization": "Bearer "+token,
             
            }
      }).then((res)=>{
          if(res.data.statut=='200'){
        toast('Informations envoyées')
     
          }
        }).catch((err)=>{
        console.log(err)
        }) : navigate('/login')
    }
    return (
      <>
      <ToastContainer/>
       <div className="h-full w-full flex flex-col justify-center items-center">
       <Header/>
       <div className="flex flex-col justify-center px-3 py-12 mt-10 loginform">
       <span onClick={()=>{navigate(-1)}} className='cursor-pointer'><img className='float-left' style={{height:'16px'}} src={left} alt="retour premiers amis" /></span>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex flex-row justify-center items-center gap-x-2 mt-3">
            <img style={{height:'35px',borderRadius:'8px'}}
              alt="logo foi chretienne"
              src={fc}
            />
            <span className="font-bold text-violet-700 text-xl">FOI CHRÉTIENNE</span>
            </div>
            <h2 className="mt-10 text-center text-xl font-bold tracking-tight text-violt-700">
             Joignez nous !
            </h2>
          </div>
  
          <div className="mt-10 w-full">
            <div className="space-y-6 w-full">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                 Pourquoi voulez-vous nous joindre ?
                </label>
                <div className="mt-2 w-full">
                  <textarea onChange={(e)=>{setMotif(e.target.value)}} className='w-full rounded-lg focus:border-violet-700 focus:border-2 border-solid' rows={6} placeholder='Entrez les details' name="" id=""></textarea>
                </div>
              </div>
  
              <div>
                <div className="flex flex-row items-center justify-between">
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 position-relative top-1">
                Votre adresse e-mail
                  </label>
                </div>
                <div className="mt-2">
                  <input
                  onChange={(e)=>{setEmail(e.target.value)}}
                    id="email"
                    name="email"
                    type="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-violet-700 focus:border-violet-700 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>

                <button
                disabled={(motif?.trim()?.length>0 && email?.trim()?.length>0) ? false : true}
                onClick={send}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-violet-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:violet-700 "
                >
                 Envoyer
                </button>
              

              </div>
            </div>
  
           
          </div>
        </div>
    
       </div>
       </>
    )
  }
  