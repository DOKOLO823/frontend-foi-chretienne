import { Header } from '../components/header';
import docta from '../images/docta.jpg';
import left from '../icons/images/left.png';
import { useContext, useEffect, useState } from 'react';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../profile.css'
import { Publication } from '../part/publication';
import { MesPublications } from '../part/mesPublications';
import { useQuery } from 'react-query';
import axios from 'axios';
import { tokenContexte } from '../contexte/tokenContexte';
import { userContexte } from '../contexte/userContexte';
import { ProfileSkeleton } from '../skeletons/profile';

export function Profile()
{
     const navigate=useNavigate();
      useEffect(()=>{
        if(!token){
          navigate('/login')
        }
      },[])
   
    const {userstore}=useContext(userContexte)
    const {token}=useContext(tokenContexte)
    const {id}=useParams('id')
    const {data:profile,isLoading}=useQuery({
        queryKey:['profile','id'],
        queryFn:()=> (token && id) && axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/${id}`,{
         headers:{
           "Authorization": "Bearer "+token
         }
       })
      })

      const ajouter=(idevalueur,idbouton)=>{
        document.getElementById(idbouton).textContent='En cours...'
       axios.post(`${process.env.REACT_APP_BACKEND_URL}/ajouter-comme-ami`, {idevalueur},{
           headers:{
               "Authorization": "Bearer "+token
             }
       }).then((res)=>{
           if(res.data.statut=='200'){
           document.getElementById(idbouton).textContent='Envoyée'
           }else{
          
           }
         }).catch((err)=>{
          if(err.response?.data?.message?.includes('Unauthenticated')){
            navigate('/login')
        }
         })
       
     }

    return <>
   <div className="flex flex-col justify-center items-center w-full">
    <Header/>
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
        <div className=' flex flex-col items-start divgauche'> <DivGauche/> </div>
      <div className="w-3/4 px-2 h-full flex flex-col items-center justify-center nouvelledivdroite">
      <p className="text-start mb-2 flex flex-row justify-start items-center w-full "><span onClick={()=>{navigate(-1)}} className='cursor-pointer'><img style={{height:'16px'}} src={left} alt="" /></span></p>
      
     

{
    profile ? <div
    class="w-full mx-4 bg-white shadow-xl rounded-lg text-gray-900">
    <div class="rounded-t-lg h-64 overflow-hidden">
        <img class="object-cover object-top w-full" src={process.env.REACT_APP_BACKEND_FILE+profile?.data?.user?.pc} alt='Photo de couverture'/>
    </div>
    <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img class="object-cover object-center h-32 w-32" src={process.env.REACT_APP_BACKEND_FILE+profile?.data?.user?.pp} alt='Photo de profile'/>
    </div>
    <div class="text-center mt-2">
        <h2 class="font-semibold">{profile?.data?.user?.nom[0]?.toUpperCase()+profile?.data?.user?.nom?.slice(1)?.substring(0,50)} {profile?.data?.user?.prenom?.substring(0,50)}</h2>
        <p class="text-gray-500">{profile?.data?.user?.pseudo?.substring(0,50)}</p>
    </div>
   {
    userstore?.data?.id==id &&  <div className="w-full flex flex-row justify-center items-center mt-3">
    <a href={'/edit-profile/'+id} class=" rounded-full bg-violet-700 hover:shadow-lg font-semibold text-white text-sm px-4 p-2 text-decoration-none">Modifier mon profile</a>
    </div>
   }
  {profile?.data?.user?.amis?.split(",")?.length-2>0 &&   <p className="text-center m-3"><span className='text-xl font-bold'>{profile?.data?.user?.amis?.split(",")?.length-2>0 && profile?.data?.user?.amis?.split(",")?.length-1}</span><br/><span className='text-sm position-relative -top-2'>Ami(e)s</span></p>}
 {(profile?.data?.commun>0 && userstore?.data?.id!=id) &&  <p className='text-sm text-center'>{profile?.data?.commun+' Ami(e)s en commun'}</p>}
 {(profile?.data?.user?.amis?.includes(userstore?.data?.id+',') && userstore?.data?.id!=id) && <p className="text-xs text-center text-gray-500">Vous êtes ami(e)s</p> }
 { profile?.data?.user?.verset &&
<div class="m-4 p-6 bg-white border border-gray-200 shadow-xs rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

    <h5 style={{fontWeight:'bold', color:'black'}} class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">Verset Préféré :  </h5>
    <p>{profile?.data?.user?.verset?.length>200 ? profile?.data?.user?.verset?.substring(0,200)+'...' : profile?.data?.user?.verset}</p>
   

</div>
}

{userstore?.data?.id!=id && 
   <div className="w-full flex flex-row justify-center gap-x-6 mt-4">
 <Link to={'/discussion/'+id} class="w-32 rounded-full bg-violet-700 hover:shadow-lg font-semibold text-white  text-sm p-2 flex flex-row justify-center items-center text-decoration-none">Message</Link>
  {!profile?.data?.user?.amis?.includes(userstore?.data?.id+',') &&  <button id={'bouton'+id} onClick={()=>{ajouter(id,'bouton'+id)}} class="w-32  rounded-full bg-violet-700 hover:shadow-lg font-semibold text-white text-sm p-2">Devenir ami(e)</button>}
   </div>
   }
    <div class="m-4 pt-6 border-t mx-8 mt-3 text-violet-700 border-b-2 border-b-violet-700 border-solid">
       Publications :
    </div>
    <div className="mb-24">
    <MesPublications profile={profile?.data}/>
    </div>
</div> : <ProfileSkeleton/>
}

      </div>
       
    </div>

   </div>

<BackToTop/>
<BottomBar/>

    </>
}