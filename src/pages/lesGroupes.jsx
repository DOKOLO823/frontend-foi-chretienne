import { Header } from '../components/header';
import docta from '../images/docta.jpg';
import point from '../icons/images/point.png';
import coeur from '../icons/images/coeur.png';
import coeurv from '../icons/images/coeurv.png';
import left from '../icons/images/left.png';
import { useContext, useEffect, useState } from 'react';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { tokenContexte } from '../contexte/tokenContexte';
import { userContexte } from '../contexte/userContexte';
import { useMutation, useQueryClient } from 'react-query';
import { MesGroupeSkeleton } from '../skeletons/mesgroupes';
import { LesGroupeSkeleton } from '../skeletons/lesgroupes';
export function LesGroupes()
{
    const tab=['','','','','','','','','','','','','','','']
    const navigate=useNavigate()
    useEffect(()=>{
      if(!token){
        navigate('/login')
      }
    },[])

    // liker un groupe suggestion
 const likeramensuggestion=(id,c)=>{
  if(document.getElementById(id+'iconcoeursuggestion').src==coeur){
    document.getElementById(id+'iconcoeursuggestion').src=coeurv
     document.getElementById(id+'iconcoeursuggestion').style.transform='scale(1.2)'
  }else{
    document.getElementById(id+'iconcoeursuggestion').src=coeur
     document.getElementById(id+'iconcoeursuggestion').style.transform='scale(1)'
  }

}

const [lesgroupesstate, setLesgroupesstate]=useState([])
const [lesgroupes, setLesgroupes]=useState([])
const [recherche, setRecherche]=useState(null)
const {categorie}=useParams('categorie')
const {token, addToken}=useContext(tokenContexte)
const {userstore}=useContext(userContexte)

const afficherGroupes=()=>{
 axios.get(`${process.env.REACT_APP_BACKEND_URL}/les-groupes/${categorie}`,{
   headers:{
       "Authorization": "Bearer "+token
     }
 }).then((res)=>{
setLesgroupesstate(res.data?.lesgroupes)
setLesgroupes(res.data?.lesgroupes)
console.log(lesgroupesstate)
 }).catch((err)=>{
  
 })
}
useEffect(()=>{
 afficherGroupes()
},[])

// filtre 
useEffect(()=>{
  if(recherche==null || typeof(recherche)==undefined){
   setLesgroupesstate(lesgroupes)
  }else{
   const filter=()=>lesgroupes?.filter(el=>el.nom.toLowerCase().includes(recherche?.toLowerCase()))
   setLesgroupesstate(filter)
  }
},[recherche])

// like groupe 
const queryClient=useQueryClient();
const mutationlikegroupe=useMutation({
 mutationFn:(id)=>{
     axios.post(`${process.env.REACT_APP_BACKEND_URL}/like-groupe`,{id},{
         headers:{
           "Authorization": "Bearer "+token
         }
       })
 },
   onSuccess: () => {
     queryClient.invalidateQueries({ queryKey: ['les-groupes'] });
   },
})

const like=(id,idcoeur)=>{
  if(document.getElementById(idcoeur).src==coeur){
    document.getElementById(idcoeur).src=coeurv
  }else{
    document.getElementById(idcoeur).src=coeur
  }
 mutationlikegroupe.mutate(id)
 
}

// rejoindre un groupe 
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
      document.getElementById(idbouton).textContent='Vous êtes deja membres'
     }
   })
 
}

    
    return <>
   <div className="flex flex-col justify-center items-center w-full">
    <Header/>
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
        <div className=' flex flex-col items-start divgauche'> <DivGauche/> </div>
      <div className="w-3/4 px-2 h-full flex flex-col items-center justify-center nouvelledivdroite">

      <div className="w-full flex flex-col items-center">
     <span onClick={()=>{navigate(-1)}} className='cursor-pointer px-8 w-full mb-3'><img className='float-left' style={{height:'16px'}} src={left} alt="" /></span>
     <input onChange={(e)=>{setRecherche(e.target.value)}} type="search" id="default-search" class="block w-4/5 py-2 px-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-violet-700 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4" placeholder="Rechercher un groupe..." />
     </div>

      <p className="text-start mb-2">Catégorie {categorie?.toLocaleUpperCase()}</p>
      <div className="h-full flex flex-row justify-center flex-wrap items-center gap-4 pb-24 w-full">
        {
           lesgroupes.length>0 ? lesgroupesstate?.map((e,i)=>{
                return <div class="" style={{width:'18rem',height:'auto',display:e.membre?.includes(userstore?.data?.id+",") && 'none'}}>
                <div style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+e.photo})`,backgroundPosition:'center',backgroundSize:'cover',height:'12rem'}}></div>
                <div style={{width:'18rem',height:'16rem'}} class="card-body bg-white flex flex-col justify-between">
                <h5 class="card-title font-bold text-violet-700">{e.nom?.length>50 ? e.nom?.substr(0,50)+'...' : e?.nom}</h5>
                <p class="card-text gap-y-2 flex flex-col"><span><span className=" text-violet-700">Objectif du groupe :</span> {e.objectif.length>60 ? e.objectif.substr(0,60)+'...' : e.objectif}</span> <span className="text-xs text-gray-700 flex flex-row start items-center "> <span> {e.membre.split(",").length-1} membres&nbsp; </span> <span><img style={{height:'5px'}} src={point} alt="" /></span> &nbsp;<span className='flex flex-row justify-center items-center gap-x-1'>  <img style={{height:'10px'}} src={coeur} alt="" />{e.like}</span> </span>  <span className='text-xs mb-1'>Crée par {e.user?.nom?.toUpperCase().substr(0,20)}</span> </p>
                  <span className="flex flex-row gap-x-3">
                  <img id={'coeur'+e.id} onClick={()=>{like(e.id,'coeur'+e.id)}} className='amenpub position-relative top-2 cursor-pointer' style={{height:'26px',transition:'all ease 0.6s'}} src={userstore && e.likeur?.includes(userstore?.data?.id+',') ? coeurv : coeur} alt="" />
                 <Link id={'rejoindre'+i} onClick={()=>{rejoindre(e.id, 'rejoindre'+i)}} class="btn focus:bg-violet-600 bg-violet-700 text-white mt-1 hover:bg-violet-600 text-xs">Rejoindre</Link>
                 <Link to={'/groupe/'+e.id} class="btn bg-gray-300 mt-1 hover:bg-gray-200 hover:text-violet-700 text-xs">Apercu</Link>
                 </span>
                </div>
              </div>
            }): <LesGroupeSkeleton/>
        }
      </div>

      </div>
       
    </div>

   </div>

<BackToTop/>
<BottomBar/>
    </>
}