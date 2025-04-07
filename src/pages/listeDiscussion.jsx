import { Link, useNavigate } from "react-router-dom"
import { Header } from "../components/header"
import { BottomBar } from "../components/bottomBar"
import { BackToTop } from "../components/backToTop"
import { DivGauche } from "../part/divGauche"
import plus from '../icons/images/plus.png';
import { useQuery } from "react-query"
import axios from "axios"
import { tokenContexte } from "../contexte/tokenContexte"
import { useContext } from "react"
import { ListeDiscussionSkeleton } from "../skeletons/listediscussion"

export function ListeDiscussion(){
    const navigate=useNavigate();
     const {token}=useContext(tokenContexte)
    const tab=['','','','','','','','','','','','','','','','','','','','','','']
    
    //  liste des discussions 
    const {data:discussions,isLoading}=useQuery({
        queryKey:['discussions'],
        queryFn:()=>token ? axios.get(`${process.env.REACT_APP_BACKEND_URL}/discussions`,{
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

      <div className='flex flex-row justify-center items-center px-3 mt-4 w-full'>
                      <div class="dropdown flex flex-row justify-start items-center border-b bg-white border-b-1 p-1.5 w-2/3 lancerprierenow rounded-3xl">
                             <Link to={'/nouvelle-discussion'} class="text-sm hover:text-violet-700 w-full flex flex-row justify-center items-center text-decoration-none" type="button" >
                             <img style={{height:'20px'}}  src={plus} alt="" />&nbsp; <span>Démarrer une nouvelle discussion</span>
                            </Link>
                           
                     </div>
                  </div>

      
      <div className="w-full h-full flex flex-col p-3 gap-y-3 mb-12">
        <p className="text-center mb-3 text-violet-700 font-medium border-solid border-1 border-violet-700 rounded-lg">Vos discussions privées</p>
        
    {
       discussions ? discussions?.data?.liste?.map((e)=>{
            return <div className="flex flex-row justify-between items-center mx-auto bg-white rounded-lg shadow-lg  sm:py-2 sm:space-y-0 sm:space-x-3 hover:scale-105 hover:duration-700 hover:rounded-3xl w-full">
                <Link to={'/discussion/'+e?.interlocuteur?.id}
            class="w-full px-4 flex flex-row justify-start gap-x-3 items-center text-decoration-none">
            <div className="py-2"><img class="mx-auto h-12 w-12 rounded-full sm:mx-0 sm:shrink-0" src={process.env.REACT_APP_BACKEND_FILE+e?.interlocuteur?.pp} alt="avatar"/></div>
            <div class="text-center sm:text-left">
                <div class="py-2 flex flex-col items-start text-decoration-none">
                    <span class=" text-black font-semibold text-xs">
                        {e?.interlocuteur?.nom?.substring(0,20)?.toUpperCase()} {e?.interlocuteur?.prenom?.substring(0,11)?.toUpperCase()}
                    </span>
                    <span class="text-slate-500 text-start text-xs">
                     {e?.interlocuteur?.pseudo?.length>30 ? e?.interlocuteur?.pseudo?.substring(0,30)+'...' : e?.interlocuteur?.pseudo}
                    </span>
                </div>
               
            </div>
        </Link>
       {e?.nonlue>0 ?  <span className="position-relative right-4 text-xs bg-violet-700 text-white p-1 rounded-full h-6 w-6 flex flex-col justify-center items-center font-medium">{e?.nonlue>9 ? '9+' : e?.nonlue}</span> :''}
            </div>
        }) :<ListeDiscussionSkeleton/>
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