import fc from '../icons/images/fc.jpg';
import { Link, useNavigate } from "react-router-dom";
import left from '../icons/images/left.png';
import { Header } from '../components/header';
import { tokenContexte } from '../contexte/tokenContexte';
import { userContexte } from '../contexte/userContexte';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useContext, useState } from 'react';


export default function EnvoyerSuggestion() {

    const navigate=useNavigate()
    const {token}=useContext(tokenContexte)
    const [suggestion, setSuggestion]=useState()
    const send=()=>{
      toast('envoi en cours')
      token ?  axios.post(`${process.env.REACT_APP_BACKEND_URL}/suggestion-fc`,{suggestion},{
          headers:{
              "Authorization": "Bearer "+token,
              
            }
      }).then((res)=>{
          if(res.data.statut=='200'){
        toast('Suggestion envoyée. Merci !')
     
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
           Merci d'envoyer une suggestion pour l'amélioration de cette plateforme chrétienne.
            </h2>
          </div>
  
          <div className="mt-10 w-full">
            <div className="space-y-6 w-full">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-900">
                 Quelle(s) est(sont) votre(vos) suggestion(s) ?
                </label>
                <div className="mt-2 w-full">
                  <textarea onChange={(e)=>{setSuggestion(e.target.value)}} className='w-full rounded-lg focus:border-violet-700 focus:border-2 border-solid' rows={6} placeholder='Entrez les details' name="" id=""></textarea>
                </div>
              </div>
  
             
  
              <div>
                <button
                onClick={send}
                disabled={suggestion?.trim()?.length>0 ? false : true}
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
  