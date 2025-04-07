import { Header } from '../components/header';
import docta from '../images/docta.jpg';
import left from '../icons/images/left.png';
import { useState } from 'react';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { Link, useNavigate } from 'react-router-dom';
export function SuggestionPersonne()
{
    const tab=['','','','','','','','','','','','','','','','']
    const navigate=useNavigate();
    return <>
   <div className="flex flex-col justify-center items-center w-full">
    <Header/>
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
        <div className=' flex flex-col items-start divgauche'> <DivGauche/> </div>
      <div className="w-3/4 px-2 h-full flex flex-col items-center justify-center nouvelledivdroite">
      <p className="text-start mb-3 flex flex-row flex-wrap justify-center items-center gap-2"><span onClick={()=>{navigate(-1)}} className='cursor-pointer'><img style={{height:'16px'}} src={left} alt="" /></span> <span className="text-sm">Les personnes que vous pourriez connaitre : </span></p>
      <div className="h-full flex flex-row justify-center flex-wrap items-center gap-3 pb-24">
        {
            tab.map((e)=>{
                return  <div style={{width:'19rem',height:'19rem'}} class=" bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 flex flex-row justify-center items-center">
    
      <div style={{width:'19rem',height:'17rem'}} class="flex flex-col items-center mt-6 gap-y-2">
      <Link className='text-decoration-none flex flex-col items-center'>
          <div style={{backgroundImage:`url(${docta})`,backgroundPosition:'center',backgroundSize:'cover'}} className="w-24 h-24 rounded-full hover:scale-105 hover:duration-700"></div>
         <span class=" text- font-medium text-violet-700">{'Nom de utilisateur'.substring(0,20)}</span></Link>
          <span class="text-sm text-gray-500 dark:text-gray-400 position-relative -top-1">{'Pseudonyme(Ex: le frere humble)'.substring(0,32)}</span>
          <span className='text-xs'>8 Ami(e)s en commun</span>
          <div class="flex mt-4 md:mt-6 ">
              <a href="#" class="inline-flex text-decoration-none items-center px-4 py-2 text-xs font-medium text-center text-white bg-violet-700 rounded-lg hover:bg-violet-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ajouter comme ami(e)</a>
            
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