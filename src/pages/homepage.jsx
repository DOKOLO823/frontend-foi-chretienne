import { Header } from '../components/header';
import priere from '../icons/images/priere.png';
import docta from '../images/docta.jpg';
import { Suggestion } from '../part/suggestionFriend';
import { Publication } from '../part/publication';
import { useContext, useEffect, useState } from 'react';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { DivDroit } from '../part/divDroit';
import { Link, useNavigate } from 'react-router-dom';
import { SuggestionGroupe } from '../part/suggestionGroupe';
import { tokenContexte } from '../contexte/tokenContexte';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { userContexte } from '../contexte/userContexte';
import { toast, ToastContainer } from 'react-toastify';
export function Homepage()
{
  const queryClient=useQueryClient();
  
    const {token}=useContext(tokenContexte)
    const {userstore}=useContext(userContexte)

   
   
    return <>
      <ToastContainer/>
   <div className="flex flex-col justify-center items-center w-full">
    <Header />
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
        <div className='w-1/4 divgauche'> <DivGauche/> </div>
        <div className='w-1/2 flex flex-col justify-center items-center position-relative -top-3 divcentre'>
        {/* mode guest  */}
        <div style={{display:token &&  'none'}} className='text-center bg-white p-4 font-italic w-full rounded-lg psaume'>Bienvenu sur <span className="font-medium text-violet-700">Foi chrétienne</span>, le réseau social chrétien totalement gratuit. Ici, adores le Seigneur avec tes ami(e)s et agrandis ta foi.<br/><br/>Rejoins les autres en créant ton compte maintenant :<br/><br/><Link to={'/signup'} className="btn bg-violet-700 text-white hover:bg-violet-600 focus:bg-violet-600 text-sm font-medium">Je crée mon compte</Link> </div>
        {/* search  */}
        
    <div style={{display:token && 'none'}} class="relative w-11/12 mt-2 hidden rechercheMobile">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input data-bs-toggle="modal" data-bs-target="#exampleModalGuest" data-whatever="@mdo" readOnly={true} type="search" id="default-search" class="block w-full p-2 pl-4 indent-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-violet-700 focus:border-violet-700 dark:border-gray-600 dark:focus:ring-violet-700 dark:focus:border-violet-700" placeholder="Rechercher une personne" />
       
    </div>


        {/* end search  */}
      
        {/* end guest  */}
        <div style={{display:!token && 'none'}} className='text-start bg-white p-4 font-italic w-full rounded-lg psaume'>Vous êtes connectés à <span className="font-medium text-violet-700">{'Foi chrétienne'.toUpperCase()}</span>. Nous vous encourageons à publier des contenus édifiants afin de toucher des âmes et de plaire à Dieu.</div>
        {/* search  */}
        
    <div style={{display:!userstore && 'none'}} class="relative w-11/12 mt-2 hidden rechercheMobile">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
       <Link  to={'/rechercher-personne'} className='w-full text-decoration-none'> <input readOnly={true} type="search" id="default-search" class="block w-full p-2 pl-4 indent-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-violet-700 focus:border-violet-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-violet-700 dark:focus:border-violet-700" placeholder="Rechercher une personne" /></Link>
        
    </div>

        {/* end search  */}
     
        {/* suggestion groupe  */}
        <div className='flex flex-col justify-center items-start w-full '>

        <div className='flex flex-row justify-between items-center w-full pb-2 px-2 potentialfriends'>
                {/* <span className='text-sm'>Quelques groupes</span> */}
            </div>
           <SuggestionGroupe/>
           {/* suggestion ami  */}
           
           <Suggestion/>

        {/* lancer une priere  */}
        {/* <div className='flex flex-row justify-center items-center px-3 mt-4 w-full'>
                <div class="dropdown flex flex-row justify-start items-center border-b border-b-1 bg-violet-700 p-1.5 w-2/3 lancerprierenow rounded-3xl">
                       <Link to={'/priere'} class=" w-full flex flex-row justify-center items-center text-white text-decoration-none" type="button" >
                       <img style={{height:'20px'}}  src={priere} alt="" />&nbsp; <span>Lancer une priere maintenant</span>
                      </Link>
                     
               </div>
            </div> */}

        </div>
        {/* publications  */}
       <div className="mb-24 h-full w-full mt-4">
       <Publication/>
       </div>
        



        </div>
        <div className='w-1/4 divdroit'> <DivDroit/> </div>
    </div>

  

   </div>


   {/* modals  */}
   


<BackToTop/>
<BottomBar/>




    </>
}