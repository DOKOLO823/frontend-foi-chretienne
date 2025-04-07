import { Skeleton } from "@mui/material"
import { Link } from "react-router-dom"

export function SuggestionAmi(){
    const tab=['','','','','','','','','','','','','','','']
    return <>
     <div className="h-full flex flex-row justify-center flex-wrap items-center gap-4 pb-24">
        {
            tab.map((e,i)=>{
                return <div key={i} style={{width:'300px'}} className='flex flex-col pb-3 border-gray-300 border-1 rounded-lg bg-white'>
             <Link className="w-full">
             <div className="flex flex-row px-4 py-2 gap-x-2 w-full mb-1">
               <Skeleton height='40px' width='40px' className='rounded-full'></Skeleton>
                <div className='flex flex-col justify-start gap-y-2 text-sm w-full'>
                    <span className='mb-1'><Skeleton height='20px' width='80%'></Skeleton></span><span style={{color:'black'}} className='text-xs'><Skeleton height='15px' width='98%'></Skeleton></span>
                </div>
               </div>
             </Link>
                <span className='flex flex-row justify-center items-center w-full'>
                      <Skeleton height='35px' width='80%'></Skeleton>
                    </span>
            </div>
            })
        }
      </div>
    </>
}