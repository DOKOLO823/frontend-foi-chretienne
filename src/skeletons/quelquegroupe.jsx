import { Skeleton } from "@mui/material"

export function Quelquegroupe()
{
    const tab=['','','','','','','','','','','','','','']

    return <>
     {/* ami  */}
            <div className='flex flex-col justify-center items-start w-full '>
               {/* suggestion  */}
               <div className='flex flex-col justify-center items-start w-full'>
        <div className='w-full flex flex-row justify-between items-center gap-x-4 overflow-x-auto px-2'>
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
    </div>
    {/* end suggestion  */}

    
            </div>
    </>
}