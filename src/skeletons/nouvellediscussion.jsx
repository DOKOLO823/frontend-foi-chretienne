import { Skeleton } from "@mui/material"
import { Link } from "react-router-dom"

export function NouvelleDiscussionSkeleton(){
    const tab=['','','','','','','','','','','','','','','']
    return <>
    <div class="h-full flex flex-row justify-center flex-wrap items-center gap-3 pb-24 w-3/4 listediscussion">
    
    {
        tab.map(()=>{
            return <div class="w-full px-2">
            <div class="bg-white shadow-md rounded-lg overflow-hidden md:flex">
                <div class="w-full">
                    <div class="p-2 pr-1 md:p-5 bg-gray-100">
                        <div class="flex justify-between items-center gap-x-3">
                        <Skeleton height='3rem' width='3rem' className="rounded-full"></Skeleton>
                            <div className="flex flex-col gap-y-2 w-full">
                            <Skeleton height='1rem' width='90%'></Skeleton>
                                <div class="flex items-start">
                                   
                                <Skeleton height='1em' width='70%'></Skeleton>
                                </div>
                            </div>
    
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
        })
    }
    
</div>
    </>
}