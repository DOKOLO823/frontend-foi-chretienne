import annonce from '../icons/images/annonce.png';
import profile from '../icons/images/profile.png';
import identifier from '../icons/images/identifier.png';
import message from '../icons/images/sms.png';
import menu from '../icons/images/menu.png';
import loupe from '../icons/images/loupe.png';
import bell from '../icons/images/bell.png';
import sms from '../icons/images/messenger.png';
import question from '../icons/images/question.png';
import docta from '../images/docta.jpg';
import don from '../icons/images/faire-un-don.png';
import login from '../icons/images/login.png';
import deconnexion from '../icons/images/logout.png';
import joindre from '../icons/images/papier.png';
import suggestion from '../icons/images/avantages.png';
import friendOnLine from '../icons/images/utilisateur.png';
import fc from '../icons/images/fc.jpg';
import musique from '../icons/images/music.png';
import predication from '../icons/images/predication.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { tokenContexte } from '../contexte/tokenContexte';
import { userContexte } from '../contexte/userContexte';
import { useQuery } from 'react-query';
import { Skeleton } from '@mui/material';

export function Header()
{
    const navigate=useNavigate();
    const {token}=useContext(tokenContexte)
    // useEffect(()=>{
    //   if(localStorage.getItem('token_foi_chretienne'))
    // },[])
    const logout=async()=>{
       
           await axios.post(`${process.env.REACT_APP_BACKEND_URL}/logout`,{},{
            headers:{
                "Authorization": "Bearer "+token
              }
           }).then((res)=>{
            if(res?.data?.statut=='200'){
                localStorage.removeItem('token_foi_chretienne');
                window.location.reload()
            }else{
              
            }
          }).catch((e)=>{
            if(e.response?.data?.message?.includes('Unauthenticated')){
                navigate('/login')
            }
          })
        
       
    }

    if(token){
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/notification-nonlue`,{
        headers:{
            "Authorization": "Bearer "+token
          }
       }).then((res)=>{
     
        if(res?.data?.statut=='200'){
          
        }else{
          
        }
      }).catch((e)=>{
        if(e?.response?.data?.message?.includes('Unauthenticated')){
          localStorage.removeItem('token_foi_chretienne');
          window.location.href='https://foichretienne.org/login'
        }
      })
    }

// notifications non lues 
    const {data:notification,isLoading,isSuccess}=useQuery({
        queryKey:['notification-nonlue'],
        queryFn:()=> token && axios.get(`${process.env.REACT_APP_BACKEND_URL}/notification-nonlue`,{
         headers:{
           "Authorization": "Bearer "+token
         }
       })
      })

 
 
  //  if(token){
  //   const tokenactualise=localStorage.getItem('token_foi_chretienne');
  //   localStorage.setItem('token_foi_chretienne',token)
  //  }
      // window.location.href='https://foichretienne.org/login'
   

        
    //  liste des discussions 
    const {data:discussions,isLoading:loadsmsnonlus}=useQuery({
        queryKey:['discussions'],
        queryFn:()=>token && axios.get(`${process.env.REACT_APP_BACKEND_URL}/discussions`,{
          headers:{
            "Authorization": "Bearer "+token
          }
        })
      })

    const {userstore}=useContext(userContexte)
    return<>
     <div className="flex flex-row justify-between items-center w-full p-2 drop-shadow-md bg-white fixed top-0 grandheader z-30">
        <div className="flex flex-row justify-between items-center gap-2 w-1/4 pl-2 perefoimobile">
            <span className='flex flex-row justify-center items-center gap-x-1 text-sm hidden foimobile'><img  style={{height:'20px',borderRadius:'6px'}}  src={fc} alt="logo foi chretienne" /> {token && <span className="font-bold text-violet-700">Foi chrétienne</span>} </span>
            <span className='w-full formpcnavbar'>
                

    <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none w-full">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
       <Link to={'/rechercher-personne'} className="text-decoration-none"> <input readOnly={true} type="search" id="default-search" class="block w-4/5 py-2 px-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-violet-700 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer" placeholder="Rechercher une personne..." /></Link>
    </div>


            </span>
        </div>
        <div className='w-1/4 text-sm flex flex-row justify-center items-center gap-x-2 foipc'><img style={{height:'25px',borderRadius:'7px'}}  src={fc} alt="logo foi chretienne" /> <span className="font-bold text-violet-700">FOI CHRÉTIENNE</span></div>
        {!token && <Link to={'/signup'} className="btn bg-violet-700 text-white hover:bg-violet-600 focus:bg-violet-600 text-xs">Je crée mon compte</Link>}
        <div style={{width:'30%'}} className="flex flex-row justify-end items-center gap-x-6 w-1/4 pr-2 text-xs headericon">
     
      {token &&  <div className="flex flex-row items-center gap-x-4">  {discussions ? <Link style={{borderBottom:window.location.href.includes('liste-discussion')?"2px solid rgb(109 40 217 / var(--tw-bg-opacity, 1))":"0px",paddingBottom:window.location.href.includes('liste-discussion') ? '2px' :'opx'}} to={'/liste-discussion'} href='' className='flex flex-col-reverse justify-center items-center position-relative -top-2 messageHeader hidden'><img style={{height:'16px'}} src={sms} alt="" /><span style={{fontSize:'x-small'}} className='bg-violet-700 text-white p-0.5 text-xs rounded-full h-5 font-medium w-5 position-relative top-2 -right-2 flex flex-col justify-center items-center'>{discussions?.data?.ng>9 ? '9+' : discussions?.data?.ng}</span></Link> : <Skeleton style={{borderRadius:'50%',width:'20px', height:'40px'}}></Skeleton>} 
      {notification ?   <Link style={{borderBottom:window.location.href.includes('notifications')?"2px solid rgb(109 40 217 / var(--tw-bg-opacity, 1))":"0px",paddingBottom:window.location.href.includes('notifications') ? '0px' :'0px'}} to={'/notifications'} className='flex flex-col-reverse justify-center items-center position-relative -top-2 border-solid border-b-2'><img style={{height:'20px'}} src={bell} alt="" /><span style={{fontSize:'x-small'}} className='bg-violet-700 text-white p-0.5 text-xs rounded-full h-5 w-5 font-medium position-relative top-2.5 -right-2 flex flex-col justify-center items-center'>{notification?.data?.notifications?.nombre}</span></Link> : <Skeleton style={{borderRadius:'50%',width:'20px', height:'40px'}}></Skeleton>}</div>}
          {token &&   <Link style={{color:window.location.href.includes('liste-discussion')?"rgb(109 40 217 / var(--tw-bg-opacity, 1))":""}} to={'/liste-discussion'} href='' className="flex flex-col justify-center items-center text-decoration-none hover:text-violet-700 iconnavbar"><span><img style={{height:'20px'}} src={message} alt="" /></span>{discussions ? <span>Messages({discussions?.data?.ng>9 ? '9+' : discussions?.data?.ng })</span> : <Skeleton style={{width:'60px', height:'20px'}}></Skeleton>}</Link> }
            <span className="flex flex-col justify-center items-center">
                <span className="flex flex-col justify-center items-center iconnavbar">
                <div class="dropdown show">
  <img className='cursor-pointer rounded-full' style={{height:'20px',width:'20px',display:!userstore && 'none'}} src={userstore && process.env.REACT_APP_BACKEND_FILE+userstore?.data?.pp} alt="" id="dropdownMenuLinkUser" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />

  <div style={{display:!userstore && 'none'}} class="dropdown-menu z-30" aria-labelledby="dropdownMenuLinkUser">
    <Link to={'/profile/'+userstore?.data?.id} class="dropdown-item hover:bg-violet-700 hover:text-white text-sm">Mon profil</Link>
    <Link onClick={logout} class="dropdown-item hover:bg-violet-700 hover:text-white text-sm">Se déconnecter</Link>
  </div>
</div>
                </span>
                <span className='iconnavbar hover:text-violet-700'>{userstore && userstore?.data?.nom?.substr(0,11)}</span></span>  <span data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className='position-relative right-2 cursor-pointer hidden menumobile'>  <img style={{height:'20px'}} src={menu} alt="" /> </span>
               
        </div>
    </div>

    {/* offcanvas  */}
<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
      <span className='flex flex-row justify-start items-center gap-x-2 text-violet-700' id="offcanvasRightLabel"><img src={fc}  style={{height:'20px',borderRadius:'6px'}} alt="logo foi chretienne" />Foi chrétienne</span>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
      <a style={{display:!userstore && 'none'}} href={'/profile/'+(userstore && userstore?.data?.id)} className="flex flex-row justify-start items-center text-decoration-none gap-x-2 bg-gray-200 p-1 rounded-lg px-2"><span style={{backgroundImage: `url(${userstore ? process.env.REACT_APP_BACKEND_FILE+userstore?.data?.pp : ''})`,backgroundPosition:'center',backgroundSize:'cover',backgroundRepeat:'no-repeat'}} className='h-12 w-12 rounded-full'></span><span className='flex flex-col items-start text-sm'> <span className='text-black'>{userstore && userstore?.data?.nom[0]?.toUpperCase()+userstore?.data?.nom?.slice(1)}</span><span className='text-xs text-gray-600'>Voir mon profile</span> </span></a>
      <div className="flex flex-col gap-y-8">
        <div className='flex flex-col justify-center items-start mt-4 border-b-2 border-b-gray-200 pb-8 gap-y-4'>
        {/* <Link className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l-4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full text-sm'><span className='' style={{height:'25px',width:'25px',backgroundImage:`url(${Thematique})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Thématiques bibliques</Link>
        <Link className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full text-sm'><span className='' style={{height:'25px',width:'25px',backgroundImage:`url(${chorale})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Chorales</Link>
        <Link to={'/demande'} className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full text-sm'><span className='' style={{height:'25px',width:'25px',backgroundImage:`url(${friendRequest})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Demandes d'amitiés</Link> */}
        {/* <a href={'/friend-inline'} className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l-4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full text-sm'><span className='' style={{height:'25px',width:'25px',backgroundImage:`url(${friendOnLine})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Vos ami(e)s en ligne actuellement</a> */}
        <a href={'/musique'} className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l-4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full text-sm'><span className='' style={{height:'20px',width:'20px',backgroundImage:`url(${musique})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Musiques chrétiennes</a>
        <a href={'/predication'} className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l-4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full text-sm'><span className='' style={{height:'25px',width:'25px',backgroundImage:`url(${predication})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Prédications</a>
     
        </div>
        <div className='flex flex-col justify-center items-start gap-y-4'>
       <span className="flex flex-row"> {!token && <a href={'/login'} className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l-4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full text-sm'><span className='' style={{height:'18px',width:'18px',backgroundImage:`url(${login})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Se connecter</a>} {token && <a onClick={logout} className='text-sm flex flex-row items-center gap-x-3 border-l hover:border-l-4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 py-1 px-2 focus:bg-gray-300 rounded-lg'><span> <img style={{height:'19px'}} src={deconnexion} alt="" /> </span>Se déconnecter</a>}</span>
        {/* <a href={'/don'} className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full text-sm'><span className='' style={{height:'25px',width:'25px',backgroundImage:`url(${don})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Faire un don</a> */}
        <a href={'/nous-joindre'} className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l-4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full text-sm'><span className='' style={{height:'25px',width:'25px',backgroundImage:`url(${joindre})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Nous joindre</a>
        <a href={'/envoyer-suggestion'} className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full text-sm'><span className='' style={{height:'25px',width:'25px',backgroundImage:`url(${suggestion})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Envoyer une suggestion</a>
        <a href={'/description'} className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full text-sm'><span className='' style={{height:'25px',width:'25px',backgroundImage:`url(${question})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Qu'est ce que foi chrétienne ?</a>
        </div>
      </div>
      </div>
</div>
    </>
}