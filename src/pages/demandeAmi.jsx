import { Header } from '../components/header';
import docta from '../images/docta.jpg';
import left from '../icons/images/left.png';
import { useState } from 'react';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { Link, useNavigate } from 'react-router-dom';
export function DemandeAmi()
{
    const tab=['','','','','','','','','','','','','','','','']
    const navigate=useNavigate();
    return <>
   <div className="flex flex-col justify-center items-center w-full">
    <Header/>
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
        <div className=' flex flex-col items-start divgauche'> <DivGauche/> </div>
      <div className="w-3/4 px-2 h-full flex flex-col items-center justify-center nouvelledivdroite">
      <p className="text-start mb-2 flex flex-row justify-center items-center gap-x-4"><span onClick={()=>{navigate(-1)}} className='cursor-pointer'><img style={{height:'16px'}} src={left} alt="" /></span> Demandes d'amities (0)</p>
      <div className="h-full flex flex-row justify-center flex-wrap items-center gap-4 pb-24">
        {
            tab.map((e)=>{
                return <div style={{width:'300px'}} className='flex flex-row border-gray-300 border-1 px-4 py-2 rounded-lg gap-x-2'>
                <div style={{backgroundImage:`url(${docta})`,backgroundPosition:'center',backgroundSize:'cover'}} className='h-12 w-12 rounded-full'></div>
                <div className='flex flex-col justify-start gap-y-2 text-sm '>
                    <span className='font-bold'>Dokolo yvan</span><span className='text-xs'>20 ami(e)s en commun</span>
                    <span className='flex flex-row justify-center items-center gap-x-4 '>
                        <button className="btn bg-violet-700 text-white text-sm hover:bg-violet-600">Accepter</button><button className="btn bg-gray-300 hover:bg-gray-200 hover:text-violet-700 text-sm">Refuser</button>
                    </span>
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