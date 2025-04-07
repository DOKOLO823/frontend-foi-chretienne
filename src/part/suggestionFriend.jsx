import { Link, useNavigate } from 'react-router-dom';
import right from '../icons/images/right.png';
import docta from '../images/docta.jpg';
import axios from 'axios';
import { useQuery } from 'react-query';
import { tokenContexte } from '../contexte/tokenContexte';
import { useContext } from 'react';

export function Suggestion()
{
  const navigate=useNavigate()
   const {token}=useContext(tokenContexte)
   const {data:pourriezconnaitre,isLoading}=useQuery({
    queryKey:['part-suggestion-ami-auth'],
    queryFn:()=>token ? axios.get(`${process.env.REACT_APP_BACKEND_URL}/part-suggestion-ami-auth`,{
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
      console.log(res.data)
       }
     }).catch((err)=>{
      if(err.response?.data?.message?.includes('Unauthenticated')){
        navigate('/login')
    }
     })
   
 }
    return <>
   {pourriezconnaitre?.data?.suggestion?.length>0 &&
     <div className='flex flex-col justify-center items-start w-full'>
    
     <div className='flex flex-row justify-between items-center w-full pt-3 pb-2 px-2 potentialfriends'>
     <span className='text-sm'>Les frères et soeurs en Christ que vous pourriez connaitre</span>
 </div>
  
    <div className='w-full flex flex-row justify-between items-center gap-x-4 overflow-x-auto px-2'>
    {pourriezconnaitre && pourriezconnaitre?.data?.suggestion.map((e)=>{
      return  <div style={{width:'25rem',height:'19rem'}} class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-row justify-center items-center">
    
      <div style={{width:'19rem',height:'17rem'}} class="flex flex-col items-center w-full mt-6 gap-y-2">
      <Link to={'/profile/'+e.id} className='text-decoration-none flex flex-col items-center'>
          <div style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+e.pp})`,backgroundPosition:'center',backgroundSize:'cover'}} className="w-24 h-24 rounded-full hover:scale-105 hover:duration-700"></div>
         <span class=" text- font-medium text-violet-700">{e.nom && e?.nom[0]?.toUpperCase()+e.nom?.slice(1)?.substring(0,20)} {e.prenom && e.prenom.substring(0,18)}</span></Link>
          <span class="text-sm text-gray-500 dark:text-gray-400 position-relative -top-1">{e.pseudo && e.pseudo?.substring(0,32)}</span>
          <span className='text-xs'>{e.commun && e.commun>0 ? e.commun+' '+'Ami(e)s en commun' : ''}</span>
          <div class="flex mt-4 md:mt-6 ">
              <a  id={'bouton'+e.id} onClick={()=>{ajouter(e.id,'bouton'+e.id)}} class="inline-flex cursor-pointer text-decoration-none items-center px-4 py-2 text-xs font-medium text-center text-white bg-violet-700 rounded-lg hover:bg-violet-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ajouter comme ami(e)</a>
            
          </div>
      </div>
  </div>
    }
)}
</div>
<span className=' w-full mt-2'><Link to={'/amitie'} className='flex flex-row justify-center items-center gap-x-2 text-decoration-none hover:text-violet-700'><span>Voir plus</span> <img className='voirplusfriend' style={{height:'13px'}}  src={right} alt="" /></Link></span>
</div>
   }
    </>
}