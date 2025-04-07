import { Link, useNavigate } from "react-router-dom"
import { Header } from "../components/header"
import { BottomBar } from "../components/bottomBar"
import { BackToTop } from "../components/backToTop"
import { DivGauche } from "../part/divGauche"
import left from '../icons/images/left.png';
import { useQuery } from "react-query"
import axios from "axios"
import { tokenContexte } from "../contexte/tokenContexte"
import { useContext } from "react"
import { NouvelleDiscussionSkeleton } from "../skeletons/nouvellediscussion"

export function NouvelleDiscussion(){
    const tab=['','','','','','','','','','','','','','','','','','','','','','']
    const navigate=useNavigate();
     const {token}=useContext(tokenContexte)

    const {data:nouvellediscussion,isLoading}=useQuery({
        queryKey:['nouvelle-discussion'],
        queryFn:()=>token ? axios.get(`${process.env.REACT_APP_BACKEND_URL}/nouvelle-discussion`,{
          headers:{
            "Authorization": "Bearer "+token
          }
        }) : navigate('/login')
      })

    return <>
     <div className="flex flex-col justify-center items-center w-full">
    <Header/>
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
        <div className=' flex flex-col items-start divgauche'> <DivGauche/> </div>
      <div className="w-3/4 h-full flex flex-col items-center justify-center nouvelledivdroite">
      <div className="h-full flex flex-row justify-center flex-wrap items-center gap-4 pb-24 w-3/4 listediscussion">
      <p className="text-start flex flex-row justify-start items-center gap-x-4 w-full pl-3"><span onClick={()=>{navigate(-1)}} className='cursor-pointer'><img style={{height:'16px'}} src={left} alt="" /></span></p>

      <div className='flex flex-row justify-center items-center px-3 w-full'>
                     Avec qui voulez-vous converser ?
                  </div>

      
      <div className="w-full h-full flex flex-col p-3 gap-y-3 mb-12">
        {/* <input autoFocus={true} type="search" id="default-search" class="block w-full p-2 pl-4 indent-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-violet-700 focus:border-violet-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-700 dark:focus:border-violet-700" placeholder="Rechercher une personne" /> */}
       
    {
      !isLoading ?  nouvellediscussion?.data?.discussions?.map((e)=>{
            return <div className="flex flex-row justify-between items-center mx-auto bg-white rounded-lg shadow-lg  sm:py-2 sm:space-y-0 sm:space-x-3 hover:scale-105 hover:duration-700 hover:rounded-3xl w-full">
                <Link to={'/discussion/'+e?.id}
            class="w-full px-4 flex flex-row justify-start gap-x-3 items-center text-decoration-none">
            <div><img class="mx-auto h-12 w-12 rounded-full sm:mx-0 sm:shrink-0" src={process.env.REACT_APP_BACKEND_FILE+e?.pp} alt="avatar"/></div>
            <div class="text-center sm:text-left">
                <div class="py-2 flex flex-col items-start text-decoration-none">
                    <span class=" text-black font-semibold text-sm">
                    {e?.nom?.substring(0,20)?.toUpperCase()} {e?.prenom?.substring(0,11)?.toUpperCase()}
                    </span>
                    <span class="text-slate-500 text-start text-xs">
                    {e?.pseudo?.length>30 ? e?.pseudo?.substring(0,30)+'...' : e?.pseudo}
                    </span>
                </div>
               
            </div>
        </Link>
            </div>
        }) :<NouvelleDiscussionSkeleton/>
    }

    </div>

      </div>

      </div>
       
    </div>

   </div>

<BackToTop/>
<BottomBar/>
    </>
}