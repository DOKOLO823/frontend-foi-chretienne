import { Header } from '../components/header';
import docta from '../images/docta.jpg';
import left from '../icons/images/left.png';
import priereEnCours from '../images/priere.svg'
import signaler from '../icons/images/signaler.png';
import bloquer from '../icons/images/bloquer.png';
import cacher from '../icons/images/cacher.png';
import supprimer from '../icons/images/supprimer.png';
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
import { useContext, useEffect, useRef, useState } from 'react';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Slide } from 'react-slideshow-image';
import chargementPriere from '../icons/images/chargement.gif';
import ok from '../icons/images/ok.png';
import group from '../icons/images/group.png';
import facebook from '../icons/images/facebook.png';
import whatsapp from '../icons/images/whatsapp.png';
import axios from 'axios';
import { userContexte } from '../contexte/userContexte';
import { tokenContexte } from '../contexte/tokenContexte';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader';
import CopyToClipboard from 'react-copy-to-clipboard';
import { MonoPublicationCardSkeleton } from '../skeletons/monopost';
export function Monopublicationactualite()
{
     // copy clipboard 
       const [statutCopy,setStatutCopy]=useState(false)

    const queryClient=useQueryClient();
    const [morestate, setMore]=useState(false);
    const {id}=useParams('id')

    const mutationdeletepost=useMutation({
      mutationFn:()=>{
          axios.post(`${process.env.REACT_APP_BACKEND_URL}/delete-post-actualite`,{id},{
              headers:{
                "Authorization": "Bearer "+token
              }
            })
      },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['mono-post'] });
          toast('Publication supprimée')
        },
    })

        const agirPublication=(ide)=>{
            document.getElementById('more').style.transform='scale(0)'
            if(ide.includes('signaler')){
                toast('Signalement encours...')

                axios.post(`${process.env.REACT_APP_BACKEND_URL}/signaler`, {id},{
                  headers:{
                      "Authorization": "Bearer "+token
                    }
              }).then((res)=>{
                toast('Publication signalée')
                }).catch((err)=>{
                 navigate('/login')
                })

            }
            if(ide.includes('supprimer')){
                toast('Suppression encours...')
                mutationdeletepost.mutate({id})

            }
            setMore(!morestate)
        }

            const [commentaire, setDirectcomment]=useState('')
            const [share, setShare]=useState(null)
            const {userstore}=useContext(userContexte)
            const {token}=useContext(tokenContexte)
          
         const more=(id)=>{
                if(document.getElementById('more').style.transform=='scale(0)'){
                    document.getElementById('more').style.transform='scale(1)'
                }else{
                    document.getElementById('more').style.transform='scale(0)'
                }
            }

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
                    document.getElementById(id+'likepriere').textContent=like+1+' Prière(s)'
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

               // pour scroller vers le bas a chaque nouveau message 
               const messageEndRef=useRef(null);
               let [loading, setLoading] = useState(false);

              const {data:monopublication,isLoading}=useQuery({
                queryKey:['mono-post'],
                queryFn:()=>token ? axios.post(`${process.env.REACT_APP_BACKEND_URL}/mono-post`,{id},{
                  headers:{
                    "Authorization": "Bearer "+token
                  }
                }):navigate('/login')
              })

              useEffect(()=>{
                setLoading(false)
                window.scrollTo(0, document.body.scrollHeight);
              },[monopublication])


              const publicationid=monopublication?.data.post.id;
              const mutation=useMutation({
                mutationFn:()=>{
                    axios.post(`${process.env.REACT_APP_BACKEND_URL}/ajout-commentaire-publication`,{publicationid,commentaire},{
                        headers:{
                          "Authorization": "Bearer "+token
                        }
                      })
                },
                  onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['mono-post'] });
                  },
                  onError:()=>navigate('/login')
              })

              const sendComment=()=>{
                setLoading(true)
                document.getElementById('textareamonopost').value='';
                setDirectcomment('')
                mutation.mutate({commentaire})
              }

    const tab=['','','','','','','','','','','','','','','','']
    const tab2=['','','','','','','','','','','','','','','','','','','','','','']
    const navigate=useNavigate();

      const merci=()=>{
          toast("Merci pour votre prière")
        }

        // partage de pub 
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

    return <>
      <ToastContainer/>
   <div className="flex flex-col justify-center items-center w-full">
    <Header/>
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
        <div className=' flex flex-col items-start divgauche'> <DivGauche/> </div>
      <div className="w-3/4  h-full flex flex-col items-center justify-center nouvelledivdroite">
      <p className="text-start flex flex-row flex-wrap justify-start w-full items-center gap-2 pl-3"><span onClick={()=>{navigate(-1)}} className='cursor-pointer'><img style={{height:'16px'}} src={left} alt="" /></span></p>
      <div className="h-full flex flex-row justify-center flex-wrap items-center gap-3 pb-24 w-full">
       
    {
       (monopublication &&  monopublication.data.post!='aucun') ?   <div class=" mt-3 flex flex-row justify-center items-center w-full">
        <div class="row d-flex align-items-center justify-content-center w-full">
            <div class=" w-full float-right">
                <div class="card w-full">
               
                    <div class="d-flex justify-content-between p-2 px-3">
                        <Link to={'/profile/'+monopublication?.data.post.user.id} class="d-flex flex-row align-items-center text-decoration-none hover:text-violet-700"> <span style={{backgroundImage:`url(${monopublication?.data?.post?.user ? process.env.REACT_APP_BACKEND_FILE+monopublication.data.post.user.pp : ''})`,backgroundPosition:'center',backgroundSize:'cover'}} className="w-12 h-12 rounded-full"></span>
                            <div class="d-flex flex-column ml-2"> <span class="font-weight-bold text-sm">{monopublication?.data?.post.user?.nom[0]?.toUpperCase()+monopublication?.data?.post.user?.nom?.slice(1)?.substring(0,25)} {monopublication?.data?.post?.user?.prenom?.substring(0,15)}</span> <small class="text-gray text-xs">{monopublication?.data?.post.user?.pseudo?.length>20 ? monopublication?.data?.post?.user?.pseudo?.substring(0,20)+'...' : monopublication?.data?.post?.user?.pseudo}</small> <small class="mr-2 text-xs">{monopublication?.data?.post.date}</small> </div>
                        </Link>
                        <div class="d-flex flex-row mt-1 justify-content-center align-items-center ellipsis"> 
    
                     <img onClick={()=>{more(monopublication?.data?.post.id)}} className='cursor-pointer' style={{height:'25px'}} src={morepicture} alt="" />
                        
                        </div>
                    </div>

                    <p style={{display:typeof(monopublication.data.post.type)!=undefined && monopublication.data.post.type!='verset' && 'none'}} className='text-sm pl-3 pb-1 font-bold'>{monopublication?.data?.post?.user?.nom && monopublication.data?.post?.user.nom[0]?.toUpperCase()+monopublication?.data?.post?.user?.nom?.slice(1)?.substring(0,30)} a mis à jour son verset préféré :</p>

                    {/* more  */}
                    <div id={'more'} style={{transform:'scale(0)',transition:'all ease 0.6s'}} class="list-group shadow position-absolute top-16 w-full z-10">
      <button type="button" class="list-group-item  bg-violet-700 text-white">
      
      </button>
      <button id={"signaler"} onClick={()=>{agirPublication('signaler')}} type="button" class="list-group-item list-group-item-action flex flex-row justify-start items-center gap-x-2"> <img style={{height:'25px'}} src={signaler}/>Signaler la publication</button>
      <button style={{display:userstore?.data.id==monopublication.data.post.user_id || userstore?.data.role=='admin' ? 'flex' : 'none'}} id={"supprimer"} onClick={()=>{agirPublication('supprimer')}} type="button" class="list-group-item list-group-item-action flex flex-row justify-start items-center gap-x-2"> <img style={{height:'25px'}} src={supprimer}/>Supprimer la publication</button>
      {/* <button id={10+'cacher'}   onClick={()=>{agirPublication(10+'cacher')}} type="button" class="list-group-item list-group-item-action flex flex-row justify-start items-center gap-x-2"> <img style={{height:'25px'}} src={cacher}/>Ne plus afficher</button>
      <button id={10+'bloquer'}  onClick={()=>{agirPublication(10+'bloquer')}} type="button" class="list-group-item list-group-item-action flex flex-row justify-start items-center gap-x-2"> <img style={{height:'25px'}} src={bloquer}/>Bloquer l'auteur</button>
      <button id={10+'retirer'}  onClick={()=>{agirPublication(10+'retirer')}} type="button" class="list-group-item list-group-item-action flex flex-row justify-start items-center gap-x-2"> <img style={{height:'25px'}} src={retirer}/>Retirer l'auteur comme ami(e)</button>
           */}
    </div>

    {monopublication?.data?.post?.type=='amen' && <p className="text-center text-violet-700 border-solid border-1 border-violet-700 rounded-lg m-3">{'é'.toUpperCase()}dification</p>}
{monopublication?.data?.post?.type=='priere' && <p className="text-center text-violet-700 border-solid border-1 border-violet-700 rounded-lg m-3">Sujet de prière</p>}
                {monopublication?.data?.post?.theme &&  <p class="text-justify px-3 pb-2"><span className="font-bold underline">Thème </span> : {monopublication?.data?.post?.theme && monopublication?.data?.post?.theme}</p>}
                {monopublication?.data?.post?.cible &&  <p class="text-justify px-3 pb-2"><span className="font-bold underline">Cible </span> : {monopublication?.data?.post?.cible && monopublication?.data?.post?.cible}</p>}
                 <p class="text-justify px-3 pb-2"><span className="font-bold underline">{monopublication?.data?.post?.type=='amen' ? 'Message' : 'Sujet de prière'} </span> : {monopublication?.data?.post?.texte && monopublication?.data?.post?.texte}</p>
               
     
                  
                  
                   {/* si c'est une video  */}
                                 {
                                   monopublication?.data?.post?.video && <video controlsList='nodownload' controls src={process.env.REACT_APP_BACKEND_FILE+monopublication?.data?.post?.video} className='w-full h-full'></video>
                                 }
                                 {/* si c'est une image  */}
                               {
                                monopublication?.data?.post?.photo && <img src={process.env.REACT_APP_BACKEND_FILE+monopublication?.data?.post?.photo} alt="" className='img-fluid' />
                               }
    {/*               
                     <Slide autoplay={false}>
                        ajouter d'autres extensions pour les images 
                        {images.map((slideImage)=> slideImage.toLowerCase().split('.').pop().includes('png') || slideImage.toLowerCase().split('.').pop().includes('jpg') ? <div className='h-full' style={{backgroundImage: `url(${slideImage})`,backgroundPosition:'center',backgroundSize:'contain',backgroundRepeat:'no-repeat'}}></div> : <video controlsList='nodownload'  className='w-100 h-100' controls src={slideImage}/>)} 
                     </Slide> */}
        
                    {/* end image  */}
                    <div class="p-2 w-full">
                      
                        {/* <hr> */}
                       <div className="flex flex-col justify-between items-start gap-y-2">
                       <div className='flex flex-row justify-between items-center text-xs w-full statpublication'><div><span id={monopublication?.data?.post?.id+'likeamen'} style={{display:monopublication?.data?.post?.type=='amen' || monopublication?.data?.post?.type=='verset' ? 'flex' : 'none'}}>{monopublication?.data?.post.like} Amen(s) &nbsp;</span><span id={monopublication?.data.post.id+'likepriere'} style={{display:monopublication?.data?.post.type=='priere' ? 'flex' : 'none'}}>{monopublication?.data?.post.like} Prières(s) &nbsp;</span></div> <div className='flex flex-row justify-center items-center'><span> {monopublication?.data?.post.commentairepubactualites.length} Commentaire(s)&nbsp; </span> <span><img style={{height:'5px'}} src={point} alt="" /></span> &nbsp;<span>  {monopublication?.data.post.partage} Partage(s)</span></div> </div>
                        <div class="d-flex flex-row justify-content-between align-items-center pereiconspub border-b border-b-1 w-full">
                          <button style={{backgroundColor:userstore && monopublication?.data.post.likeur && monopublication?.data.post.likeur.includes(userstore.data?.id+',') ? 'rgb(109 40 217)' : 'white',color:userstore && monopublication?.data.post.likeur && monopublication?.data.post.likeur.includes(userstore.data.id+',') ? 'white' : 'black',display:monopublication?.data.post.type=='amen' || monopublication?.data.post.type=='verset' ? 'flex' : 'none'}} id={monopublication?.data.post.id+'amen'} onClick={()=>{likeramen(monopublication?.data?.post.id,monopublication?.data?.post.like)}}  className='flex flex-row justify-center items-center text-sm p-1 pl-2 rounded-xl gap-x-2 amenpub'><img id={monopublication?.data?.post.id+'iconamen'} className='amenpub' style={{height:'23px'}} src={userstore && monopublication?.data.post.likeur && monopublication?.data.post.likeur.includes(userstore.data.id+',') ? amenb : amenpicture} alt="" /> <span className='position-relative right-1 pr-2'>Amen</span> </button>
                          <button data-bs-toggle="modal" data-bs-target="#exampleModalPriere" style={{backgroundColor:userstore && monopublication?.data.post.likeur && monopublication?.data.post.likeur.includes(userstore.data.id+',') ? 'rgb(109 40 217)' : 'white',color:userstore && monopublication?.data.post.likeur && monopublication?.data.post.likeur.includes(userstore.data.id+',') ? 'white' : 'black',display:monopublication?.data.post.type=='priere' ? 'flex' : 'none'}} id={monopublication?.data.post.id+'priere'} onClick={()=>{likeramen(monopublication?.data?.post.id,monopublication?.data?.post.like)}}  className='flex flex-row justify-center items-center text-sm p-1 pl-2 rounded-xl gap-x-2 amenpub'><img id={monopublication?.data?.post.id+'iconpriere'}  className='amenpub' style={{height:'23px'}} src={userstore && monopublication?.data.post.likeur && monopublication?.data.post.likeur.includes(userstore.data.id+',') ? amenb : amenpicture} alt="" /> <span className='position-relative right-1 text-nowrap pr-2'>Je prie</span> </button>
                          <button className='flex flex-row justify-center items-center gap-x-2 text-sm p-1 px-4 rounded-xl commentpub'><img className='commentpub' style={{height:'19px'}} src={commenter} alt="" />Commenter</button>
                          <button onClick={()=>{setShare(monopublication?.data?.post?.id)}} data-bs-toggle="modal" data-bs-target="#exampleModalpartage" className='flex flex-row justify-center items-center gap-x-2 text-sm p-1 px-2 rounded-xl partagepub'><img className='partagepub' style={{height:'19px'}} src={partager} alt="" />Partager</button>
                        </div>
                       </div>
                       
                        {/* <hr> */}
                        <div class="comments pt-3 pb-12">
                           {monopublication?.data.post && monopublication?.data?.post?.commentairepubactualites.map((com)=>{
                            return  <div class="d-flex flex-row mb-2"> <Link to={'/profile/'+com?.user?.id}><img src={process.env.REACT_APP_BACKEND_FILE+com?.user?.pp} width="40" class="rounded-image"/></Link>
                            <div class="d-flex flex-column ml-2"> <span class="name namecomment">{com?.user?.nom[0]?.toUpperCase()+com?.user?.nom?.slice(1)?.substring(0,25)} {com?.user?.prenom?.substring(0,15)}</span> <small class="comment-text">{com.commentaire}</small>
                                <div class="d-flex flex-row align-items-center status"> <small className='text-xs text-violet-700'>{com.date}</small> </div>
                            </div>
                        </div>
                           })}
                           
                            <div style={{position:'fixed',width:'50%',top:'80%'}} class="comment-input comment-textarea flex flex-row items-center gap-x-2 w-full"> <textarea maxLength={1150} id='textareamonopost' onChange={(e)=>{setDirectcomment(e.target.value)}} type="text" style={{textIndent:'10px',fontSize:'small'}} placeholder='Ecrire un commentaire, soyez courtois svp' class="form-control focus:ring-violet-700 "></textarea>
                               <button onClick={sendComment} style={{display:commentaire.trim().length>0 ? 'flex' : 'none'}}><img src={envoyer} style={{display:commentaire.trim().length>0 ? 'flex' : 'none',height:'30px'}} class="fa fa-send"></img></button> <ClipLoader color={'rgb(109 40 217)'}  loading={loading}  size={30}/>
                            </div>
                           
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    
: (monopublication && monopublication.data.post=='aucun' ? 'Cette publication a été supprimée' : <MonoPublicationCardSkeleton/>)    
    }
      </div>

      </div>
       
    </div>
   </div>

<BottomBar/>

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

{/* modals  */}

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
         {
          userstore ?  <span href='' class="d-flex flex-row align-items-center text-decoration-none hover:text-violet-700"> <span style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+userstore.data.pp})`,backgroundPosition:'center',backgroundSize:'cover'}} className="w-12 h-12 rounded-full"></span>
          <div class="d-flex flex-column ml-2"> <span class="font-weight-bold text-sm">{userstore.data?.nom?.substring(0,25)}</span>
          <span className='text-sm'>{userstore.data?.pseudo?.substring(0,20)}</span> </div>
      </span> : ''
         }
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