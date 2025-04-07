import { Header } from '../components/header';
import docta from '../images/docta.jpg';
import right from '../icons/images/arrowRight.png';
import point from '../icons/images/point.png';
import coeur from '../icons/images/coeur.png';
import left from '../icons/images/left.png';
import { useContext, useState } from 'react';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { Link, useNavigate } from 'react-router-dom';
import { tokenContexte } from '../contexte/tokenContexte';
import axios from 'axios';
import { useQuery } from 'react-query';
import { GroupeSkeleton } from '../skeletons/groupe';
export function PremierGroupe()
{
    const tab=['','','','','','','','','','','','','','','','']
    const categories=['etude biblique','priere et Meditation','louange et adoration','autres']
    const navigate=useNavigate()

    const {token}=useContext(tokenContexte)
    const {data:suggestion,isLoading}=useQuery({
        queryKey:['les-groupes'],
        queryFn:()=>axios.get(`${process.env.REACT_APP_BACKEND_URL}/les-groupes`,{
            headers:{
                "Authorization": "Bearer "+token
              }
        })
      })

      const rejoindre=(id,idbouton)=>{
        document.getElementById(idbouton).textContent='encours d\'adhésion...'
       axios.post(`${process.env.REACT_APP_BACKEND_URL}/rejoindre-groupe`, {id},{
           headers:{
               "Authorization": "Bearer "+token
             }
       }).then((res)=>{
           if(res.data.statut=='200'){
            document.getElementById(res.data.groupe.categorie+res.data.groupe.id).style.display='none'
            document.getElementById('deja'+res.data.groupe.categorie+res.data.groupe.id).style.display='flex'
           }else{
            document.getElementById(res.data.groupe.categorie+res.data.groupe.id).style.display='none'
            document.getElementById('deja'+res.data.groupe.categorie+res.data.groupe.id).textContent='Vous êtes déjà membres'
            document.getElementById('deja'+res.data.groupe.categorie+res.data.groupe.id).style.display='flex'
           }
         })
       
     }
    
   return <>
    <div className="flex flex-col justify-center items-center w-full">
    <div className='mt-4 flex flex-row justify-center items-start w-full deuxiemedivnavbar'>
       
      <div className="w-full px-2 h-full flex flex-col items-center justify-center ">
      <div className="w-full flex flex-col items-center gap-y-3">
      <div className="mb-2 flex flex-row justify-between items-center w-full px-6">
      <span onClick={()=>{navigate(-1)}} className='cursor-pointer'><img className='float-left' style={{height:'16px'}} src={left} alt="retour premiers amis" /></span>
      <Link to={'/'} className="btn bg-violet-700 text-white text-sm hover:bg-violet-600 focus:bg-violet-600 px-8 flex flex-row justify-center items-center gap-x-2">Terminer</Link>
      </div>
 
 {/* suggestion de groupes  */}
 <p className="text-center text-xl text-violet-700 px-2 rounded-lg mt-3">Suggestion de groupes par catégorie :</p>
 <div className="h-full w-full groupeoverflow pb-24">
 {
     !isLoading ? Object.keys(suggestion?.data?.lesgroupes).map((c)=>{
         return <>
         <div className="flex flex-row justify-between items-center w-full text-xs my-2 px-2"> <span className='font-bold'>{c.toUpperCase()}</span> </div>
       <div className='h-full w-full flex flex-row justify-between flex-nowrap items-center gap-x-4 pb-3 mb-3 border-b-2 border-b-gray-300 overflow-x-auto px-1 groupeoverflow'>
       {
             suggestion && suggestion?.data?.lesgroupes[c]?.map((e,i)=>{
                 return <div class="" style={{width:'18rem',height:'auto'}}>
               <div style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+e.photo})`,backgroundPosition:'center',backgroundSize:'cover',height:'12rem'}}></div>
                 <div style={{width:'18rem',height:'16rem'}} class="card-body bg-white">
                   <h5 class="card-title font-bold text-violet-700">{e.nom.length>50 ? e.nom.substr(0,50)+'...' : e.nom}</h5>
                   <p class="card-text gap-y-2 flex flex-col"><span><span className=" text-violet-700">Objectif du groupe :</span> {e.objectif.length>60 ? e.objectif.substr(0,60)+'...' : e.objectif}</span> <span className="text-xs text-gray-700 flex flex-row start items-center "> <span> {e.membre.split(",").length-1} membres&nbsp; </span> <span><img style={{height:'5px'}} src={point} alt="" /></span> &nbsp;<span className='flex flex-row justify-center items-center gap-x-1'>  <img style={{height:'10px'}} src={coeur} alt="" />{e.like}</span> </span>  <span className='text-xs mb-1'>Crée par {e.user?.nom?.toUpperCase().substr(0,20)}</span> </p>
                   <span className="flex flex-row gap-x-3">
                  <button id={c+e.id} onClick={()=>{rejoindre(e.id,c+e.id)}} class="btn focus:bg-violet-600 active:bg-violet-600 bg-violet-700 text-white mt-1 hover:bg-violet-600 w-full">Rejoindre</button>
                  <button style={{display:'none'}} id={'deja'+c+e.id} class="btn  mt-1 w-full">Vous êtes membres</button>
                  </span>
                 </div>
               </div>
             })
         }
 </div>
         </>
     })  : <GroupeSkeleton/>
 }
 </div>
 
 </div>
       </div>
        
     </div>
 
    </div>
 
 <BackToTop/>
 
 
 
 
     </>
}