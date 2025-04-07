import React, { useContext, useEffect } from 'react';
import publicationimage from '../icons/images/ajouter.png';
import priereEnCours from '../images/priere.svg'
import signaler from '../icons/images/signaler.png';
import bloquer from '../icons/images/bloquer.png';
import morepicture from '../icons/images/more.png';
import amenpicture from '../icons/images/amen.png';
import amenb from '../icons/images/amenb.png';
import partager from '../icons/images/partager.png';
import commenter from '../icons/images/commenter.png';
import point from '../icons/images/point.png';
import coeur from '../icons/images/coeur.png';
import coeurv from '../icons/images/coeurv.png';
import envoyer from '../icons/images/envoyer.png';
import img1 from '../images/background/1.jpg';
import img2 from '../images/background/2.jpg';
import img3 from '../images/background/3.jpg';
import img4 from '../images/background/4.jpg';
import img5 from '../images/background/5.jpg';
import img6 from '../images/background/6.jpg';
import img7 from '../images/background/7.png';
import img8 from '../images/background/8.png';
import photof from '../images/background/photo.png';
import videof from '../images/background/video.png';
import ok from '../icons/images/ok.png';
import group from '../icons/images/group.png';
import profile from '../icons/images/profile.png';
import facebook from '../icons/images/facebook.png';
import whatsapp from '../icons/images/whatsapp.png';
import supprimer from '../icons/images/supprimer.png';
import chargementPriere from '../icons/images/chargement.gif';
import certifie from '../icons/images/certifie.png';
import reload from '../icons/images/reload.png';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import 'react-toastify/dist/ReactToastify.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { tokenContexte } from '../contexte/tokenContexte';
import { userContexte } from '../contexte/userContexte';
import ClipLoader from 'react-spinners/ClipLoader';
import { PublicationCardSkeleton } from '../skeletons/publication-skeleton';
import { Partageskeleton } from '../skeletons/partageskeleton';
export function Publication()
{
  const [photo, setPhoto]=useState(null)
  const [video, setVideo]=useState(null)
  
  // images preview modal 
const [selectedImage, setSelectedImage]=useState([])
const InputChange = (e) => {
  setPhoto(e.target.files[0])
  setVideo(null)
  setSelectedVideo([])
  setSelectedImage([])
  document.getElementById('videoupload').value=null
  // --For Multiple File Input
  let images = [];
  for (let i = 0; i < e.target.files.length; i++) {
      images.push((e.target.files[i]));
      let reader = new FileReader();
      let file = e.target.files[i];
      reader.onloadend = () => {
          setSelectedImage((preValue) => {
              return [
                  ...preValue,
                  {
                    
                      filename: e.target.files[i].name,
                      filetype: e.target.files[i].type,
                      fileimage: reader.result,
                      datetime: e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
                     
                  }
              ]
          });
      }
      if (e.target.files[i]) {
          reader.readAsDataURL(file);
      }
  }
}

const refreshPage=()=>{
  window.location.reload()
}

// delete image preview 
const DeleteSelectFile = (id) => {
  setSizephoto(0)
  setSelectedImage([])
  setPhoto(null)
  document.getElementById('photoupload').value=null
  if(window.confirm("Voulez-vous vraiment enlever cette image ?")){
      const result = selectedImage.filter((data,index) => index !== id);
      setSelectedImage(result);
  }else{
      // alert('No');
  }
  
}

 // videos preview modal 
 const [selectedVideo, setSelectedVideo]=useState([])
 const InputChangeVideo = (e) => {
  setVideo(e.target.files[0])
  setPhoto(null)
  setSelectedImage([])
  setSelectedVideo([])
  document.getElementById('photoupload').value=null
   // --For Multiple File Input
   let videos = [];
   for (let i = 0; i < e.target.files.length; i++) {
       videos.push((e.target.files[i]));
       let reader = new FileReader();
       let file = e.target.files[i];
       reader.onloadend = () => {
           setSelectedVideo((preValue) => {
               return [
                   ...preValue,
                   {
                     
                       filename: e.target.files[i].name,
                       filetype: e.target.files[i].type,
                       fileimage: reader.result,
                       datetime: e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
                      
                   }
               ]
           });
       }
       if (e.target.files[i]) {
           reader.readAsDataURL(file);
       }
   }
 }
//  limite taille de fichiers uploades 
 const [sizephoto, setSizephoto]=useState(0)
 const [sizevideo, setSizevideo]=useState(0)
 useEffect(()=>{
 if(photo!=null){
  if(document.getElementById('photoupload').files[0]){
    setSizephoto(document.getElementById('photoupload').files[0]['size'])
  }
  if(document.getElementById('photouploadpriere').files[0]){
    setSizephoto(document.getElementById('photouploadpriere').files[0]['size'])
  }
 }
 },[photo])

 useEffect(()=>{
  if(video!=null){
   if(document.getElementById('videoupload').files[0]){
    setSizevideo(document.getElementById('videoupload').files[0]['size'])
   }
   if(document.getElementById('videouploadpriere').files[0]){
    setSizevideo(document.getElementById('videouploadpriere').files[0]['size'])
   }
  }
  },[video])
 
 // delete image preview 
 const DeleteSelectFileVideo = (id) => {
  setSizevideo(0)
  setSelectedVideo([])
  setVideo(null)
  document.getElementById('videoupload').value=null
   if(window.confirm("Voulez-vous vraiment enlever cette image ?")){
       const result = selectedVideo.filter((data,index) => index !== id);
       setSelectedVideo(result);
   }else{
       // alert('No');
   }
   
 }


    const [background, setBackground]=useState('white')
    const [color,setColor]=useState('black')
    const arrierePlan=['white',img1,img2,img3,img4,img5,img6,img7,img8]
    const colorText=['black','white','rgb(109 40 217)','blue','red','green']


    // copy clipboard 
   const [textCopy, setTextCopy]=useState('texte a partager')
   const [statutCopy,setStatutCopy]=useState(false)

// end copy 
     
    const [morestate, setMore]=useState(false);
    const queryClient=useQueryClient();

    const mutationdeletepost=useMutation({
      mutationFn:()=>{
          axios.post(`${process.env.REACT_APP_BACKEND_URL}/delete-post-actualite`,{id},{
              headers:{
                "Authorization": "Bearer "+token
              }
            })
      },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['liste-publication-auth'] });
          toast('Publication supprimée')
        },
    })

    const agirPublication=(ide,id)=>{
      document.getElementById(id+'more').style.transform='scale(0)'
      if(ide.includes('signaler')){
          toast('Signalement encours...')

          axios.post(`${process.env.REACT_APP_BACKEND_URL}/signaler`, {id},{
            headers:{
                "Authorization": "Bearer "+token
              }
        }).then((res)=>{
          if(res?.data?.statut && res?.data?.statut=='300'){
            toast(res?.data?.message)
          }else{
            toast('Publication signalée')
          }
    
          }).catch((err)=>{
           navigate('/login')
          })

      }
      if(ide.includes('supprimer')){
          toast('Suppression encours...')
          mutationdeletepost.mutate()

      }
      setMore(!morestate)
  }


    // horloge priere 
    const [horloge, setHorloge] = useState(0);
    const [rhorloge, setRhorloge]=useState(true)

    const likeramen=(id,like)=>{
        if(document.getElementById(id+'amen').style.backgroundColor!='white'){
            document.getElementById(id+'amen').style.backgroundColor='white'
            document.getElementById(id+'amen').style.color='black'
            document.getElementById(id+'priere').style.backgroundColor='rgb(109 40 217)'
            document.getElementById(id+'priere').style.color='white'
            document.getElementById(id+'iconamen').src=amenpicture
            document.getElementById(id+'iconpriere').src=amenb
           if(like>0){
             document.getElementById(id+'likeamen').textContent=like-1+' Amen(s)'
           }else{
             document.getElementById(id+'likeamen').textContent=0+' Amen'
           }
            document.getElementById(id+'likepriere').textContent=like+1+' Priere(s)'
        }else{
            document.getElementById(id+'amen').style.backgroundColor='rgb(109 40 217)'
            document.getElementById(id+'amen').style.color='white'
            document.getElementById(id+'priere').style.backgroundColor='rgb(109 40 217)'
            document.getElementById(id+'priere').style.color='white'
            document.getElementById(id+'iconamen').src=amenb
            document.getElementById(id+'iconpriere').src=amenb
            document.getElementById(id+'likeamen').textContent=like+1+' Amen(s)'
            document.getElementById(id+'likepriere').textContent=like+1+' Priere(s)'
        }

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/like`, {id},{
          headers:{
              "Authorization": "Bearer "+token
            }
      }).then((res)=>{
        }).catch((e)=>{
          if(e.response?.data?.message?.includes('Unauthenticated')){
            navigate('/login')
        }
        })

    }

    // card venant des groupes 
    const likeramengroupe=(id)=>{
      if(document.getElementById(id+'amengroupe').style.backgroundColor!='white'){
          document.getElementById(id+'amengroupe').style.backgroundColor='white'
          document.getElementById(id+'amengroupe').style.color='black'
          document.getElementById(id+'prieregroupe').style.backgroundColor='white'
          document.getElementById(id+'prieregroupe').style.color='black'
          document.getElementById(id+'iconamengroupe').src=amenpicture
          document.getElementById(id+'iconprieregroupe').src=amenpicture
      }else{
          document.getElementById(id+'amengroupe').style.backgroundColor='rgb(109 40 217)'
          document.getElementById(id+'amengroupe').style.color='white'
           document.getElementById(id+'prieregroupe').style.backgroundColor='rgb(109 40 217)'
          document.getElementById(id+'prieregroupe').style.color='white'
          document.getElementById(id+'iconamengroupe').src=amenb
          document.getElementById(id+'iconprieregroupe').src=amenb
      }

    
    

  }


    const likecoeur=(id)=>{
        if(document.getElementById(id+'coeur').src==coeur){
            document.getElementById(id+'coeur').src=coeurv
        }else{
            document.getElementById(id+'coeur').src=coeur
        }
    }

    const more=(id)=>{
      setId(id)
        if(document.getElementById(id).style.transform=='scale(0)'){
            document.getElementById(id).style.transform='scale(1)'
        }else{
            document.getElementById(id).style.transform='scale(0)'
        }
    }

    const merci=()=>{
      toast("Merci pour votre prière")
    }

    const navigate=useNavigate()
    const {userstore}=useContext(userContexte)

    const {token}=useContext(tokenContexte)
    const {data:publication,isLoading}=useQuery({
     queryKey:['liste-publication-auth'],
     queryFn:token ? ()=> axios.get(`${process.env.REACT_APP_BACKEND_URL}/liste-publication-auth`,{
      headers:{
        "Authorization": "Bearer "+token
      }
    }) : ()=> axios.get(`${process.env.REACT_APP_BACKEND_URL}/liste-publication-guest`)
   })

    // partage de pub 
    const [id, setId]=useState(null)
    const [loadpartage, setLoadpartage]=useState(false)
    const partagewhatsapp=()=>{
      setLoadpartage(true)
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/partage-post-actualite`,{id},{
        headers:{
          "Authorization": "Bearer "+token
        }
      }).then((res)=>{
        setLoadpartage(false)
        window.location.href="https://wa.me/?text=https://foichretienne.org/mono-post-actualite/"+id
      })
    }

    const partagefacebook=()=>{
      setLoadpartage(true)
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/partage-post-actualite`,{id},{
        headers:{
          "Authorization": "Bearer "+token
        }
      }).then((res)=>{
        setLoadpartage(false)
        window.location.href="https://www.facebook.com/sharer/sharer.php?u=https://foichretienne.org/mono-post-actualite/"+id+";src=sdkpreparse"
      })
    }
    
     const [type, setType]=useState(null)
     const [texte, setTexte]=useState(null)
     const [portee, setPortee]=useState('monde')
     const [cible, setCible]=useState(null)
     const [theme, setTheme]=useState(null)
 
     const mutationpostamen=useMutation({
       mutationFn:()=>{
           axios.post(`${process.env.REACT_APP_BACKEND_URL}/post-actualite`,{type,texte,portee,photo,video,cible,theme},{
               headers:{
                 "Authorization": "Bearer "+token,
                 "Content-type": "multipart/form-data",
               }
             })
       },
         onSuccess: () => {
           queryClient.invalidateQueries({ queryKey: ['liste-publication-auth'] });
           queryClient.invalidateQueries({ queryKey: ['notification-nonlue'] });
           toast('Publication effectuée')
         },
        //  onError:()=>navigate('/login')
     })
     const modaledifiant=()=>{
       setType('amen')
       setTexte(null)
       setPhoto(null)
       setVideo(null)
       setCible(null)
       setTheme(null)
       setSelectedImage([])
       setSelectedVideo([])
       document.getElementById('texteareaamen').value=null
       document.getElementById('photoupload').value=null
       document.getElementById('videoupload').value=null
       document.getElementById('inputtheme').value=null
       setSizephoto(0)
       setSizevideo(0)
     }

     const modalepriere=()=>{
      setType('priere')
      setTexte(null)
      setPhoto(null)
      setVideo(null)
      setCible(null)
      setTheme(null)
      setSelectedImage([])
      setSelectedVideo([])
      document.getElementById('texteareapriere').value=null
      document.getElementById('photouploadpriere').value=null
      document.getElementById('videouploadpriere').value=null
      document.getElementById('inputcible').value=null
      setSizephoto(0)
      setSizevideo(0)
    }
   
     const postamen=()=>{
       toast('publication en cours...')
       mutationpostamen.mutate()
     }



    return <>
        <ToastContainer/>
        {/* boutons publication en guest  */}
        <div style={{display:token && 'none'}} className='w-full flex flex-col justify-center items-center bg-white mt-2 rounded-lg'>
            <div className='flex flex-row justify-center items-center bg-white p-3 gap-x-3 rounded-lg w-full humeur border-b border-b-1'><span><img style={{height:'40px'}} className='imagehumeur'  src={profile} alt="" /></span><span className='w-2/3 pereboutomhumeur'><button data-bs-toggle="modal" data-bs-target="#exampleModalGuest" data-whatever="@mdo" className='px-4 p-2 rounded-2xl w-full boutonhumeur' style={{backgroundColor:'#80808026'}}>Partagez un message édifiant</button></span></div>
            <div className='flex flex-col justify-start items-center px-3 '>
                <div class="dropdown flex flex-row justify-start items-center border-b border-b-1">
                       <button class=" dropdown-toggle w-1/2 flex flex-row justify-start items-center p-3 " type="button" data-bs-toggle="modal" data-bs-target="#exampleModalGuest" data-whatever="@mdo">
                       <img style={{height:'20px'}}  src={publicationimage} alt="" />&nbsp; <span>Faire une publication</span>
                      </button>
                      
                     
               </div>
            
            </div>

        </div>

        {/* publication actualite  */}
         <div style={{display:!token && 'none'}} className="w-full">
              {
                userstore ?  <div className='w-full flex flex-col justify-center items-center bg-white mt-2 rounded-lg'>
                <div className='flex flex-row justify-center items-center bg-white p-3 gap-x-3 rounded-lg w-full humeur border-b border-b-1'><span><img style={{height:'30px',width:'30px'}} className='imagehumeur rounded-full'  src={process.env.REACT_APP_BACKEND_FILE+userstore.data.pp} alt="" /></span><span className='w-3/5 pereboutomhumeur'><button onClick={modaledifiant} data-bs-toggle="modal" data-bs-target="#exampleModal" data-whatever="@mdo" className='px-4 p-2 rounded-2xl w-full boutonhumeur' style={{backgroundColor:'#80808026'}}>Partagez un message édifiant</button></span></div>
                <div className='flex flex-col justify-start items-center px-3 '>
                    <div class="dropdown flex flex-row justify-start items-center border-b border-b-1">
                           <button class=" dropdown-toggle w-1/2 flex flex-row justify-start items-center p-3 " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           <img style={{height:'20px'}}  src={publicationimage} alt="" />&nbsp; <span>Faire une publication</span>
                          </button>
                          <div  class="dropdown-menu  rounded-xl" aria-labelledby="dropdownMenuButton">
                               <a onClick={modaledifiant}  data-bs-toggle="modal" data-bs-target="#exampleModal" data-whatever="@mdo"  class="dropdown-item text-sm hover:bg-violet-700 hover:text-white hover:rounded-3xl border border-1" href="#">Pour édifier</a>
                               <a onClick={modalepriere} data-bs-toggle="modal" data-bs-target="#exampleModalpriere" data-whatever="@mdo" class="dropdown-item  hover:bg-violet-700 hover:text-white hover:rounded-3xl  flex-wrap text-sm border border-1" href="#">Pour lancer un sujet de prière</a>
                              
                          </div>
                         
                   </div>
                   <span className='py-2 text-sm text-start'><span className='text-red-700 underline'>Attention :</span> Ne pas publier des contenus qui vont à l'encontre des valeurs chrétiennes au risque d'être expulsé. Les discours dépravants et haineux ne sont non plus acceptés.</span>
                </div>
        
            </div> : <Partageskeleton/>
               }
              </div>

   {publication ? publication?.data?.pubs?.map((e,i)=>{
    return  <div id={e.id+'pub'} class=" mt-3 flex flex-row justify-center items-center w-full">
    <div class="row d-flex align-items-center justify-content-center w-full">
        <div class=" w-full">
            <div class="card w-full">
                <div class="d-flex justify-content-between p-2 px-3">
                    <Link to={'/profile/'+(e.user && e.user.id)} class="d-flex flex-row align-items-center text-decoration-none hover:text-violet-700"> <span style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+(e.user?.pp && e.user?.pp)})`,backgroundPosition:'center',backgroundSize:'cover'}} className="w-12 h-12 rounded-full"></span>
                        <div class="d-flex flex-column ml-2"> <span class="font-medium text-sm flex flex-row items-center text-violet-700">{e?.user?.nom && e?.user?.nom[0]?.toUpperCase()+e?.user?.nom?.slice(1)?.substring(0,25)} {e?.user?.prenom?.substring(0,15)}  <img className='position-relative left-2' style={{height:'15px',display:e?.user?.certifie!='oui' && 'none'}} src={certifie} alt="" /> </span> <small class="text-gray text-xs">{e?.user?.pseudo?.length>25 ? e?.user?.pseudo?.substring(0,25)+'...' : e?.user?.pseudo}</small> <small class="mr-2 text-xs">{e.date && e.date}</small> </div>
                       
                    </Link>
                    <div class="d-flex flex-row mt-1 justify-content-center align-items-center ellipsis"> 

                 <img onClick={()=>{more(e.id+'more')}} className='cursor-pointer' style={{height:'25px'}} src={morepicture} alt="" />
                    
                    </div>
                </div>

                <p style={{display:(e.type && e.type!='verset') && 'none'}} className='text-sm pl-3 pb-1 font-bold'>{e?.user?.nom && e?.user?.nom[0]?.toUpperCase()+e?.user?.nom?.slice(1)?.substring(0,30)} a mis à jour son verset préféré :</p>
                
                {/* more  */}
                <div id={e.id+'more'} style={{transform:'scale(0)',transition:'all ease 0.6s'}} class="list-group shadow position-absolute top-16 w-full text-sm z-10">
  <button type="button" class="list-group-item  bg-violet-700 text-white">
  
  </button>
  <button id={e.id+"signaler"} onClick={()=>{agirPublication('signaler',e.id)}} type="button" class="list-group-item list-group-item-action flex flex-row justify-start items-center gap-x-2"> <img style={{height:'25px'}} src={signaler}/>Signaler la publication</button>
      <button style={{display:userstore?.data?.id==e?.user_id || userstore?.data?.role=='admin' ? 'flex' : 'none'}} id={e?.id+"supprimer"} onClick={()=>{agirPublication('supprimer',e?.id)}} type="button" class="list-group-item list-group-item-action flex flex-row justify-start items-center gap-x-2"> <img style={{height:'25px'}} src={supprimer}/>Supprimer la publication</button>
</div>
{e.type=='amen' && <p className="text-center text-violet-700 border-solid border-1 border-violet-700 rounded-lg m-3">{'é'.toUpperCase()}dification</p>}
{e.type=='priere' && <p className="text-center text-violet-700 border-solid border-1 border-violet-700 rounded-lg m-3">Sujet de prière</p>}
                {(e.theme && e.type=='amen') &&  <p class="text-justify px-3 pb-2"><span className="font-bold underline">Thème </span> : {e.theme && e.theme}</p>}
                {(e.cible && e.type=='priere') &&  <p class="text-justify px-3 pb-2"><span className="font-bold underline">Cible </span> : {e.cible && e.cible}</p>}
                 <p class="text-justify px-3 pb-2"><span className="font-bold underline">{e.type=='amen' ? 'Message :' : e?.type=='priere' && 'Sujet de prière :'} </span>  {e.texte && e.texte}</p>
               

                {/* si c'est une video  */}
                {
                  e.video && <video controlsList='nodownload' controls src={process.env.REACT_APP_BACKEND_FILE+e?.video} className='w-full h-full'></video>
                }
                {/* si c'est une image  */}
              {
                e.photo && <img src={process.env.REACT_APP_BACKEND_FILE+e?.photo} alt="" className='img-fluid' />
              }
                {/* si c'est plusieurs fichiers (photos/videos)  */}
              
                 {/* <Slide autoplay={false}>
                  
                    {images.map((slideImage)=> slideImage.toLowerCase().split('.').pop().includes('png') || slideImage.toLowerCase().split('.').pop().includes('jpg') ? <div className='h-full' style={{backgroundImage: `url(${slideImage})`,backgroundPosition:'center',backgroundSize:'contain',backgroundRepeat:'no-repeat'}}></div> : <video controlsList='nodownload'  className='w-100 h-100' controls src={slideImage}/>)} 
                 </Slide> */}
    
                {/* end image  */}
                <div class="p-2 w-full">
                  
                    {/* <hr> */}
                   <div className="flex flex-col justify-between items-start gap-y-2">
                    <div className='flex flex-row justify-between items-center text-xs w-full statpublication'><div><span id={e.id+'likeamen'} style={{display:e.type=='amen' || e.type=='verset' ? 'flex' : 'none'}}>{e.like} Amen(s) &nbsp;</span><span id={e.id+'likepriere'} style={{display:e.type=='priere' ? 'flex' : 'none'}}>{e.like} Prières(s) &nbsp;</span></div> <div className='flex flex-row justify-center items-center'><span> {e.commentairepubactualites.length} Commentaire(s)&nbsp; </span> <span><img style={{height:'5px'}} src={point} alt="" /></span> &nbsp;<span>  {e.partage} Partage(s)</span></div> </div>
                    <div class="d-flex flex-row justify-content-between align-items-center pereiconspub border-b border-b-1 w-full">
                      <button style={{backgroundColor:userstore && e.likeur && e.likeur.includes(userstore.data.id+',') ? 'rgb(109 40 217)' : 'white',color:userstore && e.likeur && e.likeur.includes(userstore.data.id+',') ? 'white' : 'black',display:e.type=='amen' || e.type=='verset' ? 'flex' : 'none'}} id={e.id+'amen'} onClick={()=>{likeramen(e.id,e.like)}}  className='flex flex-row justify-center items-center text-sm p-1 pl-2 rounded-xl gap-x-2 amenpub'><img id={e.id+'iconamen'} className='amenpub' style={{height:'23px'}} src={userstore && e.likeur && e.likeur.includes(userstore.data.id+',') ? amenb : amenpicture} alt="" /> <span className='position-relative right-1 pr-2'>Amen</span> </button>
                      <button data-bs-toggle="modal" data-bs-target="#exampleModalPriere" style={{backgroundColor:userstore && e.likeur && e.likeur.includes(userstore.data.id+',') ? 'rgb(109 40 217)' : 'white',color:userstore && e.likeur && e.likeur.includes(userstore.data.id+',') ? 'white' : 'black',display:(e.type=='priere' && token) ? 'flex' : 'none'}} id={e.id+'priere'} onClick={()=>{likeramen(e.id,e.like)}}  className='flex flex-row justify-center items-center text-sm p-1 pl-2 rounded-xl gap-x-2 amenpub'><img id={e.id+'iconpriere'}  className='amenpub' style={{height:'23px'}} src={userstore && e.likeur && e.likeur.includes(userstore.data.id+',') ? amenb : amenpicture} alt="" /> <span className='position-relative right-1 text-nowrap pr-2'>Je prie</span> </button>
                      <button data-bs-toggle="modal" data-bs-target="#exampleModalPriere" style={{display:(e.type=='priere' && !token) ? 'flex' : 'none'}} id={e.id+'priere'}  className='flex flex-row justify-center items-center text-sm p-1 pl-2 rounded-xl gap-x-2 amenpub'><img id={e.id+'iconpriere'}  className='amenpub' style={{height:'23px'}} src={amenpicture} alt="" /> <span className='position-relative right-1 text-nowrap pr-2'>Je prie</span> </button>
                      <Link to={'/mono-post-actualite/'+(e.id)} className='flex text-decoration-none hover:text-violet-700 flex-row justify-center items-center gap-x-2 text-sm p-1 px-4 rounded-xl commentpub'><img className='commentpub' style={{height:'19px'}} src={commenter} alt="" />Commenter</Link>
                      <button style={{display:!userstore && 'none'}} onClick={()=>{setId(e.id)}} data-bs-toggle="modal" data-bs-target="#exampleModalpartage" className='flex flex-row justify-center items-center gap-x-2 text-sm p-1 px-2 rounded-xl partagepub'><img className='partagepub' style={{height:'19px'}} src={partager} alt="" />Partager</button>
                      <button style={{display:userstore && 'none'}} onClick={()=>{navigate('/login')}} className='flex flex-row justify-center items-center gap-x-2 text-sm p-1 px-2 rounded-xl partagepub'><img className='partagepub' style={{height:'19px'}} src={partager} alt="" />Partager</button>
                    </div>
                   </div>
                    {/* <hr> */}
                    <div class="comments pt-3">
                       {e.commentairepubactualites && e.commentairepubactualites.slice(0,2).map((c,iteration)=>{
                        return  <div class="d-flex flex-row mb-2"> <img src={c.user?.pp && process.env.REACT_APP_BACKEND_FILE+c?.user?.pp} width="40" class="rounded-image"/>
                        <div class="d-flex flex-column ml-2"> <a href={'/profile/'+(c?.user?.id ? c?.user?.id :'')} class="name namecomment text-decoration-none hover:text-violet-700">{c?.user?.nom && c?.user?.nom[0]?.toUpperCase()+c?.user?.nom?.slice(1)?.substring(0,32)} {c?.user?.prenom?.substring(0,15)}</a> <small class="comment-text">{c.commentaire.length>48 ? c.commentaire.substring(0,48)+'...' : c.commentaire}</small>
                            <div class="d-flex flex-row align-items-center status"> <small className='text-xs'>{c?.date}</small> </div>
                        </div>
                    </div>
                  
                       })}
                       
                        <div class="comment-input flex flex-row cursor-pointer"> <Link to={'/mono-post-actualite/'+(e.id)} className='w-full text-decoration-none cursor-pointer'><input readOnly={true}  type="text" style={{textIndent:'10px',fontSize:'small'}} placeholder='Placez votre commentaire' class="form-control focus:ring-violet-700"/></Link>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div> 
</div>
   }) : <PublicationCardSkeleton/> 
   }

<div style={{display:!publication && 'none'}} className="w-full flex flex-row justify-center items-center">
       <p  className="text-center text-xs m-4 border-solid border-2 border-gray-300 p-1 w-3/4 rounded-lg cursor-pointer"><a href="" className='text-decoration-none hover:text-violet-700 flex flex-col justify-center items-center'> <img style={{height:'15px'}} src={reload} alt="" /> <span>Vous avez tout vu. Cliquez pour actualiser</span></a></p>
       </div>

   {/* modals  */}

{/* modal priere en cours  */}
<div class="modal fade" id="exampleModalPriere" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title text-xl flex flex-row justify-center items-center" id="exampleModalLongTitle">Votre prière est en cours... <img style={{height:'30px'}} src={chargementPriere} alt="" /></span>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <img src={priereEnCours} alt="" />
      </div>
      <div class="p-3 w-full">
        <button onClick={merci} type="button" class="btn hover:bg-violet-600 bg-violet-700 text-white w-full flex flex-row justify-center items-center gap-x-1" data-bs-dismiss="modal"> <img style={{height:'20px'}} src={amenb} alt="" /> Amen</button>
     
      </div>
    </div>
  </div>
</div>

{/* modal partage publication */}
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
       
          <div class="form-group">
          <span href='' class="d-flex flex-row align-items-center text-decoration-none hover:text-violet-700"> <span style={{backgroundImage:`url(${userstore && process.env.REACT_APP_BACKEND_FILE+userstore?.data?.pp})`,backgroundPosition:'center',backgroundSize:'cover'}} className="w-12 h-12 rounded-full"></span>
                        <div class="d-flex flex-column ml-2"> <span class="font-weight-bold text-sm">{userstore?.data?.nom?.toUpperCase()?.substring(0,25)}</span>
                        <span className='text-sm'> {userstore?.data?.pseudo?.substring(0,30) } </span> </div>
                    </span>
          </div>
         <div className="w-full flex flex-col justify-center items-start gap-y-8">
            <div className='flex flex-col items-start gap-y-1.5'><span className='text-sm font-bold'>Copier le lien de la publication</span>
            {/* lien publication  */}
            <span>
                
<div style={{width:'100%',flexWrap:'wrap'}} class=" gap-2 w-full flex flex-row">
    <CopyToClipboard text={'https://foichretienne.org/mono-post-actualite/'+id}
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

{/* modal partage de message edifiant  */}
   <div class="modal fade h-full" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog h-full" role="document">
    <div class="modal-content h-full">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><button disabled={(texte!=null && texte?.trim().length>0 && sizephoto/1048576<=17 && sizevideo/1048576<=17) ? false : true} style={{backgroundColor:(texte==null || texte?.trim().length==0 || sizephoto/1048576>17 || sizevideo/1048576>17) ? 'gray' : 'rgb(109 40 217)'}} onClick={postamen} data-bs-dismiss="modal" class="inline-flex text-decoration-none items-center px-4 py-2 text-xs font-medium text-center text-white bg-violet-700 rounded-lg hover:bg-violet-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Publier</button></h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div style={{height:'60%'}} class="modal-body">
       
          <div class="form-group">
          <span href='' class="d-flex flex-row align-items-center text-decoration-none hover:text-violet-700"> <span style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+userstore?.data?.pp})`,backgroundPosition:'center',backgroundSize:'cover'}} className="w-12 h-12 rounded-full"></span>
                        <div class="d-flex flex-column ml-2"> <span class="font-weight-bold text-sm">{userstore?.data?.nom?.toUpperCase()?.substring(0,25)}</span>
                         <small class="text-gray text-xs">
                            <select onChange={(e)=>{setPortee(e.target.value)}} name="" id="" className='rounded-lg pl-2 text-xs'>
                                <option selected={portee=='monde' && true} value="monde">Partager avec tout le monde</option>
                                <option selected={portee=='amis' && true} value="amis">Mes ami(e)s seulement</option>
                            </select></small> </div>
                    </span>
          </div>
          <div style={{height:'100%'}} class="form-group ">
            
          <div>
            <label for="inputtheme" class="block mb-2">Theme :</label>
            <input onChange={(e)=>{setTheme(e.target.value)}} maxLength={255} type="text" id="inputtheme" class="border border-gray-300 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-700 block w-full p-2.5 dark:border-violet-600 dark:focus:ring-violet-500 dark:focus:border-violet-700" placeholder="Entrer le theme de votre message ici" />
        </div>

           <div style={{height:'45%'}} class="form-group">
           <label for="message-text" class="col-form-label">Message :</label>
           <textarea maxLength={1150} onChange={(e)=>{setTexte(e.target.value)}} style={{height:'100%',backgroundImage:`url(${background})`,backgroundPosition:'center',backgroundSize:'cover',backgroundRepeat:'no-repeat',color:`${color.toString()}`,alignItems:'center',textAlign:'middle'}} placeholder='Entrez votre message ici' class="form-control rounded-lg" id="texteareaamen"></textarea>
           </div>
            {/* <div style={{backgroundColor:'#80808026'}} className="flex p-2 rounded-lg flex-col justify-center items-start overflow-x-autow-full gap-y-2 m-1 w-full overflow-x-auto">
               <div className="flex flex-row justify-start items-center gap-x-1">
               <span className='text-xs'>Fond:&nbsp; </span>
               {arrierePlan.map((img)=> {return <><span id={img} onClick={(e)=>{setBackground(e.target.id)}} style={{backgroundImage:`url(${img})`,backgroundPosition:'center',backgroundSize:'cover',border: background==img ? '3px solid blue' : '0px'}} className='h-6 w-6 cursor-pointer hover:scale-110 rounded-lg'></span><span></span></>})}
               </div>
           <div className="flex flex-row justify-start items-center gap-x-1">
           <span className='text-xs'>Texte:&nbsp; </span>
           {colorText.map((c)=> {return <><span id={c} onClick={(e)=>{setColor(e.target.id)}} style={{backgroundColor:`${c.toString()}`,border: color==c ? '3px solid blue' : '0px'}} className='h-6 w-6 cursor-pointer hover:scale-110 rounded-lg'></span><span></span></>})}
           </div>
          </div> */}
     
          </div>
      </div>
      <span className='flex flex-row justify-start items-end gap-x-6 w-full overflow-x-auto px-3 position-relative -top-8'>{selectedImage.length>0 && (selectedImage.map((si,index)=>{return <span className='flex flex-col justify-center items-center gap-y-1'> <img onClick={()=>{DeleteSelectFile(index)}} className='cursor-pointer' style={{height:'17px'}} src={supprimer} alt="" /> <img className='border-1 border-solid border-violet-700' src={si.fileimage} width={20} height={20}/></span>}))}
      {/* video  */}
      {selectedVideo.length>0 && (selectedVideo.map((sv,index)=>{return <span className='flex flex-col justify-center items-center gap-y-1'> <img onClick={()=>{DeleteSelectFileVideo(index)}} className='cursor-pointer' style={{height:'17px'}} src={supprimer} alt="" /> <video className='border-1 border-solid border-violet-700' src={sv.fileimage} width={20} height={20}/></span>}))}
      </span>
     <div className="flex flex-col justify-between items-start gap-y-4 w-full px-3 position-relative -top-8">
      <span className="text-xs text-red-700">{(sizephoto/1048576)>17 && 'La taille de votre image ne doit pas dépasser 17 mégas !'} {(sizevideo/1048576)>17 && 'La taille de votre video ne doit pas dépasser 17 mégas !'} </span>
        <span style={{backgroundColor:'#80808026'}} className='flex p-2 flex-row justify-start items-center w-full gap-x-2 rounded-lg'><span ><img style={{height:'20px'}} src={photof} alt="" /></span><span>Photos</span>  <input id='photoupload' onChange={InputChange} accept="image/*" style={{position:'absolute',height:'25px',opacity:'0'}} type="file" /> </span><span style={{backgroundColor:'#80808026'}} className='flex flex-row justify-start items-center p-2 w-full gap-x-2 rounded-lg'><span><img src={videof} style={{height:'20px'}} alt="" /></span><span>Videos</span> <input id='videoupload' onChange={InputChangeVideo} accept='video/*' style={{position:'absolute',height:'25px',opacity:'0'}} type="file" /> </span>
     </div>
      <div class="modal-footer position-relative -top-4">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
        <button disabled={(texte!=null && texte?.trim().length>0 && (sizephoto/1048576<=17 && sizevideo/1048576<=17)) ? false : true} style={{backgroundColor:(texte==null || texte?.trim().length==0 || sizephoto/1048576>17 || sizevideo/1048576>17) ? 'gray' : 'rgb(109 40 217)'}} onClick={postamen} type="button" data-bs-dismiss="modal" class="btn bg-violet-700 text-white hover:bg-violet-600">Publier</button>
      </div>
    </div>
  </div>
</div>

{/* pour intension de priere  */}
<div class="modal fade h-full" id="exampleModalpriere" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog h-full" role="document">
    <div class="modal-content h-full">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><button disabled={(texte!=null && texte?.trim().length>0 && sizephoto/1048576<=17 && sizevideo/1048576<=17) ? false : true} style={{backgroundColor:(texte==null || texte?.trim().length==0 || sizephoto/1048576>17 || sizevideo/1048576>17) ? 'gray' : 'rgb(109 40 217)'}} onClick={postamen} data-bs-dismiss="modal" class="inline-flex text-decoration-none items-center px-4 py-2 text-xs font-medium text-center text-white bg-violet-700 rounded-lg hover:bg-violet-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Publier</button></h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div style={{height:'60%'}} class="modal-body">
       
          <div class="form-group">
          <span href='' class="d-flex flex-row align-items-center text-decoration-none hover:text-violet-700"> <span style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+userstore?.data?.pp})`,backgroundPosition:'center',backgroundSize:'cover'}} className="w-12 h-12 rounded-full"></span>
                        <div class="d-flex flex-column ml-2"> <span class="font-weight-bold text-sm">{userstore?.data?.nom?.toUpperCase()?.substring(0,25)}</span>
                         <small class="text-gray text-xs">
                            <select onChange={(e)=>{setPortee(e.target.value)}} name="" id="" className='rounded-lg pl-2 text-xs'>
                                <option selected={portee=='monde' && true} value="monde">Partager avec tout le monde</option>
                                <option selected={portee=='amis' && true} value="amis">Mes ami(e)s seulement</option>
                            </select></small> </div>
                    </span>
          </div>
          <div style={{height:'100%'}} class="form-group ">
          
          <div>
            <label for="inputcible" class="block mb-2">Cible :</label>
            <input onChange={(e)=>{setCible(e.target.value)}} maxLength={255} type="text" id="inputcible" class="border border-gray-300 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-700 block w-full p-2.5 dark:border-violet-600 dark:focus:ring-violet-500 dark:focus:border-violet-700" placeholder="La cible de votre sujet de prière ici"/>
        </div>

          <div style={{height:'45%'}} class="form-group">
          <label for="message-text" class="col-form-label">Votre sujet de prière :</label>
          <textarea maxLength={1150} onChange={(e)=>{setTexte(e.target.value)}} style={{height:'100%',backgroundImage:`url(${background})`,backgroundPosition:'center',backgroundSize:'cover',backgroundRepeat:'no-repeat',color:`${color.toString()}`,alignItems:'center',textAlign:'middle'}} placeholder='Entrez votre sujet de prière ici' class="form-control rounded-lg " id="texteareapriere"></textarea>
          </div>
            {/* <div style={{backgroundColor:'#80808026'}} className="flex p-2 rounded-lg flex-col justify-center items-start overflow-x-autow-full gap-y-2 m-1 w-full overflow-x-auto">
               <div className="flex flex-row justify-start items-center gap-x-1">
               <span className='text-xs'>Fond:&nbsp; </span>
               {arrierePlan.map((img)=> {return <><span id={img} onClick={(e)=>{setBackground(e.target.id)}} style={{backgroundImage:`url(${img})`,backgroundPosition:'center',backgroundSize:'cover',border: background==img ? '3px solid blue' : '0px'}} className='h-6 w-6 cursor-pointer hover:scale-110 rounded-lg'></span><span></span></>})}
               </div>
           <div className="flex flex-row justify-start items-center gap-x-1">
           <span className='text-xs'>Texte:&nbsp; </span>
           {colorText.map((c)=> {return <><span id={c} onClick={(e)=>{setColor(e.target.id)}} style={{backgroundColor:`${c.toString()}`,border: color==c ? '3px solid blue' : '0px'}} className='h-6 w-6 cursor-pointer hover:scale-110 rounded-lg'></span><span></span></>})}
           </div>
          </div> */}
     
          </div>
      </div>
      <span className='flex flex-row justify-start items-end gap-x-6 w-full overflow-x-auto px-3 position-relative -top-8'>{selectedImage.length>0 && (selectedImage.map((si,index)=>{return <span className='flex flex-col justify-center items-center gap-y-1'> <img onClick={()=>{DeleteSelectFile(index)}} className='cursor-pointer' style={{height:'17px'}} src={supprimer} alt="" /> <img className='border-1 border-solid border-violet-700' src={si.fileimage} width={20} height={20}/></span>}))}
      {/* video  */}
      {selectedVideo.length>0 && (selectedVideo.map((sv,index)=>{return <span className='flex flex-col justify-center items-center gap-y-1'> <img onClick={()=>{DeleteSelectFileVideo(index)}} className='cursor-pointer' style={{height:'17px'}} src={supprimer} alt="" /> <video className='border-1 border-solid border-violet-700' src={sv.fileimage} width={20} height={20}/></span>}))}
      </span>
     <div className="flex flex-col justify-between items-start gap-y-4 w-full px-3 position-relative -top-8">
      <span className="text-xs text-red-700">{(sizephoto/1048576)>17 && 'La taille de votre image ne doit pas dépasser 17 mégas !'} {(sizevideo/1048576)>17 && 'La taille de votre video ne doit pas dépasser 17 mégas !'} </span>
        <span style={{backgroundColor:'#80808026'}} className='flex p-2 flex-row justify-start items-center w-full gap-x-2 rounded-lg'><span ><img style={{height:'20px'}} src={photof} alt="" /></span><span>Photos</span>  <input id='photouploadpriere' onChange={InputChange} accept="image/*" style={{position:'absolute',height:'25px',opacity:'0'}} type="file" /> </span><span style={{backgroundColor:'#80808026'}} className='flex flex-row justify-start items-center p-2 w-full gap-x-2 rounded-lg'><span><img src={videof} style={{height:'20px'}} alt="" /></span><span>Videos</span> <input id='videouploadpriere' onChange={InputChangeVideo} accept='video/*' style={{position:'absolute',height:'25px',opacity:'0'}} type="file" /> </span>
     </div>
      <div class="modal-footer position-relative -top-4">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
        <button disabled={(texte!=null && texte?.trim().length>0 && (sizephoto/1048576<=17 && sizevideo/1048576<=17)) ? false : true} style={{backgroundColor:(texte==null || texte?.trim().length==0 || sizephoto/1048576>17 || sizevideo/1048576>17) ? 'gray' : 'rgb(109 40 217)'}} onClick={postamen} type="button" data-bs-dismiss="modal" class="btn bg-violet-700 text-white hover:bg-violet-600">Publier</button>
      </div>
    </div>
  </div>
</div>


{/* modal guest  */}
<div class="modal fade" id="exampleModalGuest" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Vous n'êtes pas connectés</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      
       <p> Connectez-vous à votre compte :</p><br/>
       <a href='/login' className='btn hover:bg-violet-500 focus:bg-violet-500 bg-violet-700 text-white'>Je me connecte</a><br/><p className='mt-3'>ou alors</p><br/>
       <a href={'/signup'} className='btn hover:bg-violet-500 focus:bg-violet-500 bg-violet-700 text-white'>Je crée mon profile</a>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
      </div>
    </div>
  </div>
</div>

    </>
}