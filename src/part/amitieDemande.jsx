import { Link, useNavigate } from "react-router-dom"
import { tokenContexte } from "../contexte/tokenContexte"
import { useContext } from "react"
import axios from "axios"
import { useQuery } from "react-query"
import { DemandeSkeleton } from "../skeletons/demande"

export function AmitieDemande (){
    const tab=['','','','','','','','','','','','','','','','']

    const navigate=useNavigate()
    const {token}=useContext(tokenContexte)
    const {data:demandes,isLoading}=useQuery({
     queryKey:['demande-amitie'],
     queryFn:()=>token && axios.get(`${process.env.REACT_APP_BACKEND_URL}/demade-amitie`,{
       headers:{
         "Authorization": "Bearer "+token
       }
     })
   })
 
   const accepter=(iddemandeur,idbouton)=>{
     document.getElementById(idbouton).textContent='en cours...'
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/accepter-demande`, {iddemandeur},{
        headers:{
            "Authorization": "Bearer "+token
          }
    }).then((res)=>{
        if(res.data.statut=='200'){
        document.getElementById(idbouton).textContent='Vous êtes amis'
        }else{
       
        }
      }).catch((err)=>{
        if(err.response?.data?.message?.includes('Unauthenticated')){
          navigate('/login')
      }
      })
    
  }

  const refuser=(iddemandeur,idbouton)=>{
    document.getElementById(idbouton).textContent='rejet en cours...'
   axios.post(`${process.env.REACT_APP_BACKEND_URL}/refuser-demande`, {iddemandeur},{
       headers:{
           "Authorization": "Bearer "+token
         }
   }).then((res)=>{
       if(res.data.statut=='200'){
       document.getElementById(idbouton).textContent='Demande rejetée'
       }else{
      
       }
     }).catch((err)=>{
      navigate('/login')
     })
   
 }

    return <>
      <div className="h-full flex flex-row justify-center flex-wrap items-center gap-4 pb-24">
     {
         demandes ? demandes?.data?.demandes?.map((e)=>{
             return <div style={{width:'300px'}} className='flex flex-col pb-3 border-gray-300 border-1 rounded-lg'>
          <Link to={'/profile/'+e.id} className='text-decoration-none'>
          <div className="flex flex-row px-4 py-2 gap-x-2">
            <div style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+e.pp})`,backgroundPosition:'center',backgroundSize:'cover'}} className='h-12 w-12 rounded-full'></div>
             <div className='flex flex-col justify-start gap-y-2 text-sm '>
                 <span style={{color:'rgb(109 40 217 / var(--tw-bg-opacity, 1))'}} className='font-bold '>{e.nom && e?.nom[0]?.toUpperCase()+e?.nom?.slice(1)?.substring(0,20)} {e.prenom && e.prenom.substring(0,18)}</span><span style={{color:'black'}} className='text-xs'>{e.commun && e.commun>0 ? e.commun+' '+'Ami(e)s en commun' : ''}</span>
             </div>
            </div>
          </Link>
             <span className='flex flex-row justify-center items-center gap-x-4 w-full'>
                     <button id={'bouton'+e.id} onClick={()=>{accepter(e.id,'bouton'+e.id)}} className="btn bg-violet-700 text-white text-sm hover:bg-violet-600 focus:bg-violet-600">Accepter</button><button id={'boutonrefuser'+e.id} onClick={()=>{refuser(e.id,'boutonrefuser'+e.id)}} className="btn bg-gray-300 text-sm hover:bg-gray-200 focus:bg-gray-200 focus:text-black hover:text-violet-700">Refuser</button>
                 </span>
         </div>
         }): <DemandeSkeleton/>
     }
   </div>
    </>
}