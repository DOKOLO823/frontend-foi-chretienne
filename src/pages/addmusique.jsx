import axios from "axios"
import { useContext, useState } from "react"
import { tokenContexte } from "../contexte/tokenContexte"
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from "react-router-dom"

export function AddMusique(){
   
    const {token}=useContext(tokenContexte)
    const navigate=useNavigate();
    const [titre, setTitre]=useState()
    const [auteur, setAuteur]=useState()
    const [video, setVideo]=useState()
    const addvideo=()=>{
       
        toast('envoi en cours')
        token ?  axios.post(`${process.env.REACT_APP_BACKEND_URL}/add-secret-musique`,{titre,auteur,video},{
            headers:{
                "Authorization": "Bearer "+token,
                "Content-type": "multipart/form-data",
              }
        }).then((res)=>{
            if(res.data.statut=='200'){
          toast('Musique ajouteé')
          console.log(res.data)
        
       
            }
          }).catch((err)=>{
          console.log(err)
          }) : navigate('/login')
        
    }
return <>
 <ToastContainer/>

<div class="max-w-sm mx-auto p-2">
  <div class="mb-5">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">titre de la musique</label>
    <input onChange={(e)=>{setTitre(e.target.value)}} type="text" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" />
  </div>
  <div class="mb-5">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom de l'auteur</label>
    <input onChange={(e)=>{setAuteur(e.target.value)}} type="text" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" />
  </div>
  <div class="mb-5">
    <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Video (courte)</label>
    <input onChange={(e)=>{setVideo(e.target.files[0])}} type="file" accept="video/*" id="repeat-password" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" />
  </div>
  
  <button onClick={addvideo} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
</div>

</>
}