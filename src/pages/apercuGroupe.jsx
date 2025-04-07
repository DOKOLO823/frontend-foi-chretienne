import { Header } from '../components/header';
import docta from '../images/docta.jpg';
import morepicture from '../icons/images/more.png';
import meditationphoto from '../icons/images/remarques.png';
import dieu from '../icons/images/dieu.png';
import menugroupe from '../icons/images/menugroupe.png';
import prier from '../icons/images/prieregroupe.png';
import signaler from '../icons/images/signaler.png';
import bloquer from '../icons/images/bloquer.png';
import cacher from '../icons/images/cacher.png';
import retirer from '../icons/images/retirer.png';
import amenpicture from '../icons/images/amen.png';
import amenb from '../icons/images/amenb.png';
import partager from '../icons/images/partager.png';
import commenter from '../icons/images/commenter.png';
import point from '../icons/images/point.png';
import coeur from '../icons/images/coeur.png';
import coeurv from '../icons/images/coeurv.png';
import envoyer from '../icons/images/envoyer.png';
import supprimer from '../icons/images/supprimer.png';
import ok from '../icons/images/ok.png';
import group from '../icons/images/group.png';
import facebook from '../icons/images/facebook.png';
import whatsapp from '../icons/images/whatsapp.png';
import chargementPriere from '../icons/images/chargement.gif';
import priereEnCours from '../images/priere.svg'
import left from '../icons/images/left.png';
import bottomimage from '../icons/images/bottom.png';
import { useContext, useEffect, useRef, useState } from 'react';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { tokenContexte } from '../contexte/tokenContexte';
import { userContexte } from '../contexte/userContexte';
import ClipLoader from 'react-spinners/ClipLoader';
import Pusher from "pusher-js";
import Echo from 'laravel-echo';
import { ApercuGroupeSkeleton } from '../skeletons/apercuGroupeSkeleton';

export function ApercuGroupe()
{
     const [statutCopy,setStatutCopy]=useState(false)
  
    const menuGroupe=()=>{
      if(document.getElementById('dropdowngroupe').style.top=='-20px'){
        document.getElementById('dropdowngroupe').style.top='-1000px';
      }
      else{
        document.getElementById('dropdowngroupe').style.top='-20px';
      }
    }

    const optionGroupe=()=>{
      if(document.getElementById('optiongroupe').style.transform=='scale(0)'){
        document.getElementById('optiongroupe').style.transform='scale(1)';
      }
      else{
        document.getElementById('optiongroupe').style.transform='scale(0)';
      }
    }

    // meditation 
     const [morestate, setMore]=useState(false);
        const agirPublication=(ide,id)=>{
            document.getElementById(id+'more').style.transform='scale(0)'
            if(ide.includes('signaler')){
                toast('Signalement envoye avec succes')
            }
            if(ide.includes('supprimer')){
                    toast('Suppression encours...')
                    mutationdeletepost.mutate()
          
                }
            setMore(!morestate)
        }
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

          const {id}=useParams('id')
          const navigate=useNavigate();
          const {token}=useContext(tokenContexte)
          const {userstore}=useContext(userContexte)
          // infos sur apercu groupe 
          const [share, setShare]=useState(null)
          const {data:apercugroupe,isLoading}=useQuery({
            queryKey:['info-groupe'],
            queryFn:()=>token ? axios.get(`${process.env.REACT_APP_BACKEND_URL}/info-groupe/${id}`,{
              headers:{
                "Authorization": "Bearer "+token
              }
            }):navigate('/login')
          })
          //  publications du groupe 
          const {data:publications,isLoading:loadpub}=useQuery({
            queryKey:['publication-groupe'],
            queryFn:()=>token ? axios.get(`${process.env.REACT_APP_BACKEND_URL}/publication-groupe/${id}`,{
              headers:{
                "Authorization": "Bearer "+token
              }
            }):navigate('/login')
          })

           // pour scroller vers le bas a chaque nouveau message 
       const [loading, setLoading]=useState(false)
       const [statescroll, setStatescroll]=useState(false)
       const messageEndRef=useRef(null);
       const [newmessage,setNewmessage]=useState('')
       useEffect(()=>{
           messageEndRef.current?.scrollIntoView();
       },[newmessage])

       useEffect(()=>{
        if(statescroll==true){
         messageEndRef.current?.scrollIntoView();
         setLoading(false)
        }
     },[publications])


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

    // supprimer un post (meditation ou priere)
     const queryClient=useQueryClient();
    const mutationdeletepost=useMutation({
      mutationFn:()=>{
          axios.post(`${process.env.REACT_APP_BACKEND_URL}/delete-post-groupe`,{publicationid,idprieremeditation},{
              headers:{
                "Authorization": "Bearer "+token
              }
            })
      },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['publication-groupe'] });
          toast('Suppression réussie')
        },
    })

    // supprimer un simple post 
    const deletesimplepost=()=>{
      toast('suppression du message en cours...')
      mutationdeletepost.mutate()

    }

    // edit meditation
    const [theme, setTheme]=useState()
    const [lecture, setLecture]=useState()
    const [exhortation, setExhortation]=useState()
    const reftheme=useRef()
    const reflecture=useRef()
    const refexhortation=useRef()

    const [meditation, setMeditation]=useState()
    const editmeditation=()=>{
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/edit-meditation`, {idprieremeditation},{
        headers:{
            "Authorization": "Bearer "+token
          }
    }).then((res)=>{
      setMeditation(res.data?.meditation)
      setTheme(res.data?.meditation?.theme)
      setLecture(res.data?.meditation?.lecture)
      setExhortation(res.data?.meditation?.message)
      // toast('Meditation modifiée')
      }).catch((err)=>{
      //  console.log(err)
      })
    }

    // update meditation 

    const mutationupdatemeditation=useMutation({
      mutationFn:()=>{
          axios.post(`${process.env.REACT_APP_BACKEND_URL}/update-meditation`,{idprieremeditation, theme, lecture, exhortation},{
              headers:{
                "Authorization": "Bearer "+token
              }
            })
      },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['publication-groupe'] });
          toast('Méditation modifiée !')
          setTheme(null)
          setLecture(null)
          setExhortation(null)
        },
    })

    const updatemeditation=()=>{
      toast('Modification en cours...')
      mutationupdatemeditation.mutate()
    }

// recevoir les messages en temps reel 
    const mutationactualise=useMutation({
      mutationFn:()=>{},
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['publication-groupe'] });
        },
    })

     // edit priere
     const [cible, setCible]=useState()
     const [sujetpriere, setSujetpriere]=useState()
     const refsujetpriere=useRef()
 
     const [priere, setPriere]=useState()
     const editpriere=()=>{
       axios.post(`${process.env.REACT_APP_BACKEND_URL}/edit-priere`, {idprieremeditation},{
         headers:{
             "Authorization": "Bearer "+token
           }
     }).then((res)=>{
       setPriere(res.data?.priere)
       setCible(res.data?.priere?.cible)
       setSujetpriere(res.data?.priere?.sujet)
       }).catch((err)=>{
        // console.log(err)
       })
     }

    //  update priere 
    const mutationupdatepriere=useMutation({
      mutationFn:()=>{
          axios.post(`${process.env.REACT_APP_BACKEND_URL}/update-priere`,{idprieremeditation,cible,sujetpriere},{
              headers:{
                "Authorization": "Bearer "+token
              }
            })
      },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['publication-groupe'] });
          toast('Priere Modifiée !')
          setCible(null)
          setSujetpriere(null)
        },
    })

    const updatepriere=()=>{
      toast('En cours de modification...')
      mutationupdatepriere.mutate()
    }

    // envoyer un message simple 
    const groupeid=id
    const [message, setMessage]=useState()
    const mutationsimplemessage=useMutation({
      mutationFn:()=>{
          axios.post(`${process.env.REACT_APP_BACKEND_URL}/add-simple-message`,{groupeid,message},{
              headers:{
                "Authorization": "Bearer "+token
              }
            })
      },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['publication-groupe'] });
        },
        onError:()=>setLoading(false)
    })

    const sendMessage=()=>{
      setLoading(true)
      document.getElementById("sendsimplemessage").value=''
      setStatescroll(true)
      mutationsimplemessage.mutate()
    }

    // send meditation 
    const mutationsendmeditation=useMutation({
      mutationFn:()=>{
          axios.post(`${process.env.REACT_APP_BACKEND_URL}/add-meditation`,{groupeid,theme,lecture,exhortation},{
              headers:{
                "Authorization": "Bearer "+token
              }
            })
      },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['publication-groupe'] });
        },
        onError:()=>setLoading(false)
    })

    const sendMeditation=()=>{
      setLoading(true)
      setStatescroll(true)
      mutationsendmeditation.mutate()
    }

    // send priere
    const mutationsendpriere=useMutation({
      mutationFn:()=>{
          axios.post(`${process.env.REACT_APP_BACKEND_URL}/add-priere`,{groupeid,cible,sujetpriere},{
              headers:{
                "Authorization": "Bearer "+token
              }
            })
      },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['publication-groupe'] });
        },
        onError:()=>setLoading(false)
    })

    const sendPriere=()=>{
      setLoading(true)
      setStatescroll(true)
      mutationsendpriere.mutate()
    }

 // retirer un membre 
 const idgroupe=id
 const retirerMembre=(iduser,idbouton)=>{
    document.getElementById(idbouton).textContent='en cours de retrait...'
   axios.post(`${process.env.REACT_APP_BACKEND_URL}/retirer-membre`, {idgroupe,iduser},{
     headers:{
         "Authorization": "Bearer "+token
       }
 }).then((res)=>{
 if(typeof(res.data?.statut)!=undefined && res.data?.statut==200){
   document.getElementById(idbouton).textContent='a été retiré du groupe'
 }else{
    document.getElementById(idbouton).textContent='retirer du groupe'
 }
 toast(res?.data?.message && res?.data?.message)
   }).catch((err)=>{
   //  console.log(err)
   })
 }

  // inviter un membre 
  const sendInvitation=(iduser,idbouton)=>{
    const idinitiateur=userstore?.data?.id
     document.getElementById(idbouton).textContent='Invitation en cours...'
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/inviter-personne`, {idgroupe,iduser,idinitiateur},{
      headers:{
          "Authorization": "Bearer "+token
        }
  }).then((res)=>{
  if(typeof(res.data?.statut)!=undefined && res.data?.statut==200){
    document.getElementById(idbouton).textContent='Invitation envoyée'
  }else{
     document.getElementById(idbouton).textContent='Inviter'
  }
  toast(res?.data?.message && res?.data?.message)
    }).catch((err)=>{
    //  console.log(err)
    })
  }

// websocket 
  useEffect(()=>{
  
    Pusher.logToConsole = true;

    var pusher = new Pusher('2cab761eeee3a5f348a0', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('my-channel');
    // Bind to an event
    channel.bind('my-event', (data) => {
     // Handle the new notification
      setStatescroll(false)
      mutationactualise.mutate()
      // publications?.data?.pubs?.push(JSON.stringify(data?.message))
    });
   // Clean up the Pusher instance when the component unmounts
    return () => {
      pusher.unsubscribe('my-event');
      pusher.disconnect();
    };

  },[])
 
    return <>
     <ToastContainer/>
   <div className="flex flex-col justify-center items-center w-full">
   <p className="text-start flex flex-row justify-start items-center gap-x-4 w-full pl-3 mt-2"><span onClick={()=>{navigate(-1)}} className='cursor-pointer'><img style={{height:'16px'}} src={left} alt="" /></span></p>
    <div  className='position-relative top-6 flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
        <div className=' flex flex-col items-start divgauche'> <DivGauche/> </div>
      <div className="w-3/4 h-full flex flex-col items-center justify-center nouvelledivdroite">
      {/* groupe  */}
     {
      (apercugroupe && publications) ? <>
       <section className='w-full px-2 position-relative -top-4 sectionapercugroupe'>
  <div class="w-full">

    <div class="flex flex-row justify-center w-full">
      <div class="flex flex-col justify-center items-center w-full">
        <div style={{display:(apercugroupe?.data?.groupe?.type=='prive' && !apercugroupe?.data?.groupe?.membre?.includes(userstore?.data?.id+',')) && 'none'}} class="card w-full">
          <div class="card-header d-flex justify-content-between align-items-center p-3 w-full"
           >
            <Link to={'/info-groupe/'+apercugroupe?.data?.groupe?.id} className='text-decoration-none hover:text-violet-700'><div className='flex flex-row justify-center items-center gap-x-2'><span style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+apercugroupe?.data?.groupe?.photo})`,backgroundPosition:'center',backgroundSize:'cover'}} className='rounded-full h-12 w-12'></span><span className='flex flex-col justify-center items-start'> <span className='text-violet-700 text-sm'>{apercugroupe?.data?.groupe?.nom?.length>40 ? apercugroupe?.data?.groupe?.nom?.substring(0,40)+'...' : apercugroupe?.data?.groupe?.nom}</span><span className='text-xs'>{apercugroupe?.data?.groupe?.membre?.split(",")?.length>0 ? apercugroupe?.data?.groupe?.membre?.split(",")?.length-1 : 0} membre(s)</span> </span></div></Link>
            <div class="">
               <img onClick={menuGroupe} className='cursor-pointer' style={{height:'30px'}} src={morepicture} alt="menu foi chretienne groupe" />
            </div>

          </div>
          <div className="w-full h-0">
            <div id='dropdowngroupe' style={{top:'-1000px',height:'7rem',width:'11rem',transition:'all ease 0.4s'}} className='float-right z-10 position-relative right-3 p-3 shadow bg-gray-50 px-4 rounded-xl flex flex-col justify-center items-center'>
              <ul className='text-sm flex flex-col gap-y-3'>
                <li className='hover:bg-violet-700 hover:text-white hover:p-1 hover:rounded-lg hover:pl-2 cursor-pointer'><Link to={'/info-groupe/'+apercugroupe?.data?.groupe?.id} className='text-decoration-none hover:text-white'>Paramètres</Link></li>
                <li data-bs-toggle="modal" data-bs-target="#modalmembre" data-whatever="@getbootstrap" className='hover:bg-violet-700 hover:text-white hover:p-1 hover:rounded-lg hover:px-2 cursor-pointer'>Voir les membres</li>
                <li data-bs-toggle="modal" data-bs-target="#modalinvitation" data-whatever="@getbootstrap" className='hover:bg-violet-700 hover:text-white hover:p-1 hover:rounded-lg hover:px-2 cursor-pointer'>Inviter des membres</li>
              </ul>
            </div>
          </div>
          
          <div class="card-body overflow-y-auto" style={{position:'relative',height:'380px',paddingLeft:'5px',paddingRight:'5px'}}>
    <div style={{display:apercugroupe?.data?.groupe?.type=='prive' ? 'flex' : 'none'}} className="w-full flex-row justify-center position-relative -top-2 text-center text-xs">Ce groupe est privé. Seuls les membres peuvent voir son contenu.</div>
      <div  className="w-full pr-3"><span style={{display:((publications && publications?.data?.pubs?.length>=5) ? 'flex' : 'none')}} onClick={()=>{messageEndRef.current?.scrollIntoView();}} className='float-right cursor-pointer'> <img src={bottomimage} style={{height:'25px'}} alt="" /> </span></div>

    <div style={{display:(apercugroupe?.data?.groupe?.type=='prive' && !apercugroupe?.data?.groupe?.membre?.includes(userstore?.data?.id+',')) && 'none'}} className="w-full h-full">
    {
            publications?.data?.pubs?.map((e,i)=>{
                return <>
                <div style={{display:(e.user?.id==userstore?.data?.id || e.typepublication!='simple') && 'none'}} className="w-full">
                <Link to={'/profile/'+e.user?.id} class="d-flex justify-content-between text-decoration-none hover:text-violet-700">
                 <p class="small mb-1">{e.user?.nom?.substring(0,25)} {e.user?.prenom?.substring(0,25)}</p>
                 </Link>
                <p class="small mb-1 text-muted">{e.date}</p>
           
            <div class="d-flex flex-row justify-content-start">
              <Link to={'/profile/'+e.user?.id} style={{height:'100%',width:'45px'}} className="text-decoration-none hover:text-violet-700">
              <img className='rounded-full' src={process.env.REACT_APP_BACKEND_FILE+e.user?.pp}
                alt="avatar 1" style={{height:'100%',width:'45px'}}/>
              </Link>
              <div className='px-8 w-full'>
                <p class="small p-2 ms-3 rounded-3 bg-body-tertiary">
                {e.simple?.message}</p>
                
              </div>
            </div>
                </div>

          
          <div style={{display:(e.user?.id!=userstore?.data?.id || e.typepublication!='simple') && 'none'}} className="w-full">
          <div class="d-flex justify-content-between">
            <Link to={'/profile/'+e.user?.id} class="d-flex justify-content-between text-decoration-none hover:text-violet-700">
                 <p class="small mb-1"></p>
                 </Link>
                <p class="small mb-1 text-muted">{e.date}</p>
            </div>
            <div class="d-flex flex-row justify-content-end mb-4 pt-1">
              <div className='px-8 w-full'>
                <p class="small p-2 me-3 text-white rounded-3 bg-violet-700 text-white">{e.simple?.message}</p>
                 <button onClick={()=>{setPublicationid(e.id); setIdprieremeditation(e.simple?.id)}} data-bs-toggle="modal" data-bs-target="#deleteModal" className='text-xs text-violet-700'>Supprimer</button>
              </div>
              <Link to={'/profile/'+e.user?.id} style={{height:'100%',width:'45px'}} className="text-decoration-none hover:text-violet-700">
              <img className='rounded-full' src={process.env.REACT_APP_BACKEND_FILE+e.user?.pp}
                alt="avatar 1" style={{height:'100%',width:'45px'}}/>
              </Link>
            </div>
          </div>

             {/* meditation ET priere */}
        <div style={{display:(e.typepublication!='meditation' && e.typepublication!='priere') && 'none'}} class=" mt-3 mb-4 flex flex-row justify-center items-center w-full">
    <div class="row d-flex align-items-center justify-content-center w-full">
        <div class=" w-full">
            <div class="card w-full">
                <div class="d-flex justify-content-between py-2">
                    <Link to={'/profile/'+e.user?.id} class="d-flex flex-row align-items-center text-decoration-none hover:text-violet-700"> <span style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+e.user?.pp})`,backgroundPosition:'center',backgroundSize:'cover'}} className="w-10 h-10 rounded-full"></span>
                        <div class="d-flex flex-column ml-2"> <span class="font-weight-bold text-sm">{e.user?.nom?.substring(0,30)} {e.user?.prenom?.substring(0,30)} </span> <small class="text-gray text-xs">{e.user?.pseudo?.substring(0,30)}</small> <small class="mr-2 text-xs ellipsis">{e.date}</small> </div>
                    </Link>
                    <div class="d-flex flex-row mt-1 justify-content-center align-items-center ellipsis"> 

                 <img onClick={()=>{more(e.id); setPublicationid(e.id); setIdprieremeditation(e.meditation ? e.meditation?.id : e.priere?.id)}} className='cursor-pointer' style={{height:'25px'}} src={morepicture} alt="" />
                    
                    </div>
                </div>
                {/* more  */}
                <div id={e.id+'more'} style={{transform:'scale(0)',transition:'all ease 0.6s'}} class="list-group shadow position-absolute top-16 w-full z-10 text-sm">
  <button type="button" class="list-group-item  bg-violet-700 text-white"></button>
  <button onClick={()=>{editmeditation();document.getElementById(e.id+'more').style.transform='scale(0)'}} style={{display:e.typepublication!='meditation' ? 'none' : (userstore?.data?.id==e.user?.id) ? 'flex' :'none'}} data-bs-toggle="modal" data-bs-target="#modifiermeditation" type="button" class="list-group-item list-group-item-action flex flex-row justify-start items-center gap-x-2"> <img style={{height:'25px'}} src={cacher}/>Modifier la meditation</button>
  <button onClick={()=>{editpriere();document.getElementById(e.id+'more').style.transform='scale(0)'}} style={{display:e.typepublication!='priere' ? 'none' : (userstore?.data?.id==e.user?.id) ? 'flex' :'none'}} data-bs-toggle="modal" data-bs-target="#modifiersujetpriere" type="button" class="list-group-item list-group-item-action flex flex-row justify-start items-center gap-x-2"> <img style={{height:'25px'}} src={cacher}/>Modifier le sujet de priere</button>
  <button style={{display:(userstore?.data?.id==e.user?.id || userstore?.data?.role=='admin' || userstore?.data?.id==apercugroupe?.data?.groupe?.admin_id) ? 'flex' : 'none'}} id={e.id+"supprimer"} onClick={()=>{agirPublication(e.id+'supprimer',e.id)}} type="button" class="list-group-item list-group-item-action flex flex-row justify-start items-center gap-x-2"> <img style={{height:'25px',}} src={supprimer}/>Supprimer la publication</button>
  {/* <button id={i+"signaler"} onClick={()=>{agirPublication(i+'signaler')}} type="button" class="list-group-item list-group-item-action flex flex-row justify-start items-center gap-x-2"> <img style={{height:'25px'}} src={signaler}/>Signaler la publication</button> */}
 
  {/* <button id={i+'bloquer'}  onClick={()=>{agirPublication(i+'bloquer')}} type="button" class="list-group-item list-group-item-action flex flex-row justify-start items-center gap-x-2"> <img style={{height:'25px'}} src={bloquer}/>Bloquer l'auteur</button>
  <button id={i+'retirer'}  onClick={()=>{agirPublication(i+'retirer')}} type="button" class="list-group-item list-group-item-action flex flex-row justify-start items-center gap-x-2"> <img style={{height:'25px'}} src={retirer}/>Retirer l'auteur comme ami(e)</button>
       */}
</div>
<div className="flex flex-col gap-y-2"><span className='text-xl font-bold text-violet-700 border-violet-700 border-2 px-2 rounded-lg text-center'><span style={{display:e.typepublication!='meditation' && 'none'}}>Méditation</span><span style={{display:e.typepublication!='priere' && 'none'}} >Sujet de prière </span>  </span><span><b><u><span style={{display:e.typepublication!='meditation' && 'none'}} className='font-bold'>THEME </span><span style={{display:e.typepublication!='priere' && 'none'}} className='font-bold'>CIBLE </span>: </u></b> &nbsp;{e.meditation?.theme} {e.priere?.cible}</span><span style={{display:e.typepublication!='meditation' && 'none'}} ><b className='font-bold'><u>LECTURE :</u></b> {e.meditation?.lecture} </span> <span><b><u><span style={{display:e.typepublication!='meditation' && 'none'}} className='font-bold'>Message d'exhortation </span><span style={{display:e.typepublication!='priere' && 'none'}} className='font-bold'>Sujet de prière </span> :</u></b> </span></div>
<p class=" pb-2"> {e.meditation?.message} {e.priere?.sujet}</p>
             
                <div class="p-2 w-full">
                  
                    {/* <hr> */}
                    <div className="flex flex-col justify-between items-start gap-y-2">
                       <div className='flex flex-row justify-between items-center text-xs w-full statpublication'><div><span id={e.meditation?.id+'likeamen'} style={{display:e.typepublication!='meditation' && 'none'}}>{e.meditation?.amen} Amen(s) &nbsp;</span><span id={e.priere?.id+'likepriere'} style={{display:e.typepublication!='priere' && 'none'}}>{e.priere?.priere} Prière(s) &nbsp;</span></div> <div className='flex flex-row justify-center items-center'><span> {e.meditation?.commentairemeditations?.length} {e.priere?.commentaireprieres?.length} Commentaire(s)&nbsp; </span> <span><img style={{height:'5px'}} src={point} alt="" /></span> &nbsp;<span>  {e.meditation?.partage} {e.priere?.partage} Partage(s)</span></div> </div>
                        <div class="d-flex flex-row justify-content-between align-items-center pereiconspub border-b border-b-1 w-full">
                          <button style={{backgroundColor:userstore && e.meditation?.likeur?.includes(userstore?.data?.id+',') ? 'rgb(109 40 217)' : 'white',color:userstore && e.meditation?.likeur?.includes(userstore?.data?.id+',') ? 'white' : 'black',display:e.typepublication!='meditation' && 'none'}} id={e.meditation?.id+'amen'} onClick={()=>{likeramen(e.meditation?.id,e.meditation?.amen)}}  className='flex flex-row justify-center items-center text-sm p-1 pl-2 rounded-xl gap-x-2 amenpub'><img id={e.meditation?.id+'iconamen'} className='amenpub' style={{height:'23px'}} src={userstore && e.meditation?.likeur?.includes(userstore.data.id+',') ? amenb : amenpicture} alt="" /> <span className='position-relative right-1 pr-2'>Amen</span> </button>
                          <button data-bs-toggle="modal" data-bs-target="#exampleModalPriere" style={{backgroundColor:userstore && e.priere?.likeur?.includes(userstore?.data?.id+',') ? 'rgb(109 40 217)' : 'white',color:userstore && e.priere?.likeur?.includes(userstore?.data?.id+',') ? 'white' : 'black',display:e.typepublication!='priere' && 'none'}} id={e.priere?.id+'priere'} onClick={()=>{likerjeprie(e.priere?.id,e.priere?.priere)}}  className='flex flex-row justify-center items-center text-sm p-1 pl-2 rounded-xl gap-x-2 amenpub'><img id={e.priere?.id+'iconpriere'}  className='amenpub' style={{height:'23px'}} src={userstore && e.priere?.likeur?.includes(userstore?.data?.id+',') ? amenb : amenpicture} alt="" /> <span className='position-relative right-1 text-nowrap pr-2'>Je prie</span> </button>
                          <Link to={'/mono-publication-groupe/'+e.id} className='flex flex-row justify-center items-center gap-x-2 text-sm p-1 px-4 rounded-xl commentpub'><img className='commentpub' style={{height:'19px'}} src={commenter} alt="" />Commenter</Link>
                          <button onClick={()=>{setPublicationid(e.id);setIdprieremeditation(e.meditation ? e.meditation?.id : e.priere?.id)}} data-bs-toggle="modal" data-bs-target="#exampleModalpartage" className='flex flex-row justify-center items-center gap-x-2 text-sm p-1 px-2 rounded-xl partagepub'><img className='partagepub' style={{height:'19px'}} src={partager} alt="" />Partager</button>
                        </div>
                       </div>
                    {/* <hr> */}
                    <div class="comments pt-3">
                       {e.meditation ? e.meditation?.commentairemeditations?.slice(0,2).map((c,iteration)=>{
                                              return  <div class="d-flex flex-row mb-2"> <img src={c.user?.pp && process.env.REACT_APP_BACKEND_FILE+c.user.pp} class="h-8 w-8 rounded-full"/>
                                              <div class="d-flex flex-column ml-2"> <Link to={'/profile/'+(c.user?.id ? c.user.id :'')} class="name namecomment text-decoration-none hover:text-violet-700 text-xs">{c.user?.nom && c.user.nom.substring(0,32)}</Link> <small class="comment-text">{c.commentaire.length>48 ? c.commentaire.substring(0,48)+'...' : c.commentaire}</small>
                                                  <div class="d-flex flex-row align-items-center status"> <small className='text-xs'>{c.date}</small> </div>
                                              </div>
                                          </div>
                                        
                                             }):
                                             
                                             e.priere?.commentaireprieres?.slice(0,2).map((c,iteration)=>{
                                              return  <div class="d-flex flex-row mb-2"> <img src={c.user?.pp && process.env.REACT_APP_BACKEND_FILE+c.user.pp} class="h-8 w-8 rounded-full"/>
                                              <div class="d-flex flex-column ml-2"> <Link to={'/profile/'+(c.user?.id ? c.user.id :'')} class="name namecomment text-decoration-none hover:text-violet-700 text-xs">{c.user?.nom && c.user.nom.substring(0,32)}</Link> <small class="comment-text">{c.commentaire.length>48 ? c.commentaire.substring(0,48)+'...' : c.commentaire}</small>
                                                  <div class="d-flex flex-row align-items-center status"> <small className='text-xs'>{c.date}</small> </div>
                                              </div>
                                          </div>
                                              })
                                             }
                       
                       <div class="comment-input flex flex-row cursor-pointer"> <Link to={'/mono-publication-groupe/'+e.id} className='w-full text-decoration-none cursor-pointer'><input readOnly={true}  type="text" style={{textIndent:'10px',fontSize:'small'}} placeholder='Placez votre commentaire' class="form-control focus:ring-violet-700"/></Link>
                          
                          </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div ref={messageEndRef}/>
{/* end meditation  */}

                </>
            })
        }
    </div>
              

          </div>
          <div class="card-footer text-muted d-flex justify-content-start align-items-center p-3">
            {/* options  */}
            <div className="h-0">
            <div id='optiongroupe' style={{top:'54%',height:'10rem',width:'16rem',transition:'all ease 0.6s',transform:'scale(0)'}} className='z-10 position-absolute p-3 shadow bg-gray-50 px-4 rounded-xl flex flex-col justify-center'>
              <ul className='text-sm flex flex-col gap-y-4'>
              <li onClick={()=>{setTheme(null); setLecture(null); setExhortation(null);document.getElementById('sendtheme').value=''; document.getElementById('sendlecture').value=''; document.getElementById('sendexhortation').value=''}} data-bs-toggle="modal" data-bs-target="#modalmeditation" data-whatever="@getbootstrap" className=' hover:bg-violet-700 hover:text-white hover:rounded-lg hover:p-1 cursor-pointer flex flex-row justify-start items-center gap-x-1'><img style={{height:'17px'}} src={meditationphoto}/>Rédiger une méditation</li>
              <li onClick={()=>{setCible(null); setSujetpriere(null); setPriere(null);document.getElementById('sendcible').value='';document.getElementById('sendsujetpriere').value=''}} data-bs-toggle="modal" data-bs-target="#modalpriere" data-whatever="@getbootstrap" className=' hover:bg-violet-700 hover:text-white hover:rounded-lg hover:p-1 cursor-pointer flex flex-row justify-start items-center gap-x-1'><img className='position-relative right-1' style={{height:'20px'}} src={dieu}/>Lancer un sujet de prière</li>
              {/* <li className='hover:bg-violet-700 hover:text-white hover:p-1 hover:rounded-lg hover:pl-2 cursor-pointer'><Link className='text-decoration-none hover:text-white flex flex-row justify-start items-center gap-x-1' to={'/priere'}><img className='position-relative right-1' style={{height:'20px'}} src={prier}/> Prière en direct</Link> </li> */}
               
              </ul>
            </div>
          </div>
          {/* endoptions  */}
           
           <div className="flex flex-row justify-center items-center w-full">
            <div style={{display:apercugroupe?.data?.groupe?.membre?.includes(userstore?.data?.id+',') ? 'none' : 'flex'}} className='text-sm'>Seuls les membres sont autorisés à envoyer des messages dans ce groupe.</div>
            <div style={{display:apercugroupe?.data?.groupe?.membre?.includes(userstore?.data?.id+',') ? 'flex' : 'none'}} class="w-full flex flex-row justify-center items-center gap-x-2 ">
            <img className='cursor-pointer h-12' onClick={optionGroupe} style={{height:'23px'}} src={menugroupe} alt="menu groupe foi chretienne" />
             <textarea id="sendsimplemessage" placeholder='Ecrire un message' onChange={(e)=>{setMessage(e.target.value)}} className='focus:border-violet-700 focus:border-1 focus:border-solid rounded-lg' cols={30} rows={2} name=""></textarea>
             <div className="flex flex-row items-center">
             <button onClick={sendMessage} type="button" style={{paddingTop:'',display:document.getElementById('sendsimplemessage')?.value?.trim().length>0 ? 'flex' : 'none'}}>
              <img style={{height:'30px'}} src={envoyer} alt="icon envoi groupe foi  chretienne" />
              </button>
              <ClipLoader color={'rgb(109 40 217)'}  loading={loading}  size={30}/>
             </div>
            </div>
           </div>

          </div>
        </div>

      </div>
    </div>

  </div>
</section>


      </> : <ApercuGroupeSkeleton/>
     }
      </div>
       
    </div>

   </div>

<BackToTop/>
<BottomBar/>


{/* modal meditation  */}
<div class="modal fade" id="modalmeditation" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Rédiger une méditation</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Entrer le thème du message :</label>
            <input maxLength={500} onChange={(e)=>{setTheme(e.target.value)}} type="text" class="form-control" placeholder='Exemple : Amour et Pardon' id="sendtheme"/>
          </div>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Entrer le verset biblique référence :</label>
           <textarea maxLength={1150} onChange={(e)=>{setLecture(e.target.value)}} className='w-full rounded-xl' placeholder="Exemple : Jean 14 v 15 : Si vous m'aimez, respectez mes commandements." name="" rows={2} id="sendlecture"></textarea>
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Message d'exhortation :</label>
            <textarea maxLength={5000} onChange={(e)=>{setExhortation(e.target.value)}} class="form-control" placeholder="Entrer le message d'exhortation ici" rows={8}  id="sendexhortation"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
        <button disabled={(exhortation!=null && exhortation?.trim()?.length>0) ? false : true} onClick={()=>{sendMeditation(); document.getElementById('optiongroupe').style.transform='scale(0)'}} data-bs-dismiss="modal" type="button" class="btn bg-violet-700 hover:bg-violet-600 text-white">Envoyer</button>
      </div>
    </div>
  </div>
</div>

{/* modal sujet de priere  */}
<div class="modal fade" id="modalpriere" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Rédiger un sujet de prière</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Entrer la cible de la prière :</label>
            <input maxLength={500} type="text" onChange={(e)=>{setCible(e.target.value)}} placeholder='Exemple : Prière pour ma soeur malade' class="form-control" id="sendcible"/>
          </div>
          
          <div class="form-group">
            <label for="message-text" class="col-form-label">Sujet de prière :</label>
            <textarea maxLength={5000} class="form-control" onChange={(e)=>{setSujetpriere(e.target.value)}} rows={10} placeholder='Exprimez-vous sur le sujet de prière. Quel est le but de votre sujet de prière ?' id="sendsujetpriere"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
        <button disabled={(sujetpriere!=null && sujetpriere?.trim()?.length>0) ? false : true} onClick={()=>{sendPriere(); document.getElementById('optiongroupe').style.transform='scale(0)'}} type="button" class="btn bg-violet-700 hover:bg-violet-600 text-white" data-bs-dismiss="modal" >Envoyer</button>
      </div>
    </div>
  </div>
</div>

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
        <button type="button" class="btn hover:bg-violet-600 bg-violet-700 text-white w-full" data-bs-dismiss="modal">Amen</button>
     
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

{/* modal liste des membres  */}
<div class="modal fade" id="modalmembre" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Les membres du groupe : </h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       
        <div className="h-full flex flex-row justify-center flex-wrap items-center gap-4 pb-24">
        {
           apercugroupe ? apercugroupe?.data?.groupe?.listemembre?.slice(0,apercugroupe?.data?.groupe?.listemembre?.length-1)?.map((e)=>{
                return <div style={{width:'300px'}} className='flex flex-row border-gray-300 border-1 px-4 py-2 rounded-lg gap-x-2'>
                <div style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+e?.pp})`,backgroundPosition:'center',backgroundSize:'cover'}} className='h-12 w-12 rounded-full'></div>
                <div className='flex flex-col justify-start gap-y-2 text-sm '>
                    <span className='font-bold'><a href={'/profile/'+e?.id} className='text-decoration-none hover:text-violet-600 text-violet-700 flex flex-col'><span>{e?.nom?.length>30 ? e?.nom.substring(0,30)+'...' : e?.nom}</span> <span style={{display:(apercugroupe?.data?.groupe?.admin_id==userstore?.data?.id) && 'none'}} className='text-black font-normal'>{e?.pseudo?.length>25 ? e?.pseudo.substring(0,25)+'...' : e?.pseudo}</span></a></span>
                    <span className='flex flex-row justify-start items-center gap-x-4 '>
                        <button style={{display:(apercugroupe?.data?.groupe?.admin_id!=userstore?.data?.id) && 'none'}} onClick={()=>{retirerMembre(e?.id,e?.id+'membre')}} className="btn bg-violet-700 text-white text-sm focus:bg-violet-600 hover:bg-violet-600" id={e?.id+'membre'}>Retirer du groupe</button>
                    </span>
                </div>
            </div>
            }) : <ClipLoader color={'rgb(109 40 217)'}  loading={true}  size={30}/>
        }
      </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
       
      </div>
    </div>
  </div>
</div>

{/* modal modifier meditation  */}
<div class="modal fade" id="modifiermeditation" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modifier la méditation</h5>
        <button onClick={()=>{setTheme(null);setLecture(null);setExhortation(null)}} type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      
        {
          meditation ? <>
            <div class="form-group">
            <label for="recipient-name" class="col-form-label">Thème du message :</label>
            <input ref={reftheme} onChange={(e)=>{setTheme(e.target.value)}} type="text" value={meditation?.theme && theme} class="form-control" placeholder='Exemple : Amour et Pardon' id="recipient-name"/>
          </div>
          
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Verset biblique référence :</label>
           <textarea ref={reflecture} onChange={(e)=>{setLecture(e.target.value)}} value={meditation?.lecture && lecture} className='w-full rounded-xl' placeholder="Exemple : Jean 14 v 15 : Si vous m'aimez, respectez mes commandements." name="" rows={2} ></textarea>
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Message d'exhortation :</label>
            <textarea onChange={(e)=>{setExhortation(e.target.value)}} ref={refexhortation} value={meditation?.message && exhortation} class="form-control" placeholder="Entrer le message d'exhortation ici" rows={8}  id="message-text"></textarea>
          </div>
          </> : <div className="w-full flex flex-row items-center justify-center"><ClipLoader color={'rgb(109 40 217)'}  loading={true}  size={30}/></div>
        }
       
      </div>
      <div class="modal-footer">
        <button onClick={()=>{setTheme(null);setLecture(null);setExhortation(null)}} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
        <button disabled={(exhortation!=null && exhortation?.trim().length>0) ? false : true} onClick={updatemeditation} type="button" class="btn bg-violet-700 hover:bg-violet-600 text-white" data-bs-dismiss="modal" >Modifier</button>
      </div>
    </div>
  </div>
</div>

{/* modal modifier sujet de priere  */}
<div class="modal fade" id="modifiersujetpriere" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modifier le sujet de prière</h5>
        <button onClick={()=>{setCible(null); setPriere(null)}} type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       
          {
            priere ? <>
            <div class="form-group">
            <label for="recipient-name" class="col-form-label">La cible de la prière :</label>
            <input onChange={(e)=>{setCible(e.target.value)}} type="text" placeholder='Exemple : Prière pour les voyageurs'  value={cible} class="form-control" id="recipient-name"/>
          </div>
          
          <div class="form-group">
            <label for="message-text" class="col-form-label">Sujet de prière :</label>
            <textarea onChange={(e)=>{setSujetpriere(e.target.value)}} class="form-control" rows={10} value={sujetpriere} placeholder='Exprimez-vous sur le sujet de prière. Quel est le but de votre sujet de prière ?' id="message-text"></textarea>
          </div>
            </> : <div className="w-full flex flex-row items-center justify-center"><ClipLoader color={'rgb(109 40 217)'}  loading={true}  size={30}/></div>
          }
    
      </div>
      <div class="modal-footer">
        <button onClick={()=>{setCible(null); setPriere(null)}} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
        <button onClick={updatepriere} disabled={(sujetpriere!=null && sujetpriere?.trim().length>0) ? false : true} data-bs-dismiss="modal" type="button" class="btn bg-violet-700 hover:bg-violet-600 text-white">Modifier</button>
      </div>
    </div>
  </div>
</div>

{/* modal inviter des personnes  */}
<div class="modal fade" id="modalinvitation" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Invitations : </h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      
        <div className="h-full flex flex-row justify-center flex-wrap items-center gap-4 pb-24">
        {
            apercugroupe?.data?.groupe?.invite?.map((e)=>{
                return <div style={{width:'300px',display:e?.id ? 'flex' : 'none'}} className='flex flex-row border-gray-300 border-1 px-4 py-2 rounded-lg gap-x-2'>
                <div style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+e?.pp})`,backgroundPosition:'center',backgroundSize:'cover'}} className='h-12 w-12 rounded-full'></div>
                <div className='flex flex-col justify-start gap-y-2 text-sm '>
                    <span className='font-bold'><a href={'/profile/'+e?.id} className='text-decoration-none hover:text-violet-600 text-violet-700'>{e?.nom?.length>25 ? e?.nom.substring(0,25)+'...' : e?.nom}</a></span><span className='text-xs'>{e?.pseudo?.length>25 ? e?.pseudo.substring(0,25)+'...' : e?.pseudo}</span>
                    <span className='flex flex-row justify-start items-center gap-x-4 '>
                        <button id={e?.id+'invitation'} onClick={()=>{sendInvitation(e?.id,e?.id+'invitation')}} className="btn bg-violet-700 text-white text-sm focus:bg-violet-600 hover:bg-violet-600">Inviter</button>
                    </span>
                </div>
            </div>
            })
        }
      </div>
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
       
      </div>
    </div>
  </div>
</div>

{/* modal delete simple message  */}
<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="deleteModalLabel">Confirmez la suppression</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="mb-0">Voulez-vous vraiment supprimer ce message ?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button onClick={deletesimplepost} type="button" class="btn btn-danger" data-bs-dismiss="modal" id="confirmDelete">Supprimer</button>
            </div>
        </div>
    </div>
</div>




    </>
}