import { Skeleton } from "@mui/material"

export function PublicationCardSkeleton()
{
    const pub=['','','','','']

    return <>
     {/* publication  */}
     {
        pub.map(()=>{
          return  <div className=" h-full w-full">
       
          <div class=" mt-3 flex flex-row justify-center items-center w-full">
       <div class="row d-flex align-items-center justify-content-center w-full">
           <div class=" w-full">
               <div class="card w-full">
                   <div class="d-flex justify-content-between p-2 px-3">
                       <span class="d-flex flex-row align-items-center text-decoration-none hover:text-violet-700"> <Skeleton height='50px' width='50px' className=' rounded-full' />
                           <div class="d-flex flex-column ml-2"> <Skeleton height='1.5rem' width='10rem' className='mt-2'></Skeleton> <Skeleton height='1rem' width='60%' className='mt-2'></Skeleton> </div>
                       </span>
                       <div class="d-flex flex-row mt-1 justify-content-center align-items-center ellipsis">
   
                       <Skeleton height='2.3rem' width='60%' className='mt-2'></Skeleton>
                       
                       </div>
                   </div>
                   {/* more  */}
                  
   
                 <div className="w-full flex flex-col justify-center items-center my-2">
                 <Skeleton height='20rem' width='90%'></Skeleton>
                 </div>
                 
                 
                   <div class="p-2 w-full">
                     
                       {/* <hr> */}
                      <div className="flex flex-col justify-between items-center gap-y-2">
                      
                       <div class="d-flex flex-row justify-content-between align-items-center pereiconspub border-b border-b-1 w-full gap-x-3">
                       <Skeleton height='2rem' width='60%' className='mt-2'></Skeleton>
                       <Skeleton height='2rem' width='60%' className='mt-2'></Skeleton>
                       <Skeleton height='2rem' width='60%' className='mt-2'></Skeleton>
                       </div>
                      </div>
                     
                   </div>
               </div>
           </div>
   </div>
   </div>
       
          </div>
        })
      }
    </>
}