import { Header } from '../components/header';
import docta from '../images/docta.jpg';
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
import { Link, useNavigate, useParams } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import axios from 'axios';
import { tokenContexte } from '../contexte/tokenContexte';
import ClipLoader from 'react-spinners/ClipLoader';
import { userContexte } from '../contexte/userContexte';
import { PredicationMusique } from '../skeletons/predicationmusique';
import { MonopredicationMusiqueSkeleton } from '../skeletons/monopredicationmusique';
import { useQuery } from 'react-query';
export function Monomusique()
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
     
            }else{
           
            }
          }).catch((err)=>{
          console.log(err)
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
        
       
            }else{
           
            }
          }).catch((err)=>{
          console.log(err)
          }) : navigate('/login')
        }
      
      }

       // copy clipboard 
         const [textCopy, setTextCopy]=useState('texte a partager')
         const [statutCopy,setStatutCopy]=useState(false)
        const [e, setE]=useState({})

        const {idmusique}=useParams('idmusique')
          

          const {data:musique,isLoading}=useQuery({
            queryKey:['musique','idmusique'],
            queryFn:()=>axios.get(`${process.env.REACT_APP_BACKEND_URL}/musique/${idmusique}`,{
              headers:{
                "Authorization": "Bearer "+token
              }
            })
          })

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

      console.log(musique)

    return <>
   <div className="flex flex-col justify-center items-center w-full">
    <Header/>
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
        <div className=' flex flex-col items-start divgauche'> <DivGauche/> </div>
      <div className="w-3/4 px-2 h-full flex flex-col items-center justify-center nouvelledivdroite">
      <p className="text-start flex flex-row justify-start items-center gap-x-4 w-full pl-3"><span onClick={()=>{navigate(-1)}} className='cursor-pointer'><img style={{height:'16px'}} src={left} alt="" /></span></p>
      <p className="text-center text-xl text-violet-700 px-2 rounded-lg mt-3">{musique?.data?.musique?.titre?.toUpperCase()} <br/><span className="text-black"> {musique?.data?.musique?.auteur}</span></p>
      <div className="h-full flex flex-col justify-center flex-wrap items-center gap-4 pb-24 mt-12 w-full">
      
               {
                musique ?   <div class="position-relative -top-8 bg-white" style={{width:'100%'}}>
                <video autoPlay={true} controlsList='nodownload' src={process.env.REACT_APP_BACKEND_FILE+musique?.data?.musique?.lienvideo} class="card-img-top" controls></video>
                
                <div class="card-body bg-white">
                  <h5 class="card-title font-bold">{e.titre}</h5>
                  <p class="card-text position-relative -top-2"> {e.auteur}</p>
                  <div className="flex w-full flex-row justify-between">
                  <span className="flex flex-row justify-center items-center gap-x-2">
                  <img id={musique?.data?.musique?.id+'iconcoeursuggestion'} onClick={()=>{likerPredication(musique?.data?.musique?.id)}} className='amenpub position-relative cursor-pointer' style={{height:'20px',transition:'all ease 0.6s'}} src={userstore && musique?.data?.musique?.likeur?.includes(userstore?.data?.id+',') ? coeurv : coeur} alt="" /> <span id={'nombrelike'+musique?.data?.musique?.id}>{musique?.data?.musique?.like}</span>
                  </span>
                  <button onClick={()=>{setId(musique?.data?.musique?.id)}} data-bs-toggle="modal" data-bs-target="#exampleModalpartage" className='flex flex-row justify-center items-center gap-x-2 text-sm p-1 px-2 rounded-xl partagepub'><img className='partagepub' style={{height:'19px'}} src={partager} alt="" />{musique?.data?.musique?.partage} </button>
                  </div>
                </div>
                </div> : <MonopredicationMusiqueSkeleton/>
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