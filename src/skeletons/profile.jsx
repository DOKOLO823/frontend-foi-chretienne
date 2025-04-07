import { Header } from '../components/header';
import docta from '../images/docta.jpg';
import left from '../icons/images/left.png';
import { useState } from 'react';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { Link, useNavigate } from 'react-router-dom';
import '../profile.css'
import { Skeleton } from "@mui/material"

export function ProfileSkeleton()
{
    return <>
   <div className="flex flex-col justify-center items-center w-full">
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
      <div className="w-3/4 px-2 h-full flex flex-col items-center justify-center nouvelledivdroite">
<div
style={{position:'relative',top:'-70px'}}
    class="w-full mx-4 bg-white shadow-xl rounded-lg text-gray-900 position-relative -top-14">
    <div class="rounded-t-lg h-96 overflow-hidden">
    <Skeleton height='100%' width='100%' className='object-cover object-top w-full'></Skeleton>
       
    </div>
    <div style={{position:'relative',top:'-130px'}} class="w-full flex flex-row justify-center relative -top-12">
          <Skeleton height='140px' width='90px' style={{borderRadius:'50%'}} className='rounded-full border-solid border-white border-4'></Skeleton>
    </div>
    <div class="w-full flex flex-col items-center gap-y-3 relative -top-8">
          <Skeleton height='20px' width='200px'></Skeleton>
         <Skeleton height='10px' width='200px'></Skeleton>
    </div>
  
</div>
</div>
</div>
</div>

    </>
}