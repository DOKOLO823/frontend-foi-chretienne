import React, { useContext, useEffect } from 'react';
import docta from '../images/docta.jpg';
import priereEnCours from '../images/priere.svg'
import signaler from '../icons/images/signaler.png';
import bloquer from '../icons/images/bloquer.png';
import cacher from '../icons/images/cacher.png';
import retirer from '../icons/images/retirer.png';
import morepicture from '../icons/images/more.png';
import amenpicture from '../icons/images/amen.png';
import amenb from '../icons/images/amenb.png';
import partager from '../icons/images/partager.png';
import commenter from '../icons/images/commenter.png';
import point from '../icons/images/point.png';
import coeur from '../icons/images/coeur.png';
import coeurv from '../icons/images/coeurv.png';
import envoyer from '../icons/images/envoyer.png';
import ok from '../icons/images/ok.png';
import group from '../icons/images/group.png';
import facebook from '../icons/images/facebook.png';
import whatsapp from '../icons/images/whatsapp.png';
import supprimer from '../icons/images/supprimer.png';
import chargementPriere from '../icons/images/chargement.gif';
import certifie from '../icons/images/certifie.png';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import 'react-toastify/dist/ReactToastify.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { PublicationCardSkeleton } from '../skeletons/publication-skeleton';
import { userContexte } from '../contexte/userContexte';
import { Link, useNavigate } from 'react-router-dom';
import { tokenContexte } from '../contexte/tokenContexte';
import { useMutation, useQuery } from 'react-query';
import { useQueryClient } from 'react-query';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
export function MesPublications(props)
{
    // copy clipboard 
   const [textCopy, setTextCopy]=useState('texte a partager')
   const [statutCopy,setStatutCopy]=useState(false)

//end copy
    const tab=['','']
    const tab2=['','','','','','','','','','','','','','','','','','','','','','']
    const [morestate, setMore]=useState(false);
   

    const merci=()=>{
      toast("Merci pour votre prière")
    }


    const [directcomment, setDirectcomment]=useState('')

    const {userstore}=useContext(userContexte)
    const navigate=useNavigate();
    const {token}=useContext(tokenContexte)
    const [id, setId]=useState(null)
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
          queryClient.invalidateQueries({ queryKey: ['profile','id'] });
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
        }).catch((err)=>{
         navigate('/login')
        })

    }

    
    const likecoeur=(id)=>{
      if(document.getElementById(id+'coeur').src==coeur){
          document.getElementById(id+'coeur').src=coeurv
      }else{
          document.getElementById(id+'coeur').src=coeur
      }
  }

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
  

  const more=(id)=>{
    setId(id)
      if(document.getElementById(id).style.transform=='scale(0)'){
          document.getElementById(id).style.transform='scale(1)'
      }else{
          document.getElementById(id).style.transform='scale(0)'
      }
  }



    return <>
        <ToastContainer/>
        {props.profile ? props?.profile?.infos?.map((e,i)=>{
    return  <div id={e.id+'pub'} class=" mt-3 flex flex-row justify-center items-center w-full">
    <div class="row d-flex align-items-center justify-content-center w-full">
        <div class=" w-full">
            <div class="card w-full">
                <div class="d-flex justify-content-between p-2 px-3">
                    <Link to={'/profile/'+(e.user && e.user.id)} class="d-flex flex-row align-items-center text-decoration-none hover:text-violet-700"> <span style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+(props.profile?.user?.pp && props.profile?.user?.pp)})`,backgroundPosition:'center',backgroundSize:'cover'}} className="w-12 h-12 rounded-full"></span>
                        <div class="d-flex flex-column ml-2"> <span class="font-medium text-sm flex flex-row items-center text-violet-700">{props.profile?.user?.nom && props.profile?.user?.nom[0]?.toUpperCase()+props.profile?.user?.nom?.slice(1)?.substring(0,25)} {props.profile?.user?.prenom && props.profile?.user?.prenom?.substring(0,15)}  <img className='position-relative left-2' style={{height:'15px',display:e?.user?.certifie!='oui' && 'none'}} src={certifie} alt="" /> </span> <small class="text-gray text-xs">{props.profile?.user?.pseudo && (props.profile?.user?.pseudo?.length>25 ? props.profile?.user?.pseudo?.substring(0,25)+'...' : props.profile?.user?.pseudo)}</small> <small class="mr-2 text-xs text-gray-600">{e.date && e.date}</small> </div>
                       
                    </Link>
                    <div class="d-flex flex-row mt-1 justify-content-center align-items-center ellipsis"> 

                 <img onClick={()=>{more(e.id+'more')}} className='cursor-pointer' style={{height:'25px'}} src={morepicture} alt="" />
                    
                    </div>
                </div>

                <p style={{display:(e.type && e.type!='verset') && 'none'}} className='text-sm pl-3 pb-1 font-bold'>{props.profile?.user?.nom && props.profile?.user?.nom[0]?.toUpperCase()+props.profile?.user?.nom?.slice(1)?.substring(0,30)} a mis à jour son verset préféré :</p>
                
                {/* more  */}
                <div id={e.id+'more'} style={{transform:'scale(0)',transition:'all ease 0.6s'}} class="list-group shadow position-absolute top-16 w-full text-sm z-10">
  <button type="button" class="list-group-item  bg-violet-700 text-white">
  
  </button>
  <button id={e.id+"signaler"} onClick={()=>{agirPublication('signaler',e.id)}} type="button" class="list-group-item list-group-item-action flex flex-row justify-start items-center gap-x-2"> <img style={{height:'25px'}} src={signaler}/>Signaler la publication</button>
      <button style={{display:userstore?.data.id==e.user_id || userstore?.data.role=='admin' ? 'flex' : 'none'}} id={e.id+"supprimer"} onClick={()=>{agirPublication('supprimer',e.id)}} type="button" class="list-group-item list-group-item-action flex flex-row justify-start items-center gap-x-2"> <img style={{height:'25px'}} src={supprimer}/>Supprimer la publication</button>
</div>

                <p class="text-justify px-3 pb-2">{e.texte && e.texte}</p>
               

                {/* si c'est une video  */}
                {
                  e.video && <video controlsList='nodownload' controls src={process.env.REACT_APP_BACKEND_FILE+e.video} className='w-full h-full'></video>
                }
                {/* si c'est une image  */}
              {
                e.photo && <img src={process.env.REACT_APP_BACKEND_FILE+e.photo} alt="" className='img-fluid' />
              }
                {/* si c'est plusieurs fichiers (photos/videos)  */}
              
                 {/* <Slide autoplay={false}>
                  
                    {images.map((slideImage)=> slideImage.toLowerCase().split('.').pop().includes('png') || slideImage.toLowerCase().split('.').pop().includes('jpg') ? <div className='h-full' style={{backgroundImage: `url(${slideImage})`,backgroundPosition:'center',backgroundSize:'contain',backgroundRepeat:'no-repeat'}}></div> : <video controlsList='nodownload'  className='w-100 h-100' controls src={slideImage}/>)} 
                 </Slide> */}
    
                {/* end image  */}
                <div class="p-2 w-full">
                  
                    {/* <hr> */}
                   <div className="flex flex-col justify-between items-start gap-y-2">
                    <div className='flex flex-row justify-between items-center text-xs w-full statpublication'><div><span id={e.id+'likeamen'} style={{display:e.type=='amen' || e.type=='verset' ? 'flex' : 'none'}}>{e.like} Amen(s) &nbsp;</span><span id={e.id+'likepriere'} style={{display:e.type=='priere' ? 'flex' : 'none'}}>{e.like} Prières(s) &nbsp;</span></div> <div className='flex flex-row justify-center items-center'><span> {e?.commentairepubactualites?.length} Commentaire(s)&nbsp; </span> <span><img style={{height:'5px'}} src={point} alt="" /></span> &nbsp;<span>  {e.partage} Partage(s)</span></div> </div>
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
                        return  <div class="d-flex flex-row mb-2"> <img src={c.user?.pp && process.env.REACT_APP_BACKEND_FILE+c.user?.pp} width="40" class="rounded-image"/>
                        <div class="d-flex flex-column ml-2"> <a href={'/profile/'+(c.user?.id ? c.user.id :'')} class="name namecomment text-decoration-none hover:text-violet-700">{c.user?.nom && c.user?.nom[0]?.toUpperCase()+c.user?.nom?.slice(1)?.substring(0,32)}</a> <small class="comment-text">{c.commentaire.length>48 ? c.commentaire.substring(0,48)+'...' : c.commentaire}</small>
                            <div class="d-flex flex-row align-items-center status"> <small className='text-xs'>{c.date}</small> </div>
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
        <button onClick={merci} type="button" class="btn hover:bg-violet-600 bg-violet-700 text-white w-full" data-bs-dismiss="modal">Amen</button>
     
      </div>
    </div>
  </div>
</div>

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
       
          <div class="form-group">
          <span href='' class="d-flex flex-row align-items-center text-decoration-none hover:text-violet-700"> <span style={{backgroundImage:`url(${userstore && 'http://localhost:8000/storage/'+userstore?.data?.pp})`,backgroundPosition:'center',backgroundSize:'cover'}} className="w-12 h-12 rounded-full"></span>
                        <div class="d-flex flex-column ml-2"> <span class="font-weight-bold text-sm">{userstore?.data?.nom?.substring(0,25)}</span>
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

    </>
}