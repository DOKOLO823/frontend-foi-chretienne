import { Skeleton } from "@mui/material"

export function SuggestionGroupeHomeSkeleton()
{
    const pub=['']
    const tab=['', '', '','','']

    return <>
    <div className="w-full pl-3 flex flex-col mt-3 pb-2 gap-y-4 bg-white py-3">
                       {
                        tab.map((e)=>{
                            return  <div className="flex flex-row gap-x-2">
                            <span> <Skeleton height='3rem' width='3rem' className='rounded-full'></Skeleton></span><span style={{height:'3rem'}} className="flex flex-col gap-y-2">  <Skeleton height='1rem' width='10rem' className=''></Skeleton>  <Skeleton height='0.5rem' width='3rem' className=''></Skeleton> </span>
                        </div>
                        })
                       }
                     </div>
    </>
}