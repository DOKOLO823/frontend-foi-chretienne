import { Header } from '../components/header';
import docta from '../images/docta.jpg';
import right from '../icons/images/arrowRight.png';
import { useContext, useEffect, useState } from 'react';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { tokenContexte } from '../contexte/tokenContexte';
import { SuggestionAmi } from '../skeletons/suggestionami';
export function PremierAmi()
{
     const {token}=useContext(tokenContexte)
    const {data:suggestion,isLoading}=useQuery({
        queryKey:['all-suggestion-ami'],
        queryFn:()=>axios.get(`${process.env.REACT_APP_BACKEND_URL}/all-suggestion-ami`,{
            headers:{
                "Authorization": "Bearer "+token
              }
        })
      })
      const ajouter=(idevalueur)=>{
         document.getElementById('bouton'+idevalueur).textContent='ajout encours...'
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/ajouter-comme-ami`, {idevalueur},{
            headers:{
                "Authorization": "Bearer "+token
              }
        }).then((res)=>{
            if(res.data.statut=='200'){
             document.getElementById('bouton'+res.data.idevalueur).textContent='demande envoyée'
            }
          })
        
      }
    return <>
   <div className="flex flex-col justify-center items-center w-full">
    <div className='mt-4 flex flex-row justify-center items-start w-full deuxiemedivnavbar'>
       
      <div className="w-full px-2 h-full flex flex-col items-center justify-center ">
      <div className="w-full flex flex-col items-center gap-y-3">
      <div className="mb-2">
      <Link to={'/premiers-groupes'} className="btn bg-violet-700 text-white text-sm hover:bg-violet-600 px-8 flex flex-row justify-center items-center gap-x-2">Passer <img style={{height:'20px'}} src={right} alt="right foi chretienne" /> </Link>
      </div>
      <p className='mb-2 w-full flex flex-row justify-center'><span>Suggestion d'ami(e)s :</span></p>
      <div className="h-full flex flex-row justify-center flex-wrap items-center gap-4 pb-24">
        {
            !isLoading ? suggestion?.data?.suggestion?.map((e)=>{
                return <div key={e.id} style={{width:'300px'}} className='flex flex-row border-gray-300 border-1 px-4 py-2 rounded-lg gap-x-2'>
                <div style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+e.pp})`,backgroundPosition:'center',backgroundSize:'cover'}} className='h-12 w-12 rounded-full block'></div>
                <div className='flex flex-col justify-start gap-y-2 text-sm '>
                    <span className='font-bold'>{e.nom.substring(0,15).toUpperCase()+" "+e.prenom.substring(0,10).toUpperCase()}</span><span className='text-xs'>{e.pseudo && (e.pseudo.length>32 ? e.pseudo.substring(0,32).toLowerCase()+"..." : e.pseudo.substring(0,32).toLowerCase())}</span>
                    <span className='flex flex-row justify-center items-center gap-x-4 '>
                    <button id={'bouton'+e.id} onClick={()=>{ajouter(e.id)}} className="btn bg-violet-700 text-white text-sm hover:bg-violet-600 focus:bg-violet-600">Ajouter comme ami(e)</button>
                    </span>
                </div>
            </div>
            }) : <SuggestionAmi/>
        }
      </div>
      </div>

      </div>
       
    </div>

   </div>

<BackToTop/>
    </>
}