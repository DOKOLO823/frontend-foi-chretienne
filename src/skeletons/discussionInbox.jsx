import { Skeleton } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import left from '../icons/images/left.png';
export function DiscussionInboxSkeleton(){
    const tab=['','']
    const navigate=useNavigate();
    return <>
     <div class="h-screen flex flex-col">
     <p onClick={()=>{navigate(-1)}} className="text-start mb-2 flex flex-row justify-start items-center gap-x-1 pl-4 pt-1 cursor-pointer"><span><img style={{height:'16px'}} src={left} alt="" /></span> retour</p>
    <div className="flex flex-row justify-between items-center mx-auto bg-white rounded-lg shadow-lg  sm:py-2 sm:space-y-0 sm:space-x-3 w-full">
                <Link 
            class="w-full px-4 flex flex-row justify-start gap-x-3 items-center text-decoration-none">
            <div> <Skeleton height="50px" width="50px" className="rounded-full"/> </div>
            <div class="text-center sm:text-left">
                <div class="py-2 flex flex-col items-start text-decoration-none gap-y-2">
                    <span class=" text-black font-semibold text-sm">
                     <Skeleton width="200px" height="20px"/>
                    </span>
                    <span class="text-slate-500 text-start text-xs">
                    <Skeleton width="200px" height="15px"/>
                    </span>
                </div>
               
            </div>
        </Link>
            </div>

    <div class="bg-gray-200 flex-1 overflow-y-scroll">
       {
        tab.map((e)=>{
            return  <div class="px-4 py-2 mb-3">
          {1==1 && <div className="bg-white">
            <Link class="flex items-center mb-2 text-decoration-none hover:text-violet-700 bg-white gap-x-2 px-2 pt-2">
            <Skeleton height="40px" width="40px" className="rounded-full"/>
                <div class="font-medium text-sm">
                <Skeleton width="200px" height="15px"/>
                    </div>
            </Link>
            <div className="text-xs pl-2"><Skeleton width="100px" height="10px"/></div>
            <div class="bg-white rounded-lg p-2 shadow mb-4 max-w-sm">
            <Skeleton style={{width:'100%'}} height="10rem"/>
            </div>
          </div>}
           {1==1 && <>
            <div style={{justifyContent:'end'}} class="flex items-center bg-white py-2">
                <div class=" flex flex-col w-full pl-2 gap-y-2">
                <div className="text-xs w-full"> <Skeleton width="100px" height="10px"/></div>
                <Skeleton style={{width:'100%'}} height="8rem"/>
                </div>
                <Skeleton height="40px" width="40px" className="rounded-full m-2"/>
            </div>
           </>}
        </div>
        })
       }
     
    </div>
  
</div>
    </>
}