import { Skeleton } from "@mui/material"

export function DemandeDivDroitSkeleton()
{
    const tab=['']

    return <>
     {/* ami  */}
            <div className='flex flex-col justify-center items-start w-full '>
               {/* suggestion  */}
               <div className='flex flex-col justify-center items-start w-full'>
        <div className='w-full flex flex-row justify-between items-center gap-x-4 overflow-x-auto px-2'>
        {tab.map((e)=>{
          return  <div style={{width:'18rem',height:'19rem'}} class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-row justify-center items-center">
        
          <div style={{width:'18rem',height:'17rem'}} class="flex flex-col items-center w-full mt-6 gap-y-2">
          <span className='flex flex-col items-center w-full'>
          <Skeleton height='90px' width='90px' className=' rounded-full' />
          <Skeleton height='0.8rem' width='60%' className='mt-2'></Skeleton></span>
          <Skeleton height='0.5rem' width='60%' className='mt-2'></Skeleton>
         <span style={{height:'3rem'}} className="flex flex-row justify-center items-center gap-x-2 w-full">
         <Skeleton height='2.5rem' width='45%'></Skeleton>
         <Skeleton height='2.5rem' width='45%'></Skeleton>
         </span>
          </div>
      </div>
        }
    )}
    </div>
    </div>
    {/* end suggestion  */}

    
            </div>
    </>
}