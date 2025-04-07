import { Skeleton } from "@mui/material"

export function ApercuGroupeSkeleton()
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
                
               <div class="d-flex flex-row ml-3 justify-content-between p-2 px-3">
                       <span class="d-flex flex-row align-items-center text-decoration-none hover:text-violet-700"> <Skeleton height='50px' width='50px' className=' rounded-full' />
                           <div class="d-flex flex-column ml-2"> <Skeleton height='1.5rem' width='10rem' className='mt-2'></Skeleton> <Skeleton height='1rem' width='60%' className='mt-2'></Skeleton> </div>
                       </span>
                       <div class="d-flex flex-row mt-1 justify-content-center align-items-center ellipsis">
   
                       <Skeleton height='2.3rem' width='60%' className='mt-2'></Skeleton>
                       
                       </div>
                   </div>

               
                   {/* more  */}
                  
   
                 <div className="w-full flex flex-col justify-center items-center my-2 px-3 mt-3">
               
                 <span className="flex flex-col w-full gap-y-3 mt-3">
                <Skeleton height='24rem' width='100%'></Skeleton>
                 </span>
                 </div>
                 
                 
                   <div class="p-2 w-full">
                     
                       {/* <hr> */}
                     <div className="w-full pl-3 flex flex-col mt-3 pb-2 gap-y-4">
                        <div className="flex flex-row w-full justify-center items-center gap-x-2">
                            <span> <Skeleton height='2.5rem' width='2.5rem'></Skeleton></span><span className="flex flex-col gap-y-2">  <Skeleton height='5rem' width='12rem' className=''></Skeleton>   </span>
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