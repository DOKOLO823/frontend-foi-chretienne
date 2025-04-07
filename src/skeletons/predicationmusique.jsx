import { Header } from '../components/header';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { Skeleton } from "@mui/material"
export function PredicationMusique()
{
    const tab=['','','','','','','','','','','','']
    return <>
   <div className="flex flex-col justify-center items-center w-full">
    
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
       
      <div className="w-3/4 px-2 h-full flex flex-col items-center justify-center nouvelledivdroite">
      <div className="h-full flex flex-col justify-center flex-wrap items-center gap-4 pb-24 position-relative -top-16 w-full">
        {
            tab.map((e,i)=>{
                return <div class="position-relative flex flex-col items-center -top-8 bg-white p-2" style={{width:'20rem'}}>
                   <Skeleton height='8rem' width='98%'></Skeleton>
                <div class="flex flex-col bg-white w-full">
                    <Skeleton height='1.3rem' width='100%' className='mb-2 mt-2'></Skeleton>
                    <Skeleton height='1rem' width='80%'></Skeleton>
                  <div className="flex w-full flex-row justify-between pt-3 px-3">
                <div className="flex flex-row items-center gap-x-2">   <Skeleton height='30px' width='30px' className='rounded-full'></Skeleton>   <Skeleton height='10px' width='40px'></Skeleton> </div>
                  <Skeleton height='1.5rem' width='20px'></Skeleton>
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