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
import { Link, useNavigate } from 'react-router-dom';
import { tokenContexte } from '../contexte/tokenContexte';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { userContexte } from '../contexte/userContexte';
import { MesGroupeSkeleton } from '../skeletons/mesgroupes';
export function MesGroupes()
{
    const tab=['','','','','','','','','','','','','','','']

    // liker un de mes groupes
  const likeramen=(id)=>{
    if(document.getElementById(id+'iconcoeur').src==coeur){
      document.getElementById(id+'iconcoeur').src=coeurv
      document.getElementById(id+'iconcoeur').style.transform='scale(1.2)'
    }else{
      document.getElementById(id+'iconcoeur').src=coeur
      document.getElementById(id+'iconcoeur').style.transform='scale(1)'
    }

}

 const {token, addToken}=useContext(tokenContexte)
 const {userstore}=useContext(userContexte)
 const navigate=useNavigate()

 const [mesgroupesstate, setMesgroupesstate]=useState([])
 const [mesgroupes, setMesgroupes]=useState([])
 const [recherche, setRecherche]=useState('')

 const afficherGroupes=()=>{
  axios.get(`${process.env.REACT_APP_BACKEND_URL}/mes-groupes`,{
    headers:{
        "Authorization": "Bearer "+token
      }
  }).then((res)=>{
 setMesgroupesstate(res.data?.mesgroupes)
 setMesgroupes(res.data?.mesgroupes)
  }).catch((err)=>{
   
  })
 }
 useEffect(()=>{
  afficherGroupes()
 },[])


 useEffect(()=>{
   if(recherche==null || typeof(recherche)==undefined){
    setMesgroupesstate(mesgroupes)
   }else{
    const filter=()=>mesgroupes?.filter(el=>el.nom.toLowerCase().includes(recherche?.toLowerCase()))
    setMesgroupesstate(filter)
   }
},[recherche])


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
        queryClient.invalidateQueries({ queryKey: ['mes-groupes'] });
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
      <p className="text-start mb-2">Mes groupes ({mesgroupes?.length})</p>
      <div className="h-full flex flex-row justify-center flex-wrap items-center gap-4 pb-24">
      {
           mesgroupes?.length==0 ? <MesGroupeSkeleton/> : mesgroupesstate.map((c,i)=>{
                return <div key={c.id} class="" style={{width:'18rem',height:'auto'}}>
            <div style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+c.photo})`,backgroundPosition:'center',backgroundSize:'cover',height:'12rem'}}></div>
            <div style={{width:'18rem',height:'16rem'}} class="card-body bg-white flex flex-col justify-between">
                  <h5 class="card-title font-bold text-violet-700">{c.nom.length>50 ? c.nom.substr(0,50)+'...' : c?.nom}</h5>
                  <p class="card-text gap-y-2 flex flex-col"><span><span className=" text-violet-700">Objectif du groupe :</span>{c?.objectif?.length>60 ? c.objectif.substr(0,60)+'...' : c?.objectif}</span> <span className="text-xs text-gray-700 flex flex-row start items-center "> <span> {c?.membre?.split(",")?.length-1} membres&nbsp; </span> <span><img style={{height:'5px'}} src={point} alt="" /></span> &nbsp;<span className='flex flex-row justify-center items-center gap-x-1'>  <img style={{height:'10px'}} src={coeur} alt="" />{c.like}</span> </span>  <span className='text-xs mb-1'>Crée par {c?.user?.nom?.toUpperCase()}</span> </p>
                 <div className="flex flex-row justify-center items-center gap-x-2">
                 <img id={'coeur'+c.id} onClick={()=>{like(c.id,'coeur'+c.id)}} className='amenpub position-relative top-1 cursor-pointer' style={{height:'26px',transition:'all ease 0.6s'}} src={userstore && c?.likeur?.includes(userstore?.data?.id+',') ? coeurv : coeur} alt="" />
                 <Link to={'/groupe/'+c.id} class="btn bg-violet-700 text-white w-full mt-1 hover:bg-violet-600 focus:bg-violet-600">Apercu <span className='text-xs font-bold'></span></Link>
                 </div>
                </div>
              </div>
            })
        }
      </div>

      </div>
       
    </div>

   </div>

<BackToTop/>
<BottomBar/>
    </>
}