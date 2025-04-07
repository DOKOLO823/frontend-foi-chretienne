import { Header } from '../components/header';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import voirPlus from '../icons/images/right.png';
import { Link } from 'react-router-dom';
import { Skeleton } from "@mui/material"

export function GroupeSkeleton()
{

      
    const tab=['','','','','','']
    const categories=['etude biblique','priere et Meditation','louange et adoration','autres']
   
    return <>
   <div className="flex flex-col justify-center items-center w-full">
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
       
      <div className="w-3/4 px-2 h-full flex flex-col items-center justify-center nouvelledivdroite">
      <div className='h-full w-11/12 flex flex-row justify-between flex-nowrap items-center gap-x-4 pb-3 border-b-2 border-b-gray-300 overflow-x-auto px-1 groupeoverflow'>
      {
            tab.map((e,i)=>{
                return <div class="" style={{width:'18rem'}}>
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

{/* suggestion de groupes  */}

<div className="h-full w-11/12 groupeoverflow pb-24">
{
    categories.map((c)=>{
        return <>
      <div className='h-full w-full flex flex-row justify-between flex-nowrap items-center gap-x-4 pb-3 mb-3 border-b-2 border-b-gray-300 overflow-x-auto px-1 groupeoverflow'>
      {
            tab.map((e,i)=>{
                return <div class="" style={{width:'18rem'}}>
                
                <div style={{width:'18rem'}} class="card-body bg-white ">
                <Skeleton height='8rem' width='100%'></Skeleton>
                  <p class="card-text gap-y-2 flex flex-col"> <Skeleton height='4rem' width='100%'></Skeleton> <Skeleton height='1rem' width='100%'></Skeleton> <span className="text-xs text-gray-700 flex flex-row start items-center ">  <Skeleton height='1rem' width='70%'></Skeleton> <span className='flex flex-row justify-center items-center gap-x-1'></span> </span>   <Skeleton height='1rem' width='50%'></Skeleton> </p>
                  <span className="flex flex-row items-center gap-x-3 pt-4">
                  <Skeleton height='40px' width='40px' className='rounded-full'></Skeleton>
                  <Skeleton height='2.5rem' width='6rem'></Skeleton>
                  <Skeleton height='2.5rem' width='6rem'></Skeleton>
                 </span>
                </div>
              </div>
            })
        }
</div>
        </>
    })
}
<Link to={'/envoyer-suggestion'} className='mt-2 text-sm text-violet-700 underline hover:text-violet-700 hover:font-bold'>Suggérer une catégorie</Link>
</div>


      </div>
       
    </div>

   </div>

<BackToTop/>
<BottomBar/>
    </>
}