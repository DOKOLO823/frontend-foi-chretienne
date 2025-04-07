import { Link, useNavigate } from "react-router-dom"
import { tokenContexte } from "../contexte/tokenContexte"
import { useContext } from "react"
import { useQuery } from "react-query"
import axios from "axios"
import { SuggestionAmi } from "../skeletons/suggestionami"


export function AmitieSuggestion (){
    
    const navigate=useNavigate()
    const {token}=useContext(tokenContexte)
    const {data:suggestion,isLoading}=useQuery({
     queryKey:['all-suggestion-ami'],
     queryFn:()=>token ? axios.get(`${process.env.REACT_APP_BACKEND_URL}/all-suggestion-ami`,{
       headers:{
         "Authorization": "Bearer "+token
       }
     }) : axios.get(`${process.env.REACT_APP_BACKEND_URL}/part-suggestion-ami-guest`)
   })
 
   const ajouter=(idevalueur,idbouton)=>{
     document.getElementById(idbouton).textContent='ajout en cours...'
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/ajouter-comme-ami`, {idevalueur},{
        headers:{
            "Authorization": "Bearer "+token
          }
    }).then((res)=>{
        if(res.data.statut=='200'){
        document.getElementById(idbouton).textContent='demande envoyée'
        }else{
       
        }
      }).catch((err)=>{
        if(err.response?.data?.message?.includes('Unauthenticated')){
          navigate('/login')
      }
      })
    
  }

  console.log(suggestion)
  

    return <>
     <div className="h-full flex flex-row justify-center flex-wrap items-center gap-4 pb-24">
     {
         suggestion ? suggestion?.data?.suggestion?.map((e)=>{
             return <div style={{width:'300px'}} className='flex flex-col pb-3 border-gray-300 border-1 rounded-lg'>
          <Link to={'/profile/'+e?.id} className='text-decoration-none'>
          <div className="flex flex-row px-4 py-2 gap-x-2">
            <div style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+e?.pp})`,backgroundPosition:'center',backgroundSize:'cover'}} className='h-12 w-12 rounded-full'></div>
             <div className='flex flex-col justify-start gap-y-2 text-sm '>
                 <span style={{color:'rgb(109 40 217 / var(--tw-bg-opacity, 1))'}} className='font-bold '>{e.nom && e?.nom[0]?.toUpperCase()+e?.nom?.slice(1)?.substring(0,20)} {e.prenom && e?.prenom?.substring(0,18)}</span><span style={{color:'black'}} className='text-xs'>{e.commun && e.commun>0 ? e.commun+' '+'Ami(e)s en commun' : ''}</span>
             </div>
            </div>
          </Link>
             <span className='flex flex-row justify-center items-center w-full'>
                     <button id={'bouton'+e.id} onClick={()=>{ajouter(e.id,'bouton'+e.id)}} className="btn bg-violet-700 text-white text-sm hover:bg-violet-600 focus:bg-violet-600">Ajouter comme ami(e)</button>
                 </span>
         </div>
         }):<SuggestionAmi/>
     } 
   </div>
    </>
}