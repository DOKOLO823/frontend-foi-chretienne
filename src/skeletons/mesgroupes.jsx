import { Header } from '../components/header';
import docta from '../images/docta.jpg';
import point from '../icons/images/point.png';
import coeur from '../icons/images/coeur.png';
import coeurv from '../icons/images/coeurv.png';
import left from '../icons/images/left.png';
import { useState } from 'react';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { Link, useNavigate } from 'react-router-dom';
import { Skeleton } from "@mui/material"
export function MesGroupeSkeleton()
{
    const tab=['','','','','','','','','','','','','','','']

const navigate=useNavigate()
    
    return <>
   <div className="flex flex-col justify-center items-center w-full">
    
    <div style={{top:'0px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
      
       
      <div className="w-full px-2 h-full flex flex-col items-center justify-center nouvelledivdroite">
      <div className="h-full flex flex-row justify-center flex-wrap items-center gap-4 pb-24 w-full">
      {
                  tab.map((e,i)=>{
                      return <div key={i} class="" style={{width:'18rem'}}>
                      <div style={{width:'18rem'}} class="card-body bg-white">
                      <Skeleton height='8rem' width='100%'></Skeleton>
                      <p class="card-text gap-y-2 flex flex-col"> <Skeleton height='4rem' width='100%'></Skeleton> <Skeleton height='1rem' width='100%'></Skeleton> <span className="text-xs text-gray-700 flex flex-row start items-center ">  <Skeleton height='1rem' width='70%'></Skeleton> <span className='flex flex-row justify-center items-center gap-x-1'></span> </span>   <Skeleton height='1rem' width='50%'></Skeleton> </p>
                       <div className="flex flex-row justify-start items-center gap-x-2 pt-3">
                       <Skeleton height='40px' width='40px' className='rounded-full'></Skeleton>
                       <Skeleton height='2.5rem' width='80%'></Skeleton>
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