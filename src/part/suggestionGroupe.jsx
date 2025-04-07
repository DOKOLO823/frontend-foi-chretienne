import { Link, useNavigate } from 'react-router-dom';
import right from '../icons/images/right.png';
import docta from '../images/docta.jpg';
import point from '../icons/images/point.png';
import coeur from '../icons/images/coeur.png';
import coeurv from '../icons/images/coeurv.png';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Quelquegroupe } from '../skeletons/quelquegroupe';
import { useContext } from 'react';
import { tokenContexte } from '../contexte/tokenContexte';
import { userContexte } from '../contexte/userContexte';

export function SuggestionGroupe()
{
  const tab=['','','','','','','','','','','','','','']
   // liker un groupe suggestion
  //  const likeramensuggestion=(id,c)=>{
  //   if(document.getElementById(id+'iconcoeursuggestion'+c).src==coeur){
  //     document.getElementById(id+'iconcoeursuggestion'+c).src=coeurv
  //      document.getElementById(id+'iconcoeursuggestion'+c).style.transform='scale(1.2)'
  //   }else{
  //     document.getElementById(id+'iconcoeursuggestion'+c).src=coeur
  //      document.getElementById(id+'iconcoeursuggestion'+c).style.transform='scale(1)'
  //   }
  
  // }

  const navigate=useNavigate()
  const {token}=useContext(tokenContexte)
 
  const {data:quelquegroupe,isLoading}=useQuery({
    queryKey:['quelque-groupe'],
    queryFn:()=>token ? axios.get(`${process.env.REACT_APP_BACKEND_URL}/quelque-groupe-auth`,{
      headers:{
        "Authorization": "Bearer "+token
      }
    }) : axios.get(`${process.env.REACT_APP_BACKEND_URL}/quelque-groupe-guest`)
  })
 

  const rejoindre=(id,idbouton)=>{
    document.getElementById(idbouton).textContent='encours d\'adhésion...'
   axios.post(`${process.env.REACT_APP_BACKEND_URL}/rejoindre-groupe`, {id},{
       headers:{
           "Authorization": "Bearer "+token
         }
   }).then((res)=>{
       if(res.data.statut=='200'){
       document.getElementById(idbouton).textContent='Vous êtes membres'
       }else{
      
       }
     }).catch((err)=>{
      if(err.response?.data?.message?.includes('Unauthenticated')){
        navigate('/login')
    }
     })
   
 }

 const like=(id,idcoeur)=>{
  if(document.getElementById(idcoeur).src==coeur){
    document.getElementById(idcoeur).src=coeurv
  }else{
    document.getElementById(idcoeur).src=coeur
  }
 axios.post(`${process.env.REACT_APP_BACKEND_URL}/like-groupe`, {id},{
     headers:{
         "Authorization": "Bearer "+token
       }
 }).then((res)=>{
     if(res.data.statut=='200'){
    
     }else{
    
     }
   }).catch((err)=>{
    if(err.response?.data?.message?.includes('Unauthenticated')){
      navigate('/login')
  }
   })
 
}

  const {userstore}=useContext(userContexte)
    return <>
    <div className='flex flex-col justify-center items-start w-full'>
    <p style={{display:quelquegroupe && quelquegroupe?.data?.lesgroupes?.length==0 ? 'none' : 'block'}} className="p-3 text-sm"> Quelques groupes chrétiens</p>
    <div className='w-full flex flex-row justify-between items-center gap-x-4 overflow-x-auto px-2'>
    {
           quelquegroupe ? quelquegroupe?.data?.lesgroupes?.map((c,i)=>{
                return <div class="" style={{width:'18rem',height:'auto'}}>
               <div style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+c.photo})`,backgroundPosition:'center',backgroundSize:'cover',height:'12rem'}}></div>
               <div style={{width:'18rem',height:'16rem'}} class="card-body bg-white flex flex-col justify-between">
                  <h5 class="card-title font-bold text-violet-700">{c.nom?.length>50 ? c.nom?.substr(0,50)+'...' : c?.nom}</h5>
                  <p class="card-text gap-y-2 flex flex-col"><span><span className=" text-violet-700">Objectif du groupe :</span>{c.objectif?.length>60 ? c.objectif?.substr(0,60)+'...' : c.objectif}</span> <span className="text-xs text-gray-700 flex flex-row start items-center "> <span> {c.membre?.split(",")?.length-1} membre(s)&nbsp; </span> <span><img style={{height:'5px'}} src={point} alt="" /></span> &nbsp;<span className='flex flex-row justify-center items-center gap-x-1'>  <img style={{height:'10px'}} src={coeur} alt="" />{c.like}</span> </span>  <span className='text-xs mb-1'>Crée par {c.user?.nom?.substr(0,40)?.toUpperCase()}</span> </p>
                  <span className="flex flex-row gap-x-3">
                 <img id={'coeur'+c.id} onClick={()=>{like(c.id,'coeur'+c.id)}} className='amenpub position-relative top-2 cursor-pointer' style={{height:'26px',transition:'all ease 0.6s'}} src={userstore && c.likeur?.includes(userstore?.data?.id+',') ? coeurv : coeur} alt="" />
                 <Link id={'rejoindre'+i} onClick={()=>{rejoindre(c.id, 'rejoindre'+i)}} class="btn focus:bg-violet-600 bg-violet-700 text-white mt-1 hover:bg-violet-600 text-xs">Rejoindre</Link>
                 <Link to={'/groupe/'+c.id} class="btn bg-gray-300 mt-1 hover:bg-gray-200 hover:text-violet-700 text-xs">Apercu</Link>
                 </span>
                </div>
              </div>
            }) : <Quelquegroupe/>
        }
</div>
<span style={{display:quelquegroupe && quelquegroupe?.data?.lesgroupes?.length==0 ? 'none' : 'block'}} className=' w-full mt-2'><Link to={'/groupes'} className='flex flex-row justify-center items-center gap-x-2 text-decoration-none hover:text-violet-700'><span>Voir plus</span> <img className='voirplusfriend' style={{height:'13px'}}  src={right} alt="" /></Link></span>
</div>
    </>
}