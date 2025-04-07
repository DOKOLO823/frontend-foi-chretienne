import { Skeleton } from "@mui/material"

export function MonoPublicationCardSkeleton()
{
    const pub=['']
    const tab=['', '', '','','']

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
                      
                       <div class="d-flex flex-row justify-content-between align-items-center border-b border-b-1 w-full gap-x-4">
                       <Skeleton height='2rem' width='30%' className='mt-2'></Skeleton>
                       <Skeleton height='2rem' width='30%' className='mt-2'></Skeleton>
                       <Skeleton height='2rem' width='30%' className='mt-2'></Skeleton>
                       </div>
                      </div>
                     <div className="w-full pl-3 flex flex-col mt-3 pb-2 gap-y-4">
                       {
                        tab.map((e)=>{
                            return  <div className="flex flex-row gap-x-2">
                            <span> <Skeleton height='3rem' width='3rem' className='rounded-full'></Skeleton></span><span style={{height:'3rem'}} className="flex flex-col gap-y-2">  <Skeleton height='1rem' width='10rem' className=''></Skeleton>  <Skeleton height='2rem' width='7rem' className=''></Skeleton>  <Skeleton height='1rem' width='3rem' className=''></Skeleton> </span>
                        </div>
                        })
                       }
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