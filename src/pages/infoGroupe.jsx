import { Header } from '../components/header';
import docta from '../images/docta.jpg';
import morepicture from '../icons/images/more.png';
import ok from '../icons/images/ok.png';
import group from '../icons/images/group.png';
import facebook from '../icons/images/facebook.png';
import whatsapp from '../icons/images/whatsapp.png';
import point from '../icons/images/point.png';
import coeur from '../icons/images/coeur.png';
import left from '../icons/images/left.png';
import { useContext, useEffect, useState } from 'react';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { tokenContexte } from '../contexte/tokenContexte';
import ClipLoader from 'react-spinners/ClipLoader';
import { userContexte } from '../contexte/userContexte';
export function InfoGroupe()
{
    const {token}=useContext(tokenContexte)
    const {userstore}=useContext(userContexte)
    const navigate=useNavigate()

    // affichage des infos du groupe 
    const {id}=useParams('id')
    const {data:infogroupe,isLoading}=useQuery({
      queryKey:['info-groupe'],
      queryFn:()=>token ? axios.get(`${process.env.REACT_APP_BACKEND_URL}/info-groupe/${id}`,{
        headers:{
          "Authorization": "Bearer "+token
        }
      }):navigate('/login')
    })


    const menuGroupe=()=>{
        if(document.getElementById('dropdowngroupe').style.top=='-20px'){
          document.getElementById('dropdowngroupe').style.top='-1000px';
        }
        else{
          document.getElementById('dropdowngroupe').style.top='-20px';
        }
      }

       // copy clipboard 
         const [textCopy, setTextCopy]=useState('texte a partager')
         const [statutCopy,setStatutCopy]=useState(false)
      
      // end copy 

      const signalerGroupe=()=>{
        toast('Signalement en cours...')
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/signaler-groupe`, {idgroupe},{
          headers:{
              "Authorization": "Bearer "+token
            }
      }).then((res)=>{
      if(res?.data?.statut=='200'){
        toast(res?.data?.message && res?.data?.message)
      }
        }).catch((err)=>{
        //  console.log(err)
        })
      }
      

      const quitterGroupe=()=>{
      toast('retrait en cours...')
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/quitter-groupe`, {idgroupe},{
          headers:{
              "Authorization": "Bearer "+token
            }
      }).then((res)=>{
      if(typeof(res.data?.statut)!=undefined && res.data?.statut==200){
      toast(res?.data?.message)
      }else{
         toast('Une erreur s\'est produit.')
      }
        }).catch((err)=>{
        //  console.log(err)
        })
      }

      // suppression du groupe 
        const queryClient=useQueryClient();
      const mutationsuppresion=useMutation({
        mutationFn:()=>{
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/supprimer-groupe`,{idgroupe},{
                headers:{
                  "Authorization": "Bearer "+token
                }
              })
        },
          onSuccess: () => {
            toast('Groupe supprimé')
            queryClient.invalidateQueries({ queryKey: ['info-groupe'] });
          },
          onError:()=>toast('Une erreur s\'est produite.')
      })

      const supprmerGroupe=()=>{
        toast('Suppression en cours...')
        mutationsuppresion.mutate()
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

      // modifier les infos du groupe 
      const [selectedImage, setSelectedImage]=useState()
      const [type, setType]=useState()
      const [nom, setNom]=useState()
      const [categorie ,setCategorie]=useState()
      const [objectif, setObjectif]=useState()
      const [photo, setPhoto]=useState(null)
      const [sizephoto, setSizephoto]=useState(0)

      const mutationupdategroupe=useMutation({
        mutationFn:()=>{
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/update-groupe`,{photo,idgroupe,type,nom,categorie,objectif},{
                headers:{
                  "Authorization": "Bearer "+token,
                  "Content-type": "multipart/form-data",
                }
              })
        },
          onSuccess: () => {
            toast('Modifications réussies')
            queryClient.invalidateQueries({ queryKey: ['info-groupe'] });
          },
          onError:()=>toast('Une erreur s\'est produite.')
      })

      const updateGroupe=()=>{
        toast('Modifications en cours...')
        mutationupdategroupe.mutate()
      }

      const openModalUpdate=()=>{
        setPhoto(null)
        document.getElementById('photogroupeinput').value=null
        setSelectedImage(process.env.REACT_APP_BACKEND_FILE+infogroupe?.data?.groupe?.photo)
        setType(infogroupe?.data?.groupe?.type)
        setNom(infogroupe?.data?.groupe?.nom)
        setCategorie(infogroupe?.data?.groupe?.categorie)
        setObjectif(infogroupe?.data?.groupe?.objectif)
      }

      useEffect(()=>{
      if(photo!=null && typeof(photo)!=undefined){
        if(document.getElementById('photogroupeinput')?.files[0]){
          setSizephoto(document.getElementById('photogroupeinput')?.files[0]['size'])
        }
      }
      },[photo])

    return <>
      <ToastContainer/>
   <div className="flex flex-col justify-center items-center w-full">
    <Header/>
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
        <div className=' flex flex-col items-start divgauche'> <DivGauche/> </div>
      <div className="w-3/4 px-2 h-full flex flex-col items-center justify-center nouvelledivdroite">
    
    
        <header className="w-full px-4 flex flex-row justify-between items-center mb-3"> <span onClick={()=>{navigate(-1)}} className='cursor-pointer'><img style={{height:'20px'}} src={left} alt="" /></span><span style={{display:((infogroupe?.data?.statut && infogroupe?.data?.statut=='404') || (infogroupe?.data?.groupe?.admin_id!=userstore?.data?.id)) && 'none'}}><img onClick={()=>{menuGroupe();openModalUpdate()}} className='cursor-pointer' style={{height:'30px'}} src={morepicture} alt="menu foi chretienne groupe" /></span> </header>
        <div className="w-full h-0">
            <div id='dropdowngroupe' style={{top:'-1000px',height:'3rem',width:'11rem',transition:'all ease 0.4s'}} className='float-right z-10 position-relative right-3 p-3 shadow bg-gray-50 px-4 rounded-xl flex flex-row justify-center items-center'>
              <ul className='text-sm flex flex-col gap-y-3'>
                <li data-bs-toggle="modal" data-bs-target="#modalinfos" data-whatever="@getbootstrap" className='hover:bg-violet-700 hover:text-white hover:p-1 hover:rounded-lg hover:pl-2 cursor-pointer'>Modifier les infos</li>  
              </ul>
            </div>
          </div>
          
        <div style={{display:(infogroupe?.data?.statut && infogroupe?.data?.statut=='404') && 'none'}} className="w-full flex flex-col gap-y-4 items-center mb-24 px-1">
            <div className=" w-full flex flex-col items-center gap-y-4">
                <div className='h-32 w-32 rounded-full hover:scale-105 hover:duration-700' style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+infogroupe?.data?.groupe?.photo})`,backgroundPosition:'center',backgroundSize:'cover'}}></div>
                <div className='flex flex-col items-center'><span className='font-bold text-violet-700'>{infogroupe?.data?.groupe?.nom}</span> <span className='text-xs'>{infogroupe?.data?.groupe?.membre?.split(",")?.length>0 ? infogroupe?.data?.groupe?.membre?.split(",")?.length-1 : 0} membre(s)</span> <span className="text-xs">Groupe {infogroupe?.data?.groupe?.type=='prive' ? 'privé' : 'public'}</span> <span className="text-xs">Crée le {infogroupe?.data?.groupe?.date}</span> </div>
                <div><span className='font-bold text-violet-700'>Catégorie : </span>{infogroupe?.data?.groupe?.categorie?.toUpperCase()}</div>
                <div className='text-center'><span className='font-bold text-violet-700'>admin : </span>{infogroupe?.data?.groupe?.user?.nom?.substring(0,40)} {infogroupe?.data?.groupe?.user?.prenom?.substring(0,30)} </div>
                <div style={{display:infogroupe?.data?.groupe?.like==0 && 'none'}} className='flex flex-row justify-center items-center gap-x-1'><img style={{height:'15px'}} src={coeur} alt="" /> : {infogroupe?.data?.groupe?.like}</div>
                <p className='text-start flex-wrap'><span className='font-bold text-violet-700 underline'>Objectif :</span> {infogroupe?.data?.groupe?.objectif} </p>
            </div>
            <div className='w-full flex flex-col items-start gap-y-6 mt-4 border-t-2 border-t-gray-300 border-solid pt-4'>
                {/* <div data-bs-toggle="modal" data-bs-target="#modaladhesion" data-whatever="@getbootstrap" className='flex flex-row justify-center items-center gap-x-2'><span><img style={{height:'10px'}} src={point} alt="" /></span> <span><Link className='text-decoration-none hover:text-violet-700'>Demandes d'adhésion (+100)</Link></span></div> */}
                <div data-bs-toggle="modal" data-bs-target="#modalmembre" data-whatever="@getbootstrap" className='flex flex-row justify-center items-center gap-x-2'><span><img style={{height:'10px'}} src={point} alt="" /></span> <span><Link className='text-decoration-none hover:text-violet-700'>Voir les membres</Link></span></div>
                <div data-bs-toggle="modal" data-bs-target="#modalinvitation" data-whatever="@getbootstrap" className='flex flex-row justify-center items-center gap-x-2'><span><img style={{height:'10px'}} src={point} alt="" /></span> <span><Link className='text-decoration-none hover:text-violet-700'>Inviter d'autres personnes</Link></span></div>
                <div className='flex flex-row justify-center items-center gap-x-2'><span><img style={{height:'10px'}} src={point} alt="" /></span> <span className='flex flex-row justify-center items-center gap-x-1'><span className='text-decoration-none hover:text-violet-700'>Copier le lien du groupe</span>
                   <CopyToClipboard text={'https://foichretienne.org/mono-groupe/'+infogroupe?.data?.groupe?.id+'/'+infogroupe?.data?.groupe?.cle}
                     onCopy={() => setStatutCopy(!statutCopy)}>
                     <button style={{backgroundColor:'rgb(109 40 217)',paddingLeft:'10px',paddingRight:'10px',borderRadius:'5px',color:'white'}}>{statutCopy ? <span className='text-small' style={{color: 'red',fontSize:'small',flexWrap:'nowrap',width:'100%'}}> <img src={ok} style={{height:'25px'}} alt="" /> </span> : 'Copier'}</button>
                   </CopyToClipboard>
                   </span>
                </div>
                <div data-bs-toggle="modal" data-bs-target="#modalpartage" data-whatever="@getbootstrap" className='flex flex-row justify-center items-center gap-x-2'><span><img style={{height:'10px'}} src={point} alt="" /></span> <span><Link className='text-decoration-none hover:text-violet-700'>Partager le lien</Link></span></div>
                
            </div>

            <div className='w-full flex flex-col items-start gap-y-6 mt-4 border-t-2 border-t-gray-300 border-solid pt-4'>
                <div data-bs-toggle="modal" data-bs-target="#signalerModal" className='flex flex-row justify-center items-center gap-x-2'><span><img style={{height:'10px'}} src={point} alt="" /></span> <span><Link className='text-decoration-none hover:text-violet-700'>Signaler le groupe</Link></span></div>
                <div style={{display:infogroupe?.data?.groupe?.membre?.includes(userstore?.data?.id+',') ? 'flex' : 'none'}} data-bs-toggle="modal" data-bs-target="#quitterModal" className='flex flex-row justify-center items-center gap-x-2'><span><img style={{height:'10px'}} src={point} alt="" /></span> <span><Link className='text-decoration-none hover:font-bold hover:text-red-600 text-red-700'>Quitter le groupe</Link></span></div>
                <div style={{display:(infogroupe?.data?.groupe?.admin_id!=userstore?.data?.id) && 'none'}} data-bs-toggle="modal" data-bs-target="#supprimerModal" className='flex flex-row justify-center items-center gap-x-2'><span><img style={{height:'10px'}} src={point} alt="" /></span> <span><Link className='text-decoration-none hover:font-bold hover:text-red-600 text-red-700'>Supprmer le groupe</Link></span></div>
                
            </div>

        </div>
        
        
    
      

      </div>
       
    </div>

   </div>

<BackToTop/>
<BottomBar/>

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
           infogroupe ? infogroupe?.data?.groupe?.listemembre?.slice(0,infogroupe?.data?.groupe?.listemembre?.length-1)?.map((e)=>{
                return <div style={{width:'300px'}} className='flex flex-row border-gray-300 border-1 px-4 py-2 rounded-lg gap-x-2'>
                <div style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+e?.pp})`,backgroundPosition:'center',backgroundSize:'cover'}} className='h-12 w-12 rounded-full'></div>
                <div className='flex flex-col justify-start gap-y-2 text-sm '>
                    <span className='font-bold'><a href={'/profile/'+e?.id} className='text-decoration-none hover:text-violet-600 text-violet-700 flex flex-col'><span>{e?.nom?.length>30 ? e?.nom.substring(0,30)+'...' : e?.nom}</span> <span style={{display:(infogroupe?.data?.groupe?.admin_id==userstore?.data?.id) && 'none'}} className='text-black font-normal'>{e?.pseudo?.length>25 ? e?.pseudo.substring(0,25)+'...' : e?.pseudo}</span></a></span>
                    <span className='flex flex-row justify-start items-center gap-x-4 '>
                        <button style={{display:(infogroupe?.data?.groupe?.admin_id!=userstore?.data?.id) && 'none'}} onClick={()=>{retirerMembre(e?.id,e?.id+'membre')}} className="btn bg-violet-700 text-white text-sm focus:bg-violet-600 hover:bg-violet-600" id={e?.id+'membre'}>Retirer du groupe</button>
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
            infogroupe?.data?.groupe?.invite?.map((e)=>{
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

{/* modal partage lien du groupe */}
<div class="modal fade h-full" id="modalpartage" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        <div class="d-flex flex-column ml-2"> <span class="font-weight-bold text-sm">{userstore?.data?.nom?.substring(0,25)}</span>
                        <span className='text-sm'> {userstore?.data?.pseudo?.substring(0,30) } </span> </div>
                    </span>
          </div>

         <div className="w-full flex flex-col justify-center items-start gap-y-8">
            <div className='flex flex-col items-start gap-y-1.5'><span className='text-sm font-bold'>Copier le lien de la publication</span>
            {/* lien publication  */}
            <span>
                
<div style={{width:'100%',flexWrap:'wrap'}} class=" gap-2 w-full flex flex-row">
    <CopyToClipboard text={'https://foichretienne.org/mono-groupe/'+infogroupe?.data?.groupe?.id+'/'+infogroupe?.data?.groupe?.cle}
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
              <a target="_blank" href={'https://wa.me/?text=https://foichretienne.org/mono-groupe/'+infogroupe?.data?.groupe?.id+'/'+infogroupe?.data?.groupe?.cle}> <span className='flex flex-col justify-center items-center'><span style={{backgroundImage:`url(${whatsapp})`,backgroundPosition:'center',backgroundSize:'cover'}} className='h-10 w-10 rounded-full'></span><span className='text-xs w-16 text-center'>WhatsApp</span></span></a>
              
               <div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="" data-size="">
               <a target="_blank" href={"https://www.facebook.com/sharer/sharer.php?u=https://foichretienne.org/mono-groupe/"+infogroupe?.data?.groupe?.id+'/'+infogroupe?.data?.groupe?.cle+";src=sdkpreparse"} className='text-decoration-none hover:text-violet-700 fb-xfbml-parse-ignore'> <span className='flex flex-col justify-center items-center'><span style={{backgroundImage:`url(${facebook})`,backgroundPosition:'center',backgroundSize:'cover'}} className='h-10 w-10 rounded-full'></span><span className='text-xs w-16 text-center'>Facebook</span></span></a>
               </div>
           
            </span>
            </div>

         </div>
      </div>
   
     
    
    </div>
  </div>
</div>

{/* modal modifier les infos  */}
<div class="modal fade" id="modalinfos" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modifier les infos du groupe</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
        <div class="form-group">
            <label for="portee" class="col-form-label">La portée du groupe :</label>
              <ul id='portee' className='pl-3'>
                <li>public <input type="checkbox" onClick={()=>{setType(type=='public' ? 'prive' : 'public')}} checked={type=='public' ? true : false}/></li>
                <li>privée <input type="checkbox" onClick={()=>{setType(type=='public' ? 'prive' : 'public')}} checked={type=='prive' ? true : false}/></li>
              </ul>
          </div>

        <div class="form-group">
            <label for="photogroupeinput" class="col-form-label">Photo du groupe :</label>
            <div className="flex flex-row justify-center items-center"> <input type="file" accept='image/*' onChange={(e)=>{const file=e.target.files?.[0]; setSelectedImage(file ? URL.createObjectURL(file) : undefined);setPhoto(e.target.files[0])}} class="form-control z-30 opacity-0" id="photogroupeinput" /> <span style={{right:'80%'}} className='position-relative'><img style={{height:'40px'}} src={selectedImage} alt="" /></span> </div>
            <span className="text-red-700 text-sm">{(sizephoto/1048576)>5 && 'La taille de votre photo ne doit pas dépasser 05 mégas !'}</span>
          </div>

          <div class="form-group">
            <label for="groupe-name" class="col-form-label">Nom du groupe :</label>
            <input type="text" class="form-control" id="groupe-name" onChange={(e)=>{setNom(e.target.value)}} value={nom && nom}/>
          </div>

          <div class="form-group">
            <label for="categorie" class="col-form-label">Catégorie du groupe :</label>
            <select onChange={(e)=>{setCategorie(e.target.value)}} id='categorie' class="form-select" aria-label="Default select example">
            <option selected={categorie=='etude biblique' ? true : false} value='etude biblique' >ETUDE BIBLIQUE</option>
               <option selected={categorie=='priere et meditation' ? true : false} value="priere et meditation">PRIERE ET MEDITATION</option>
               <option selected={categorie=='adoration et louange' ? true : false} value="adoration et louange">ADORATION ET LOUANGE</option>
               <option  selected={categorie=='autre' ? true : false} value="autre">AUTRE</option>
           </select>
          </div>

          <div class="form-group">
            <label for="message-text" class="col-form-label">Objectif :</label>
            <textarea rows={8} onChange={(e)=>{setObjectif(e.target.value)}} class="form-control" id="message-text" value={objectif && objectif}></textarea>
          </div>
          <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
        <button disabled={((sizephoto/1048576<=5) && nom?.trim()?.length>0 && objectif?.trim()?.length>0) ? false : true} onClick={updateGroupe} type="button" class="btn bg-violet-700 text-white hover:bg-violet-600 focus:bg-violet-700" data-bs-dismiss="modal">Modifier</button>
      </div>
        </form>
      </div>
     
    </div>
  </div>
</div>

{/* modal signaler  */}
<div class="modal fade" id="signalerModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="deleteModalLabel">Confirmer</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="mb-0">Voulez-vous vraiment signaler ce groupe ?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button onClick={signalerGroupe} type="button" class="btn btn-danger" data-bs-dismiss="modal" id="confirmDelete">Signaler</button>
            </div>
        </div>
    </div>
</div>

{/* modal quitter groupe  */}
<div class="modal fade" id="quitterModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="deleteModalLabel">Confirmer</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="mb-0">Voulez-vous vraiment quitter ce groupe ?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button onClick={quitterGroupe} type="button" class="btn btn-danger" data-bs-dismiss="modal" id="confirmDelete">Quitter</button>
            </div>
        </div>
    </div>
</div>

{/* supprimer le groupe (par l'admin) */}
<div class="modal fade" id="supprimerModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="deleteModalLabel">Confirmer</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="mb-0">Voulez-vous vraiment supprimer ce groupe ? Cette action est irréversible !</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button onClick={supprmerGroupe} type="button" class="btn btn-danger" data-bs-dismiss="modal" id="confirmDelete">Supprimer</button>
            </div>
        </div>
    </div>
</div>


    </>
}