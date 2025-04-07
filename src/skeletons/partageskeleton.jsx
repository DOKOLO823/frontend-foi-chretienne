import { Skeleton } from "@mui/material"

export function Partageskeleton()
{
    const tab=['','','','','','','','','','','','','','']

    return <>
     <div className='w-full flex flex-col justify-center items-center bg-white mt-2 rounded-lg'>
            <div className='flex flex-row justify-center items-center bg-white p-3 gap-x-3 rounded-lg w-full humeur border-b border-b-1'><span><Skeleton height='40px' width='40px' className=' rounded-full' /></span><span className='w-2/3 pereboutomhumeur'><Skeleton height='2.5rem' className=' rounded-2xl w-full boutonhumeur' ></Skeleton></span></div>
            <div className='flex flex-col justify-start items-center px-3 w-full pb-3'>
               
                    <div className="w-full flex flex-row justify-center items-center gap-x-2 p-3">
                    <Skeleton height='25px' width='25px' className=' rounded-full' />
                    <Skeleton height='1.5rem' width='50%'></Skeleton>
                    <Skeleton height='17px' width='17px' />
                    </div>
                    
                    <Skeleton height='4rem' width='100%'></Skeleton>
               
            </div>

        </div>
    </>
}