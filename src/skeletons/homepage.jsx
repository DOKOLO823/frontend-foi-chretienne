import { Header } from '../components/header';
import { BottomBar } from '../components/bottomBar';
import { DivGauche } from '../part/divGauche';
import { Link } from 'react-router-dom';
import { Skeleton } from "@mui/material"

export function HomepageSkeleton()
{
 
 
    const tab=['','','','','','','','','','','','','','']
    const tabd=['','','','','','','']
    const pub=['','']
    return <>
   <div className="flex flex-col justify-center items-center w-full">
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
        <div className='w-1/4 divgauche'> </div>
        <div className='w-1/2 flex flex-col justify-center items-center position-relative -top-3 divcentre'>
    
        {/* search  */}
        
    <div class="relative bg-white w-11/12 mt-2 hidden rechercheMobile">
    <div className='flex flex-row justify-center items-center px-3 bg-white py-2 w-full'>
        <Skeleton height='2.3rem' width='100%'></Skeleton>
            </div>
    </div>


        {/* end search  */}
      
       
       
        



        </div>
        {/* div droit  */}
        <div className='w-1/4 divdroit'> 
        <div style={{height:'85vh'}} className=" flex flex-col justify-between items-center fixed overflow-y-auto pb-2 gap-y-8 w-1/4 px-4 bg-white">
       {/* demande amitie  */}
        <div className="flex flex-col w-full border-b border-b-2 border-b-gray-300 pb-4">
        <div className="flex flex-row justify-between items-center w-full text-xs mb-2"> <span>Demande d'amitié</span><Link to={'/demande'} className='py-2 flex flex-row justify-center items-center gap-x-1 text-decoration-none hover:text-violet-700'>Voir plus</Link> </div>
            <div className=''>
            <Skeleton height='12rem' width='100%'></Skeleton>
            </div>
        </div>

      {/* groupe  */}
      <div className="flex flex-col w-full">
     <div className="w-full flex flex-row justify-center items-center"> <Skeleton height='2.5rem' width='90%' className='rounded-3xl'></Skeleton></div>
     <div className="flex flex-row justify-between items-center w-full text-xs m-2"> <span>Vos groupes</span><Link to={'/mes-groupes'} className='flex flex-row justify-center items-center gap-x-1 text-decoration-none hover:text-violet-700'>Voir plus</Link> </div>
           <div className="flex flex-col justify-around items-start gap-y-4 mt-2 border-b border-b-2 border-b-gray-300 pb-4">
           {
            tabd.map((e)=>{
                return <Link className="flex flex-row justify-start items-center gap-x-2 text-decoration-none hover:text-violet-700">
                <Skeleton height='45px' width='45px' className='rounded-full'></Skeleton>
                 <div className='flex flex-col justify-center items-start text-sm gap-y-2'>
                     <Skeleton height='1rem' width='10rem'></Skeleton>  <Skeleton height='1rem' width='5rem'></Skeleton>
                 </div>
                </Link>
            })
           }
           </div>
      </div>

      {/* suggestion de groupes  */}
      <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between items-center w-full text-xs m-2"> <span>Suggestions</span><Link to={'/les-groupes'} className='flex flex-row justify-center items-center gap-x-1 text-decoration-none hover:text-violet-700'>Voir plus</Link> </div>
           <div className="flex flex-col justify-around items-start gap-y-4 mt-2 border-b border-b-2 border-b-gray-300 pb-4">
           {
            tabd.map((e)=>{
                return <div className="flex flex-row justify-start items-center gap-x-2">
               <Skeleton height='45px' width='45px' className='rounded-full'></Skeleton>
                 <div className='flex flex-col justify-center items-start text-sm gap-y-2'>
                <Skeleton height='1.5rem' width='10rem'></Skeleton> <span className='flex flex-row gap-x-2'>  <Skeleton height='1rem' width='4rem'></Skeleton>  <Skeleton height='1rem' width='4rem'></Skeleton></span>
                 </div>
                </div>
            })
           }
           </div>
      </div>

       {/* amis en ligne  */}
       <div className="flex flex-col w-full">
       <p className="text-start text-sm">Vos ami(e)s en ligne actuellement :</p>
        
           <div className="flex flex-col justify-around items-start gap-y-4 mt-2 border-b border-b-2 border-b-gray-300 pb-4">
           {
            tabd.map((e)=>{
                return <Link className="flex flex-row  gap-x-3 justify-start items-center text-decoration-none hover:text-violet-700">
                <Skeleton height='45px' width='45px' className='rounded-full'></Skeleton>
                 <div className='flex flex-col justify-center items-start text-sm gap-y-2'>
                 <Skeleton height='1.3rem' width='10rem'></Skeleton>  <Skeleton height='1rem' width='5rem'></Skeleton>
                 </div>
                </Link>
            })
           }
           </div>
      </div>

    </div>

   
         </div>
    </div>

  

   </div>
<BottomBar/>
    </>
}