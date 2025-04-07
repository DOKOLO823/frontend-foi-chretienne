import { Header } from '../components/header';
import docta from '../images/docta.jpg';
import left from '../icons/images/left.png';
import { useState } from 'react';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { Link, useNavigate } from 'react-router-dom';
export function FriendInline()
{
    const tab=['','','','','','','','','','','','','','','','']
    const navigate=useNavigate();
    return <>
   <div className="flex flex-col justify-center items-center w-full">
    <Header/>
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
        <div className=' flex flex-col items-start divgauche'> <DivGauche/> </div>
      <div className="w-3/4 px-2 h-full flex flex-col items-center justify-center mb-24 gap-y-4 nouvelledivdroite">
      <p className="text-start mb-3 flex flex-row justify-start items-center gap-x-4 w-full pl-3"><span onClick={()=>{navigate(-1)}} className='cursor-pointer'><img style={{height:'16px'}} src={left} alt="" /></span></p>
      <p className="text-center mb-3 text-violet-700 font-medium border-solid border-1 border-violet-700 rounded-lg w-11/12 text-sm">Vos ami(e)s en ligne actuellement</p>
      
           {
            tab.map((e)=>{
                return <Link to={'/profile/1'} className="flex flex-row justify-start items-center text-decoration-none hover:text-violet-700">
                <div style={{backgroundImage: `url(${docta})`,backgroundPosition:'center',backgroundSize:'cover',backgroundRepeat:'no-repeat'}} className='w-12 h-12 rounded-full hover:scale-105 hover:duration-700'>  </div><span className="h-3 w-3 bg-green-700 position-relative right-3 top-4 rounded-full border-white border-2 box-border"></span>
                 <div className='flex flex-col justify-center items-start text-sm'>
                     <span className='font-bold'>Nom de l'utilisateur</span><span className='text-xs'>Pseudonyme</span>
                 </div>
                </Link>
            })
           }
          

      </div>
       
    </div>

   </div>

<BackToTop/>
<BottomBar/>

    </>
}