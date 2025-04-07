import { Skeleton } from "@mui/material"

export function Pourriezconnaitre()
{
    const tab=['','','','','','','','','','','','','','']

    return <>
     {/* ami  */}
            <div className='flex flex-col justify-center items-start w-full '>
               {/* suggestion  */}
               <div className='flex flex-col justify-center items-start w-full'>
        <div className='w-full flex flex-row justify-between items-center gap-x-4 overflow-x-auto px-2'>
        {tab.map((e)=>{
          return  <div style={{width:'25rem',height:'19rem'}} class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-row justify-center items-center">
        
          <div style={{width:'19rem',height:'17rem'}} class="flex flex-col items-center w-full mt-6 gap-y-2">
          <span className='flex flex-col items-center w-full'>
          <Skeleton height='105px' width='105px' className=' rounded-full' />
          <Skeleton height='1.3rem' width='60%' className='mt-2'></Skeleton></span>
          <Skeleton height='0.5rem' width='60%' className='mt-2'></Skeleton>
          <Skeleton height='0.3rem' width='50%' className='mt-2'></Skeleton>
          <Skeleton height='2.3rem' width='60%' className='mt-2'></Skeleton>
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