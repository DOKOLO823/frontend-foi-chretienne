import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { tokenContexte } from "../contexte/tokenContexte"
import { useContext } from "react"
import axios from "axios"
import ClipLoader from "react-spinners/ClipLoader"

export function GroupeNonValide()
{
    const navigate=useNavigate()
        const {token}=useContext(tokenContexte)

    const {data:lesgroupesnonvalides,isLoading}=useQuery({
        queryKey:['listegroupenonvalide'],
        queryFn:()=> token ? axios.get(`${process.env.REACT_APP_BACKEND_URL}/listegroupenonvalide`,{
          headers:{
            "Authorization": "Bearer "+token
          }
       }) :navigate('/login')
      
      })
 
      const validergroupe=(id,idbouton)=>{
        document.getElementById(idbouton).textContent='en cours de validation...'
       axios.post(`${process.env.REACT_APP_BACKEND_URL}/valider-groupe`, {id},{
           headers:{
               "Authorization": "Bearer "+token
             }
       }).then((res)=>{
           if(res.data.statut=='200'){
            document.getElementById(idbouton).textContent='Groupe validé'
        
           }else{
           
           }
         })
       
     }


    return <>
   <span className="text-center p-3"> groupes non valides : </span>
    <div className="w-full h-full flex flex-row flex-wrap justify-center items-center p-3 gap-4">

        

{
   !isLoading ? lesgroupesnonvalides?.data?.liste?.map((e)=>{
        return <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{e?.nom}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{e?.objectif}</p>
        <a id={e?.id+'bouton'} onClick={()=>{validergroupe(e?.id,e?.id+'bouton')}} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Valider
           
        </a>
    </div>
    }) :  <ClipLoader color={'black'}  loading={true}  size={30}/>
}


    </div>
    </>
}