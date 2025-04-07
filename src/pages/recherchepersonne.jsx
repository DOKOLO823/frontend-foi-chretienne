import { Header } from '../components/header';
import docta from '../images/docta.jpg';
import point from '../icons/images/point.png';
import coeur from '../icons/images/coeur.png';
import coeurv from '../icons/images/coeurv.png';
import left from '../icons/images/left.png';
import { useContext, useEffect, useState } from 'react';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { Link, useNavigate } from 'react-router-dom';
import { tokenContexte } from '../contexte/tokenContexte';
import { useQuery } from 'react-query';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
export function RecherchePersonne()
{
    const tab=['','','','','','','','','','','','','','','']
    const navigate=useNavigate()
    useEffect(()=>{
      if(!token){
        navigate('/login')
      }
    },[])

    // liker un de mes groupes
  const likeramen=(id)=>{
    if(document.getElementById(id+'iconcoeur').src==coeur){
      document.getElementById(id+'iconcoeur').src=coeurv
      document.getElementById(id+'iconcoeur').style.transform='scale(1.2)'
    }else{
      document.getElementById(id+'iconcoeur').src=coeur
      document.getElementById(id+'iconcoeur').style.transform='scale(1)'
    }

}

let [loading, setLoading] = useState(false);
let [color, setColor] = useState("black");
const [vide, setVide]=useState('')
const [recherche, setRecherche]=useState(null)
const [liste, setListe]=useState([])
const {token}=useContext(tokenContexte)
const search= async()=>{
    if(recherche?.trim() && !recherche?.trim()?.match("[^a-zA-Z]")){
        setVide('')
        setLoading(true)
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/recherche-personne/${recherche}`,{
            headers:{
                "Authorization": "Bearer "+token
              }
        }).then((res)=>{
            setListe(res.data.liste)
            setLoading(false)
            if(res.data.liste.length==0){
                setVide('Aucun résultat désolé.')
            }else{
                setVide('')
            }
        })
    }
  }
  useEffect(()=>{
    search()
  },[recherche])

    return <>
   <div className="flex flex-col justify-center items-center w-full">
    <Header/>
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
        <div className=' flex flex-col items-start divgauche'> <DivGauche/> </div>
       
      <div className="w-3/4 px-2 h-full flex flex-col items-center justify-center nouvelledivdroite">
     <div className="w-full flex flex-col items-center">
     <span onClick={()=>{navigate(-1)}} className='cursor-pointer px-8 w-full mb-3'><img className='float-left' style={{height:'16px'}} src={left} alt="" /></span>
     <input autoFocus={true} type="search" onChange={(e)=>{setRecherche(e.target.value.toLowerCase())}} id="default-search" class="block w-full py-2 px-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-violet-700 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4" placeholder="Rechercher une personne..." />
     </div>
      <div className="h-full flex flex-col justify-center flex-wrap items-center gap-4 pb-24 w-11/12">
      <ClipLoader color={color}  loading={loading}  size={30}/>
      {vide}
        {
            liste.length>0 ? liste.map((e,i)=>{
                return <div className="flex flex-row justify-between items-center mx-auto bg-white rounded-lg shadow-xs  sm:py-2 sm:space-y-0 sm:space-x-3 hover:scale-105 hover:duration-700 hover:rounded-3xl w-full py-2">
                <Link to={'/profile/'+(e.id)}
            class="w-full px-4 flex flex-row justify-start gap-x-3 items-center text-decoration-none">
            <div><img class="mx-auto h-10 w-10 rounded-full sm:mx-0 sm:shrink-0" src={e.pp && process.env.REACT_APP_BACKEND_FILE+e.pp} alt="avatar"/></div>
            <div class="text-center sm:text-left">
                <div class="py-2 flex flex-col items-start text-decoration-none">
                    <span class="text-sm text-black font-semibold flex flex-row">
                       {e.nom?.length>20 ? e.nom?.substr(0,20)+'...' : e.nom} 
                    </span>
                    <span class="text-slate-500 text-start text-xs">
                     {e.pseudo && (e.pseudo?.length>30 ? e.pseudo?.substr(0,25)+'...' : e.pseudo)}
                    </span>
                </div>
               
            </div>
        </Link>
            </div>
            }) : <p></p>
        }
      </div>

      </div>
       
    </div>

   </div>

<BackToTop/>
<BottomBar/>
    </>
}