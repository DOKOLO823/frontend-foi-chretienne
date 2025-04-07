import { Header } from '../components/header';
import docta from '../images/docta.jpg';
import left from '../icons/images/left.png';
import { useContext, useEffect, useState } from 'react';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { Link, useNavigate, useParams } from 'react-router-dom';
import whatsapp from '../icons/images/whatsapp.png';
import supprimer from '../icons/images/supprimer.png';
import chargementPriere from '../icons/images/chargement.gif';
import { ToastContainer, toast } from 'react-toastify';
import priereEnCours from '../images/priere.svg'
import ok from '../icons/images/ok.png';
import group from '../icons/images/group.png';
import facebook from '../icons/images/facebook.png';
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

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import 'react-toastify/dist/ReactToastify.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { tokenContexte } from '../contexte/tokenContexte';
import { userContexte } from '../contexte/userContexte';
import ClipLoader from 'react-spinners/ClipLoader';
import { MonoPublicationCardGroupeSkeleton } from '../skeletons/monopostgroupe';

const likecoeur=(id)=>{
    if(document.getElementById(id+'coeur').src==coeur){
        document.getElementById(id+'coeur').src=coeurv
    }else{
        document.getElementById(id+'coeur').src=coeur
    }
}

const more=(id)=>{
    if(document.getElementById(id+'more').style.transform=='scale(0)'){
        document.getElementById(id+'more').style.transform='scale(1)'
    }else{
        document.getElementById(id+'more').style.transform='scale(0)'
    }
}

const likeramen=(id)=>{
    if(document.getElementById('amen').style.backgroundColor!='white'){
        document.getElementById('amen').style.backgroundColor='white'
        document.getElementById('amen').style.color='black'
        document.getElementById('priere').style.backgroundColor='white'
        document.getElementById('priere').style.color='black'
        document.getElementById('iconamen').src=amenpicture
        document.getElementById('iconpriere').src=amenpicture
    }else{
        document.getElementById('amen').style.backgroundColor='rgb(109 40 217)'
        document.getElementById('amen').style.color='white'
         document.getElementById('priere').style.backgroundColor='rgb(109 40 217)'
        document.getElementById('priere').style.color='white'
        document.getElementById('iconamen').src=amenb
        document.getElementById('iconpriere').src=amenb
    }

}

export function Monopublicationgroupe()
{
     const queryClient=useQueryClient();
    const [share, setShare]=useState(null)
    const {token}=useContext(tokenContexte)
    const {userstore}=useContext(userContexte)
    const tab=['','','','','','','','','','','','','','','','']
    const images=['','','']
      // copy clipboard 
      const [textCopy, setTextCopy]=useState('texte a partager')
      const [statutCopy,setStatutCopy]=useState(false)
     const tab2=['','','','','','','','','','','','','','','','','','','','','','']

    const navigate=useNavigate();

     const [morestate, setMore]=useState(false);
        const agirPublication=(id)=>{
            document.getElementById(id[0]+'more').style.transform='scale(0)'
            if(id.includes('signaler')){
                toast('Signalement envoye avec succes')
            }
            if(id.includes('cacher')){
               toast('Vous ne verrez plus cette publication')
            }
            if(id.includes('bloquer')){
                toast('Vous avez bloque l\'auteur de cette publication.')
            }
            if(id.includes('retirer')){
                toast('Vous n\'etes plus ami avec l\'auteur de cette publication')
            }
            if(id.includes('supprimer')){
                toast('Publication supprimee')
            }
            setMore(!morestate)
        }

          const more=(id)=>{
                if(document.getElementById(id+'more').style.transform=='scale(0)'){
                    document.getElementById(id+'more').style.transform='scale(1)'
                }else{
                    document.getElementById(id+'more').style.transform='scale(0)'
                }
            }
        
            const merci=()=>{
              toast("Merci pour votre prière")
            }
        
            const [commentaire, setDirectcomment]=useState('')

            const likeramengroupe=()=>{
                if(document.getElementById('amengroupe').style.backgroundColor!='white'){
                    document.getElementById('amengroupe').style.backgroundColor='white'
                    document.getElementById('amengroupe').style.color='black'
                    document.getElementById('prieregroupe').style.backgroundColor='white'
                    document.getElementById('prieregroupe').style.color='black'
                    document.getElementById('iconamengroupe').src=amenpicture
                    document.getElementById('iconprieregroupe').src=amenpicture
                }else{
                    document.getElementById('amengroupe').style.backgroundColor='rgb(109 40 217)'
                    document.getElementById('amengroupe').style.color='white'
                     document.getElementById('prieregroupe').style.backgroundColor='rgb(109 40 217)'
                    document.getElementById('prieregroupe').style.color='white'
                    document.getElementById('iconamengroupe').src=amenb
                    document.getElementById('iconprieregroupe').src=amenb
                }
          
            }

            // affichage du post 
            const {id}=useParams('id')
            const {data:publication,isLoading:loadpub}=useQuery({
                queryKey:['mono-publication-groupe'],
                queryFn:()=>token ? axios.get(`${process.env.REACT_APP_BACKEND_URL}/mono-publication-groupe/${id}`,{
                  headers:{
                    "Authorization": "Bearer "+token
                  }
                }):navigate('/login')
              })

               // liker meditation 
               const likeramen=(id,like)=>{
                if(document.getElementById(id+'amen').style.backgroundColor!='white'){
                    document.getElementById(id+'amen').style.backgroundColor='white'
                    document.getElementById(id+'amen').style.color='black'
                    document.getElementById(id+'iconamen').src=amenpicture
                   if(like>0){
                     document.getElementById(id+'likeamen').textContent=like-1+' Amen(s)'
                   }else{
                     document.getElementById(id+'likeamen').textContent=0+' Amen'
                   }
                }else{
                    document.getElementById(id+'amen').style.backgroundColor='rgb(109 40 217)'
                    document.getElementById(id+'amen').style.color='white'
                    document.getElementById(id+'iconamen').src=amenb
                     document.getElementById(id+'likeamen').textContent=like+1+' Amen(s)'
                }
        
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/like-meditation`, {id},{
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
  
        // liker sujet de priere 
        const likerjeprie=(id,like)=>{
          if(document.getElementById(id+'priere').style.backgroundColor!='white'){
              document.getElementById(id+'priere').style.backgroundColor='rgb(109 40 217)'
              document.getElementById(id+'priere').style.color='white'
              document.getElementById(id+'iconpriere').src=amenb
              document.getElementById(id+'likepriere').textContent=like+1+' Priere(s)'
          }else{
              document.getElementById(id+'priere').style.backgroundColor='rgb(109 40 217)'
              document.getElementById(id+'priere').style.color='white'
              document.getElementById(id+'iconpriere').src=amenb
              document.getElementById(id+'likepriere').textContent=like+1+' Prière(s)'
          }
  
          axios.post(`${process.env.REACT_APP_BACKEND_URL}/like-priere`, {id},{
            headers:{
                "Authorization": "Bearer "+token
              }
        }).then((res)=>{
          }).catch((err)=>{
           navigate('/login')
          })
  
      }

    //   envoyer un com 
    useEffect(()=>{
        setLoading(false)
        window.scrollTo(0, document.body.scrollHeight);
      },[publication])

    const idmeditationpriere=publication?.data?.publication?.typepublication=='meditation' ? publication?.data?.publication?.meditation?.id : publication?.data?.publication?.priere?.id
    const mutationaddcom=useMutation({
      mutationFn:()=>{
          axios.post(`${process.env.REACT_APP_BACKEND_URL}/add-commentaire-groupe`,{id,idmeditationpriere,commentaire},{
              headers:{
                "Authorization": "Bearer "+token
              }
            })
      },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['mono-publication-groupe'] });
        },
        onError:()=>navigate('/login')
    })

    let [loading, setLoading] = useState(false);
    const sendComment=()=>{
        setLoading(true)
        document.getElementById('textareamonopost').value='';
        setDirectcomment('')
        mutationaddcom.mutate({commentaire})
      }

    //   rejoindre un groupe 
    const rejoindre=(id,idbouton)=>{
        document.getElementById(idbouton).textContent='encours d\'adhésion...'
       axios.post(`${process.env.REACT_APP_BACKEND_URL}/rejoindre-groupe`, {id},{
           headers:{
               "Authorization": "Bearer "+token
             }
       }).then((res)=>{
           if(res.data.statut=='200'){
           document.getElementById(idbouton).textContent='Vous êtes membres'
           }else if(res.data.statut=='300'){
           document.getElementById(idbouton).textContent='Vous êtes deja membres'
           }
         }).catch((err)=>{
          navigate('/login')
         })
       
     }

      // partage de pub 
    const [publicationid, setPublicationid]=useState(null)
    const [idprieremeditation, setIdprieremeditation]=useState()
    const [loadpartage, setLoadpartage]=useState(false)
    const partagewhatsapp=()=>{
      setLoadpartage(true)
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/partage-post-groupe`,{publicationid, idprieremeditation},{
        headers:{
          "Authorization": "Bearer "+token
        }
      }).then((res)=>{
        setLoadpartage(false)
        window.location.href="https://wa.me/?text=https://foichretienne.org/mono-publication-groupe/"+publicationid
      })
    }

    const partagefacebook=()=>{
      setLoadpartage(true)
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/partage-post-groupe`,{publicationid, idprieremeditation},{
        headers:{
          "Authorization": "Bearer "+token
        }
      }).then((res)=>{
        setLoadpartage(false)
        window.location.href="https://www.facebook.com/sharer/sharer.php?u=https://foichretienne.org/mono-publication-groupe/"+publicationid+";src=sdkpreparse"
      })
    }


    return <>
   <div className="flex flex-col justify-center items-center w-full">
    <Header/>
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
        <div className=' flex flex-col items-start divgauche'> <DivGauche/> </div>
      <div className="w-3/4 px-2 h-full flex flex-col items-center justify-center nouvelledivdroite">
      <p className="text-start mb-3 flex flex-row justify-start w-full items-center gap-x-4"><span onClick={()=>{navigate(-1)}} className='cursor-pointer'><img style={{height:'16px'}} src={left} alt="" /></span></p>
    
            <div class="card w-full mb-24">
                <div class="d-flex justify-content-between py-2">
           { publication && publication?.data?.statut==200 ? 
           
           <>
             {/* meditation et sujet de priere venant d'un groupe  */}
             <div class=" mt-3 mb-4 flex flex-row justify-center items-center w-full">
    <div class="row d-flex align-items-center justify-content-center w-full">
        <div class=" w-full">
            <div class="card w-full">
        
              
                  {/* entete du groupe source  */}
                <div class="card w-full mb-3">
          <div class="card-header d-flex justify-content-between align-items-center py-3 w-full"
           >
            <Link to={'/groupe/'+publication?.data?.publication?.groupe?.id} className='text-decoration-none hover:text-violet-700'><div className='flex flex-row justify-center items-center gap-x-2'><span style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+publication?.data?.publication?.groupe?.photo})`,backgroundPosition:'center',backgroundSize:'cover'}} className='rounded-full h-12 w-12'></span><span className='flex flex-col justify-center items-start'> <span className='text-violet-700'>{publication?.data?.publication?.groupe?.nom?.substring(0,45)}</span><span className='text-xs'>{publication?.data?.publication?.groupe?.membre?.split(",").length} membre(s)</span> </span></div></Link>
          </div>
          </div>
          {/* end enetete  */}

          {/* entete auteur  */}
          <div class="d-flex justify-content-between py-2">
                    <Link to={'/profile/'+publication?.data?.publication?.user?.id} class="d-flex flex-row align-items-center text-decoration-none hover:text-violet-700"> <span style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+publication?.data?.publication?.user?.pp})`,backgroundPosition:'center',backgroundSize:'cover'}} className="w-10 h-10 rounded-full"></span>
                        <div class="d-flex flex-column ml-2"> <span class="font-weight-bold text-sm">{publication?.data?.publication?.user?.nom.substring(0,25)} {publication?.data?.publication?.user?.prenom.substring(0,25)} </span> <small class="text-gray text-xs">{publication?.data?.publication?.user?.pseudo?.substring(0,25).substring(0,15)}</small> <small class="mr-2 text-xs ellipsis">{publication?.data?.publication?.date}</small> </div>
                    </Link>
                </div>
          {/* end entete auteur  */}
             
          <div className="flex flex-col gap-y-2"><span className='text-xl font-bold text-violet-700 border-violet-700 border-2 px-2 rounded-lg text-center'><span style={{display:publication?.data?.publication?.typepublication!='meditation' && 'none'}}>Méditation</span><span style={{display:publication?.data?.publication?.typepublication!='priere' && 'none'}} >Sujet de prière </span>  </span><span><b><u><span style={{display:publication?.data?.publication?.typepublication!='meditation' && 'none'}} className='font-bold'>THEME </span><span style={{display:publication?.data?.publication?.typepublication!='priere' && 'none'}} className='font-bold'>CIBLE </span>: </u></b> {publication?.data?.publication?.meditation?.theme} {publication?.data?.publication?.priere?.cible}</span><span style={{display:publication?.data?.publication?.typepublication!='meditation' && 'none'}} ><b className='font-bold'><u>LECTURE :</u></b> {publication?.data?.publication?.meditation?.lecture} </span> <span><b><u><span style={{display:publication?.data?.publication?.typepublication!='meditation' && 'none'}} className='font-bold'>Message d'exhortation </span><span style={{display:publication?.data?.publication?.typepublication!='priere' && 'none'}} className='font-bold'>Sujet de prière </span> :</u></b> </span></div>
          <p class="text-justify pb-3 border-solid border-b-2 border-b-gray-300"> {publication?.data?.publication?.meditation?.message} {publication?.data?.publication?.priere?.sujet}</p>
             
                <div class="p-2 w-full">

                    <div class="p-2 w-full">

                    <div className="flex flex-col justify-between items-start gap-y-2">
                       <div className='flex flex-row justify-between items-center text-xs w-full statpublication'><div><span id={publication?.data?.publication?.meditation?.id+'likeamen'} style={{display:publication?.data?.publication?.typepublication!='meditation' && 'none'}}>{publication?.data?.publication?.meditation?.amen} Amen(s) &nbsp;</span><span id={publication?.data?.publication?.priere?.id+'likepriere'} style={{display:publication?.data?.publication?.typepublication!='priere' && 'none'}}>{publication?.data?.publication?.priere?.priere} Prière(s) &nbsp;</span></div> <div className='flex flex-row justify-center items-center'><span> {publication?.data?.publication?.meditation?.commentairemeditations?.length} {publication?.data?.publication?.priere?.commentaireprieres?.length} Commentaire(s)&nbsp; </span> <span><img style={{height:'5px'}} src={point} alt="" /></span> &nbsp;<span>  {publication?.data?.publication?.meditation?.partage} {publication?.data?.publication?.priere?.partage} Partage(s)</span></div> </div>
                        <div class="d-flex flex-row justify-content-between align-items-center pereiconspub border-b border-b-1 w-full">
                          <button style={{backgroundColor:userstore && publication?.data?.publication?.meditation?.likeur?.includes(userstore?.data?.id+',') ? 'rgb(109 40 217)' : 'white',color:userstore && publication?.data?.publication?.meditation?.likeur?.includes(userstore?.data?.id+',') ? 'white' : 'black',display:publication?.data?.publication?.typepublication!='meditation' && 'none'}} id={publication?.data?.publication?.meditation?.id+'amen'} onClick={()=>{likeramen(publication?.data?.publication?.meditation?.id,publication?.data?.publication?.meditation?.amen)}}  className='flex flex-row justify-center items-center text-sm p-1 pl-2 rounded-xl gap-x-2 amenpub'><img id={publication?.data?.publication?.meditation?.id+'iconamen'} className='amenpub' style={{height:'23px'}} src={userstore && publication?.data?.publication?.meditation?.likeur?.includes(userstore.data.id+',') ? amenb : amenpicture} alt="" /> <span className='position-relative right-1 pr-2'>Amen</span> </button>
                          <button data-bs-toggle="modal" data-bs-target="#exampleModalPriere" style={{backgroundColor:userstore && publication?.data?.publication?.priere?.likeur?.includes(userstore?.data?.id+',') ? 'rgb(109 40 217)' : 'white',color:userstore && publication?.data?.publication?.priere?.likeur?.includes(userstore?.data?.id+',') ? 'white' : 'black',display:publication?.data?.publication?.typepublication!='priere' && 'none'}} id={publication?.data?.publication?.priere?.id+'priere'} onClick={()=>{likerjeprie(publication?.data?.publication?.priere?.id,publication?.data?.publication?.priere?.priere)}}  className='flex flex-row justify-center items-center text-sm p-1 pl-2 rounded-xl gap-x-2 amenpub'><img id={publication?.data?.publication?.priere?.id+'iconpriere'}  className='amenpub' style={{height:'23px'}} src={userstore && publication?.data?.publication?.priere?.likeur?.includes(userstore?.data?.id+',') ? amenb : amenpicture} alt="" /> <span className='position-relative right-1 text-nowrap pr-2'>Je prie</span> </button>
                          <Link className='flex flex-row justify-center items-center gap-x-2 text-sm p-1 px-4 rounded-xl commentpub'><img className='commentpub' style={{height:'19px'}} src={commenter} alt="" />Commenter</Link>
                          <button onClick={()=>{setPublicationid(publication?.data?.publication?.id);setIdprieremeditation(publication?.data?.publication?.meditation ? publication?.data?.publication?.meditation?.id : publication?.data?.publication?.priere?.id)}} data-bs-toggle="modal" data-bs-target="#exampleModalpartage" className='flex flex-row justify-center items-center gap-x-2 text-sm p-1 px-2 rounded-xl partagepub'><img className='partagepub' style={{height:'19px'}} src={partager} alt="" />Partager</button>
                        </div>
                       </div>
                  
                    <div class="comments pt-3 pb-12">
                           { (publication?.data?.publication && publication?.data?.publication?.typepublication=='meditation') ? publication?.data?.publication?.meditation?.commentairemeditations.map((com)=>{
                            return  <div class="d-flex flex-row mb-2"> <Link to={'/profile/'+com.user.id}><img src={process.env.REACT_APP_BACKEND_FILE+com.user?.pp} width="40" class="rounded-image"/></Link>
                            <div class="d-flex flex-column ml-2"> <span class="name namecomment">{com.user?.nom[0]?.toUpperCase()+com.user?.nom?.slice(1)?.substring(0,35)}</span> <small class="comment-text">{com.commentaire}</small>
                                <div class="d-flex flex-row align-items-center status"> <small className='text-xs text-violet-700'>{com.date}</small> </div>
                            </div>
                        </div>
                           }) : (publication?.data?.publication && publication?.data?.publication?.typepublication=='priere') &&
                           
                           publication?.data?.publication?.priere?.commentaireprieres.map((com)=>{
                            return  <div class="d-flex flex-row mb-2"> <Link to={'/profile/'+com.user.id}><img src={process.env.REACT_APP_BACKEND_FILE+com.user?.pp} width="40" class="rounded-image"/></Link>
                            <div class="d-flex flex-column ml-2"> <span class="name namecomment">{com.user?.nom[0]?.toUpperCase()+com.user?.nom?.slice(1)?.substring(0,35)}</span> <small class="comment-text">{com.commentaire}</small>
                                <div class="d-flex flex-row align-items-center status"> <small className='text-xs text-violet-700'>{com.date}</small> </div>
                            </div>
                        </div>
                           })

                           } 
                           
                            <div style={{position:'fixed',width:'50%',top:'80%', display:!publication?.data?.publication?.groupe?.membre?.includes(userstore?.data?.id+",") && 'none'}} class="comment-input comment-textarea flex flex-row items-center gap-x-2 w-full"> <textarea maxLength={1150} id='textareamonopost' onChange={(e)=>{setDirectcomment(e.target.value)}} type="text" style={{textIndent:'10px',fontSize:'small'}} placeholder='Placez votre commentaire, soyez courtois svp' class="form-control focus:ring-violet-700 "></textarea>
                               <button onClick={sendComment} style={{display:commentaire.trim().length>0 ? 'flex' : 'none'}}><img src={envoyer} style={{display:commentaire.trim().length>0 ? 'flex' : 'none',height:'30px'}} class="fa fa-send"></img></button> <ClipLoader color={'rgb(109 40 217)'}  loading={loading}  size={30}/>
                            </div>
                           
                        </div>

              </div>
              
                    <Link style={{display:publication?.data?.publication?.groupe?.type=='prive' && 'none'}} to={'/groupe/'+publication?.data?.publication?.groupe_id} class="btn focus:bg-violet-600 bg-violet-700 text-white mt-1 hover:bg-violet-600 w-full">Voir le groupe</Link>
                    <Link id='join' onClick={()=>{rejoindre(publication?.data?.publication?.groupe?.id,'join')}} style={{display:(publication?.data?.publication?.groupe?.membre?.includes(userstore?.data?.id+",") || publication?.data?.publication?.groupe?.type=='prive') && 'none'}} class="btn focus:bg-violet-600 active:bg-violet-600 bg-violet-700 text-white mt-1 hover:bg-violet-600 w-full">Rejoindre le groupe</Link>
                </div>
            </div>
        </div>
    </div>
</div>
{/* end meditation  */}
             
             
             
           </> : (publication && publication?.data?.statut==404) ? 'Ce post a été supprimé' :
           <MonoPublicationCardGroupeSkeleton/>
           }
             
              </div>
            </div>
          </div>         
    </div>
</div>

<BottomBar/>

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
          <span class="d-flex flex-row align-items-center text-decoration-none hover:text-violet-700"> <span style={{backgroundImage:`url(${userstore && process.env.REACT_APP_BACKEND_FILE+userstore?.data?.pp})`,backgroundPosition:'center',backgroundSize:'cover'}} className="w-12 h-12 rounded-full"></span>
                        <div class="d-flex flex-column ml-2"> <span class="font-weight-bold text-sm">{userstore?.data?.nom?.substring(0,25)?.toUpperCase()}</span>
                        <span className='text-sm'> {userstore?.data?.pseudo?.substring(0,30) } </span> </div>
                    </span>
          </div>
         <div className="w-full flex flex-col justify-center items-start gap-y-8">
            <div className='flex flex-col items-start gap-y-1.5'><span className='text-sm font-bold'>Copier le lien de la publication</span>
            {/* lien publication  */}
            <span>
                
<div style={{width:'100%',flexWrap:'wrap'}} class=" gap-2 w-full flex flex-row">
    <CopyToClipboard text={'https://foichretienne.org/mono-publication-groupe/'+publicationid}
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