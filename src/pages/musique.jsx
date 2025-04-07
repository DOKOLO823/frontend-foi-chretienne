import { Header } from '../components/header';
import music from '../images/music.svg';
import left from '../icons/images/left.png';
import coeur from '../icons/images/coeur.png';
import coeurv from '../icons/images/coeurv.png';
import partager from '../icons/images/partager.png';
import ok from '../icons/images/ok.png';
import group from '../icons/images/group.png';
import facebook from '../icons/images/facebook.png';
import whatsapp from '../icons/images/whatsapp.png';
import { useContext, useEffect, useState } from 'react';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { Link, useNavigate } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import axios from 'axios';
import { tokenContexte } from '../contexte/tokenContexte';
import ClipLoader from 'react-spinners/ClipLoader';
import { userContexte } from '../contexte/userContexte';
import { PredicationMusique } from '../skeletons/predicationmusique';
import { useQuery } from 'react-query';
export function Musique()
{
  const {token}=useContext(tokenContexte)
   const {userstore}=useContext(userContexte)
    const navigate=useNavigate();
    const likerPredication=(id)=>{
        if(document.getElementById(id+'iconcoeursuggestion').src==coeur){
          document.getElementById(id+'iconcoeursuggestion').src=coeurv
          document.getElementById(id+'iconcoeursuggestion').style.transform='scale(1.2)'
         
          
           token ?  axios.post(`${process.env.REACT_APP_BACKEND_URL}/add-like-musique`,{id},{
            headers:{
                "Authorization": "Bearer "+token
              }
        }).then((res)=>{
            if(res.data.statut=='200'){
         //  toast('Predicationé')
        //  console.log(res.data)
       
            }else{
           
            }
          }).catch((err)=>{
          // console.log(err)
          }) : navigate('/login')


        }else{
          document.getElementById(id+'iconcoeursuggestion').src=coeur
          document.getElementById(id+'iconcoeursuggestion').style.transform='scale(1)'
        

          token ?  axios.post(`${process.env.REACT_APP_BACKEND_URL}/add-like-musique`,{id},{
            headers:{
                "Authorization": "Bearer "+token
              }
        }).then((res)=>{
            if(res.data.statut=='200'){
         //  toast('Predicationé')
        //  console.log(res.data)
       
            }else{
           
            }
          }).catch((err)=>{
          // console.log(err)
          }) : navigate('/login')
        }
      
      }

       // copy clipboard 
         const [textCopy, setTextCopy]=useState('texte a partager')
         const [statutCopy,setStatutCopy]=useState(false)
        //  const [predications, setPredications]=useState([])
         const [statemusique, setStatemusique]=useState([])

          const {data:musiques,isLoading}=useQuery({
            queryKey:['musiques'],
            queryFn:()=>axios.get(`${process.env.REACT_APP_BACKEND_URL}/musiques`,{
              headers:{
                "Authorization": "Bearer "+token
              }
            })
          })

           useEffect(()=>{
            setStatemusique(musiques?.data?.musiques)
           },[musiques])

          //  partage predication 
          const [id, setId]=useState(null)
          const [loadpartage, setLoadpartage]=useState(false)
          const partagewhatsapp=()=>{
            setLoadpartage(true)
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/add-partage-musique`,{id},{
              headers:{
                "Authorization": "Bearer "+token
              }
            }).then((res)=>{
              setLoadpartage(false)
              window.location.href="https://wa.me/?text=https://foichretienne.org/musique/"+id
            })
          }
      
          const partagefacebook=()=>{
            setLoadpartage(true)
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/add-partage-musique`,{id},{
              headers:{
                "Authorization": "Bearer "+token
              }
            }).then((res)=>{
              setLoadpartage(false)
              window.location.href="https://www.facebook.com/sharer/sharer.php?u=https://foichretienne.org/musique/"+id+";src=sdkpreparse"
            })
          }

          // filtre 
          const [recherche, setRecherche]=useState(null)
          useEffect(()=>{
            if(recherche==null || typeof(recherche)==undefined){
             setStatemusique(musiques?.data?.musiques)
            }else{
              const filter=()=>musiques?.data?.musiques?.filter(el=>((el?.titre?.toLowerCase()?.includes(recherche?.trim()?.toLowerCase())) || (el?.auteur?.toLowerCase()?.includes(recherche?.trim()?.toLowerCase()))))
              setStatemusique(filter)
            }
          },[recherche])

    return <>
   <div className="flex flex-col justify-center items-center w-full">
    <Header/>
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
        <div className=' flex flex-col items-start divgauche'> <DivGauche/> </div>
      <div className="w-3/4 px-2 h-full flex flex-col items-center justify-center nouvelledivdroite">
      <div className='text-center bg-white p-4 font-italic w-full rounded-lg position-relative -top-2 psaume'>Chantez en l’honneur de Dieu, célébrez son nom, préparez le chemin à celui qui s’avance à travers les déserts! L’Eternel est son nom: réjouissez-vous devant lui!<br/><br/><span className="bg-violet-700 text-white p-1 rounded-lg px-3 font-bold">Psaume 68 : 5</span></div>
      <p className="text-center text-xl text-violet-700 px-2 rounded-lg mt-3">Musiques :</p>
      <input onChange={(e)=>{setRecherche(e.target.value)}} type="search" id="default-search" class="block w-4/5 py-2 px-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-violet-700 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4 mt-3" placeholder="Rechercher une predication" />
      <div className="h-full flex flex-col justify-center flex-wrap items-center gap-4 pb-24 mt-12 w-full">
        {
            musiques ? statemusique?.map((e,i)=>{
                return <div class="position-relative -top-8 bg-white" style={{width:'100%'}}>
                <img src={music} class="card-img-top"/>
                
                <div class="card-body bg-white">
                  <h5 class="card-title font-bold">{e.auteur}</h5>
                  <p class="card-text position-relative -top-2"> {e.titre}</p>
                  <div className="flex w-full flex-row justify-between">
                  <span className="flex flex-row justify-center items-center gap-x-2">
                  <img id={e.id+'iconcoeursuggestion'} onClick={()=>{likerPredication(e.id)}} className='amenpub position-relative cursor-pointer' style={{height:'20px',transition:'all ease 0.6s'}} src={userstore && e.likeur?.includes(userstore?.data?.id+',') ? coeurv : coeur} alt="" /> <span id={'nombrelike'+e.id}>{e.like}</span>
                  </span>
                  <button onClick={()=>{setId(e.id)}} data-bs-toggle="modal" data-bs-target="#exampleModalpartage" className='flex flex-row justify-center items-center gap-x-2 text-sm p-1 px-2 rounded-xl partagepub'><img className='partagepub' style={{height:'19px'}} src={partager} alt="" />{e.partage} </button>
                  </div>
                  <Link to={'/musique/'+e.id} className="w-full btn bg-violet-700 text-white text-center focus:bg-violet-600 active:bg-violet-600 hover:bg-violet-600 mt-2">Ecouter</Link>
                </div>
                </div>
            }): <PredicationMusique/>
        }
      </div>

      </div>
       
    </div>

   </div>

<BackToTop/>
<BottomBar/>

{/* modal partage  */}
<div class="modal fade h-full" id="exampleModalpartage" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog h-full" role="document">
    <div class="modal-content ">
  
      <div class="modal-header">
       <h5 className='font-bold'>Partager</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div style={{height:'60%'}} class="modal-body">
       
         
         <div className="w-full flex flex-col justify-center items-start gap-y-8">
            <div className='flex flex-col items-start gap-y-1.5'><span className='text-sm font-bold'>Copier le lien de la publication</span>
            {/* lien publication  */}
            <span>
                
<div style={{width:'100%',flexWrap:'wrap'}} class=" gap-2 w-full flex flex-row">
    <CopyToClipboard text={'https://foichretienne.org/musique/'+id}
          onCopy={() => setStatutCopy(!statutCopy)}>
          <button style={{backgroundColor:'rgb(109 40 217)',paddingLeft:'10px',paddingRight:'10px',borderRadius:'5px',color:'white'}}>{statutCopy ? <span className='text-small' style={{color: 'red',fontSize:'small',flexWrap:'nowrap',width:'100%'}}> <img src={ok} style={{height:'25px'}} alt="" /> </span> : 'Copier'}</button>
        </CopyToClipboard>
</div>

            </span>
            </div>
            {/* <div className='flex flex-col items-start justify-center gap-y-1.5'><span className='text-sm font-bold'>Partager avec : </span>
            <span className='flex flex-row items-start gap-x-4 gap-y-1.5 w-1/4 pr-6 overflow-x-auto'>
              {tab2.map((e)=>{ return   <span className='flex flex-col justify-center items-center'><span style={{backgroundImage:`url(${docta})`,backgroundPosition:'center',backgroundSize:'cover'}} className='h-12 w-12 rounded-full'></span><span className='text-xs w-16 text-center'>Nom destinataire</span></span>})}
            </span>
            </div> */}
            
            <div className='flex flex-col items-start justify-center gap-y-1.5'><span className='text-sm font-bold'>Partager sur : </span>
            <span className='flex flex-row items-start gap-x-4 gap-y-1.5 w-full flex-wrap overflow-x-auto'>
               {/* <span className='flex flex-col justify-center items-center'><span style={{backgroundImage:`url(${docta})`,backgroundPosition:'center',backgroundSize:'cover'}} className='h-10 w-10 rounded-full'></span><span className='text-xs w-16 text-center'>Ma page</span></span>
               <span className='flex flex-col justify-center items-center'><span style={{backgroundImage:`url(${group})`,backgroundPosition:'center',backgroundSize:'cover'}} className='h-10 w-10 rounded-full'></span><span className='text-xs w-16 text-center'>Groupes</span></span> */}
              <a onClick={partagewhatsapp} target="_blank"> <span className='flex cursor-pointer flex-col justify-center items-center text-decoration-none hover:text-violet-700'><span style={{backgroundImage:`url(${whatsapp})`,backgroundPosition:'center',backgroundSize:'cover'}} className='h-10 w-10 rounded-full'></span><span className='text-xs w-16 text-center'>WhatsApp</span></span></a>
              <ClipLoader className='position-relative top-1.5' color={'rgb(109 40 217)'}  loading={loadpartage}  size={30}/>
               <div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="" data-size="">
               <a onClick={partagefacebook} target="_blank" className='text-decoration-none cursor-pointer hover:text-violet-700 fb-xfbml-parse-ignore'> <span className='flex flex-col justify-center items-center'><span style={{backgroundImage:`url(${facebook})`,backgroundPosition:'center',backgroundSize:'cover'}} className='h-10 w-10 rounded-full'></span><span className='text-xs w-16 text-center'>Facebook</span></span></a>
               </div>
           
            </span>
            </div>

         </div>
      </div>
   
     
    
    </div>
  </div>
</div>
    </>
}