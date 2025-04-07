import { Header } from '../components/header';
import groupepardefaut from '../images/groupe.svg';
import point from '../icons/images/point.png';
import coeur from '../icons/images/coeur.png';
import coeurv from '../icons/images/coeurv.png';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import plus from '../icons/images/plus.png';
import voirPlus from '../icons/images/right.png';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { tokenContexte } from '../contexte/tokenContexte';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { userContexte } from '../contexte/userContexte';
import { MesGroupeSkeleton } from '../skeletons/mesgroupes';
import { Quelquegroupe } from '../skeletons/quelquegroupe';
import { LesGroupeSkeleton } from '../skeletons/lesgroupes';
import { ToastContainer, toast } from 'react-toastify';
export function Groupes()
{
   const {token}=useContext(tokenContexte)
   const navigate=useNavigate()


   // liker un de mes groupes
   const likermesgroupes=(id,c)=>{
    if(document.getElementById(id+'iconcoeursuggestion').src==coeur){
      document.getElementById(id+'iconcoeursuggestion').src=coeurv
       document.getElementById(id+'iconcoeursuggestion').style.transform='scale(1.2)'
    }else{
      document.getElementById(id+'iconcoeursuggestion').src=coeur
       document.getElementById(id+'iconcoeursuggestion').style.transform='scale(1)'
    }
  
  }

   // liker un groupe suggestion
   const likeramensuggestion=(id,c)=>{
    if(document.getElementById(id+'iconcoeursuggestion'+c).src==coeur){
      document.getElementById(id+'iconcoeursuggestion'+c).src=coeurv
       document.getElementById(id+'iconcoeursuggestion'+c).style.transform='scale(1.2)'
    }else{
      document.getElementById(id+'iconcoeursuggestion'+c).src=coeur
       document.getElementById(id+'iconcoeursuggestion'+c).style.transform='scale(1)'
    }
  
  }
      
    const tab=['','','','','','']
    const categories=['etude biblique','priere et Meditation','louange et adoration','autres']
    const [selectedImage, setSelectedImage]=useState(groupepardefaut)
    const [portee, setPortee]=useState(true)
    const {userstore}=useContext(userContexte)
    const {data:mesgroupesauth,isLoading}=useQuery({
     queryKey:['mes-groupes'],
     queryFn:()=> token && axios.get(`${process.env.REACT_APP_BACKEND_URL}/mes-groupes`,{
      headers:{
        "Authorization": "Bearer "+token
      }
    })
   })
  
   const queryClient=useQueryClient();
   const mutationlikegroupe=useMutation({
    mutationFn:(id)=>{
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/like-groupe`,{id},{
            headers:{
              "Authorization": "Bearer "+token
            }
          })
    },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['mes-groupes'] });
        queryClient.invalidateQueries({ queryKey: ['les-groupes'] });
      },
  })

  // les groupes 

  const {data:lesgroupes,isLoading:loadlesgroupes}=useQuery({
    queryKey:['les-groupes'],
    queryFn:()=> token ? axios.get(`${process.env.REACT_APP_BACKEND_URL}/les-groupes`,{
      headers:{
        "Authorization": "Bearer "+token
      }
   }) :axios.get(`${process.env.REACT_APP_BACKEND_URL}/les-groupes-guest`)
  
  })

   const like=(id,idcoeur)=>{
    if(document.getElementById(idcoeur).src==coeur){
      document.getElementById(idcoeur).src=coeurv
    }else{
      document.getElementById(idcoeur).src=coeur
    }
   mutationlikegroupe.mutate(id)
   
  }

  const rejoindre=(id,idbouton)=>{
    document.getElementById(idbouton).textContent='encours d\'adhésion...'
   axios.post(`${process.env.REACT_APP_BACKEND_URL}/rejoindre-groupe`, {id},{
       headers:{
           "Authorization": "Bearer "+token
         }
   }).then((res)=>{
       if(res.data.statut=='200'){
        document.getElementById(idbouton).textContent='Vous êtes membres'
    
       }else{
        document.getElementById(idbouton).textContent='Vous êtes deja membres'
       }
     })
   
 }

//  creer un groupe 
const [nom, setNom]=useState(null)
const [type, setType]=useState('public')
const [categorie, setCategorie]=useState('etude biblique')
const [objectif, setObjectif]=useState(null)
const [photo, setPhoto]=useState(null)
const [sizephoto, setSizephoto]=useState(0)

const texteobjectifgroupe=useRef()
const textenomgroupe=useRef()
const modalcreergroupe=()=>{
  setPhoto(null)
  document.getElementById('photogroupeinput').value=null
  setNom(null)
  setType('public')
  setPortee(true)
  setObjectif(null)
 texteobjectifgroupe.current.value=null
 textenomgroupe.current.value=null
}

useEffect(()=>{
  if(portee){
    setType('public')
  }else{
    setType('prive')
  }
},[portee])

// const mutationcreergroupe=useMutation({
//   mutationFn:()=>{
//       axios.post(`${process.env.REACT_APP_BACKEND_URL}/creer-groupe`,{nom,type,categorie,objectif,photo},{
//           headers:{
//             "Authorization": "Bearer "+token,
//             "Content-type": "multipart/form-data",
//           }
//         })
//   },
//     onSuccess: () => {
//       // console.log(mutationcreergroupe)
//       // queryClient.invalidateQueries({ queryKey: ['mes-groupes'] });
//       // toast('Groupe crée avec succes')
//       navigate('/verification-groupe')
//     },
//     onError:()=>navigate('/login')
// })

const creerGroupe=()=>{
  toast('Un instant. Création du groupe encours...')
  token ?  axios.post(`${process.env.REACT_APP_BACKEND_URL}/creer-groupe`,{nom,type,categorie,objectif,photo},{
    headers:{
      "Authorization": "Bearer "+token,
      "Content-type": "multipart/form-data",
    }
}).then((res)=>{
    if(res.data.statut=='200'){
    navigate('/verification-groupe')

    }else if(res.data.statut=='403'){
      toast('votre groupe contient des termes interdits')
   
    }else if(res.data.statut=='202'){
      toast('Groupe crée avec succes')
   
    }
  }).catch((err)=>{
  // console.log(err)
  }) : navigate('/login')
 
}
// taille de image groupe 
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

      <div className='text-center bg-white p-4 font-italic w-full rounded-lg psaume -mt-2'>Si deux d'entre vous s'accordent sur la terre pour demander quoi que ce soit, cela leur sera donné par mon Père qui est dans les cieux. Car là où deux ou trois sont assemblés en mon nom, je suis au milieu d'eux.<br/><br/><span className="bg-violet-700 text-white p-1 rounded-lg px-3 font-bold">Matthieu 18 : 19-20</span></div>
      <Link style={{display:!token && 'none'}} onClick={modalcreergroupe} data-bs-toggle="modal" data-bs-target="#modalcreergroupe" data-whatever="@getbootstrap" className="text-center bg-white p-1 rounded-2xl text-decoration-none flex flex-row justify-center items-center mb-2 hover:text-violet-700 hover:scale-105 hover:duration-700 w-3/4 m-3"><img style={{height:'20px'}} src={plus} alt="" /> &nbsp;Créer un groupe</Link>
      <Link style={{display:token && 'none'}} data-bs-toggle="modal" data-bs-target="#exampleModalGuest" data-whatever="@getbootstrap" className="text-center bg-white p-1 rounded-2xl text-decoration-none flex flex-row justify-center items-center mb-2 hover:text-violet-700 hover:scale-105 hover:duration-700 w-3/4 m-3"><img style={{height:'20px'}} src={plus} alt="" /> &nbsp;Créer un groupe</Link>
      <div style={{display:(!token || mesgroupesauth?.data?.mesgroupes?.length==0) && 'none'}} className="flex flex-row justify-between items-center w-11/12 text-xs mb-2 px-"> <span>Mes groupes</span><Link to={'/mes-groupes'} className='flex flex-row justify-center items-center gap-x-1 text-decoration-none hover:text-violet-700'>Voir plus <img style={{height:'10px'}} src={voirPlus} alt="" /></Link> </div>
      <div style={{display:!token && 'none'}} className='h-full w-11/12 flex flex-row justify-between flex-nowrap items-center gap-x-4 pb-3 border-b-2 border-b-gray-300 overflow-x-auto px-1 groupeoverflow'>
      {
           mesgroupesauth ? mesgroupesauth?.data?.mesgroupes?.map((c,i)=>{
                return <div style={{width:'18rem',height:'auto'}}>
              <div style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+c.photo})`,backgroundPosition:'center',backgroundSize:'cover',height:'12rem'}}></div>
                <div style={{width:'18rem',height:'16rem'}} class="card-body bg-white flex flex-col justify-between">
                  <h5 class="card-title font-bold text-violet-700">{c.nom.length>50 ? c.nom.substr(0,50)+'...' : c.nom}</h5>
                  <p class="card-text gap-y-2 flex flex-col"><span><span className=" text-violet-700">Objectif du groupe :</span>{c.objectif.length>60 ? c.objectif.substr(0,60)+'...' : c.objectif}</span> <span className="text-xs text-gray-700 flex flex-row start items-center "> <span> {c.membre.split(",").length-1} membres&nbsp; </span> <span><img style={{height:'5px'}} src={point} alt="" /></span> &nbsp;<span className='flex flex-row justify-center items-center gap-x-1'>  <img style={{height:'10px'}} src={coeur} alt="" />{c.like}</span> </span>  <span className='text-xs mb-1'>Crée par {c.user?.nom?.toUpperCase()}</span> </p>
                 <div className="flex flex-row justify-center items-center gap-x-2">
                 <img id={'coeur'+c.id} onClick={()=>{like(c.id,'coeur'+c.id)}} className='amenpub position-relative top-1 cursor-pointer' style={{height:'26px',transition:'all ease 0.6s'}} src={userstore && c.likeur?.includes(userstore?.data?.id+',') ? coeurv : coeur} alt="" />
                 <Link to={'/groupe/'+c.id} class="btn bg-violet-700 text-white w-full mt-1 hover:bg-violet-600 focus:bg-violet-600">Apercu <span className='text-xs font-bold'></span></Link>
                 </div>
                </div>
              </div>
            }): <Quelquegroupe/>
        }
</div>

{/* suggestion de groupes  */}
<p className="text-center text-xl text-violet-700 px-2 rounded-lg mt-3">Suggestion de groupes par catégorie :</p>
<div className="h-full w-11/12 groupeoverflow pb-24">
{
   ( lesgroupes && token) ? Object.keys(lesgroupes?.data?.lesgroupes).map((c,i)=>{
        return <>
        <div style={{display:lesgroupes?.data?.lesgroupes[c].length==0 && 'none'}} className="flex flex-row justify-between items-center w-full text-xs my-2 px-2 font-bold">{c.toUpperCase()} <span className='font-bold'></span><Link to={'/les-groupes/'+c} className='flex flex-row justify-center items-center gap-x-1 text-decoration-none hover:text-violet-700 text-violet-700'>Voir plus <img style={{height:'10px'}} src={voirPlus} alt="" /></Link> </div>
      <div className='h-full w-full flex flex-row justify-between flex-nowrap items-center gap-x-4 pb-3 mb-3 border-b-2 border-b-gray-300 overflow-x-auto px-1 groupeoverflow'>
      {
            lesgroupes?.data?.lesgroupes[c].map((e,i)=>{
                return !e.membre?.includes(userstore?.data?.id+",") && <div class="" style={{width:'18rem',height:'auto',display:e.membre?.includes(userstore?.data?.id+",") && 'none'}}>
               <div style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+e.photo})`,backgroundPosition:'center',backgroundSize:'cover',height:'12rem'}}></div>
               <div style={{width:'18rem',height:'16rem'}} class="card-body bg-white flex flex-col justify-between">
                <h5 class="card-title font-bold text-violet-700">{e.nom?.length>50 ? e.nom?.substr(0,50)+'...' : e?.nom}</h5>
                <p class="card-text gap-y-2 flex flex-col"><span><span className=" text-violet-700">Objectif du groupe :</span> {e.objectif.length>60 ? e.objectif.substr(0,60)+'...' : e.objectif}</span> <span className="text-xs text-gray-700 flex flex-row start items-center "> <span> {e.membre.split(",").length-1} membres&nbsp; </span> <span><img style={{height:'5px'}} src={point} alt="" /></span> &nbsp;<span className='flex flex-row justify-center items-center gap-x-1'>  <img style={{height:'10px'}} src={coeur} alt="" />{e.like}</span> </span>  <span className='text-xs mb-1'>Crée par {e.user?.nom?.toUpperCase().substr(0,20)}</span> </p>
                  <span className="flex flex-row gap-x-3">
                  <img id={'coeur'+e.id} onClick={()=>{like(e.id,'coeur'+e.id)}} className='amenpub position-relative top-2 cursor-pointer' style={{height:'26px',transition:'all ease 0.6s'}} src={userstore && e.likeur?.includes(userstore?.data?.id+',') ? coeurv : coeur} alt="" />
                 <Link id={'rejoindre'+e.id} onClick={()=>{rejoindre(e.id, 'rejoindre'+e.id)}} class="btn focus:bg-violet-600 bg-violet-700 text-white mt-1 hover:bg-violet-600 text-xs">Rejoindre</Link>
                 <Link to={'/groupe/'+e.id} class="btn bg-gray-300 mt-1 hover:bg-gray-200 hover:text-violet-700 text-xs">Apercu</Link>
                 </span>
                </div>
              </div>
            })
        }
</div>
        </>
    }) :(lesgroupes && !token) ? 
    // guest 
    Object.keys(lesgroupes?.data?.lesgroupes).map((c,i)=>{
      return <>
      <div style={{display:lesgroupes?.data?.lesgroupes[c].length==0 && 'none'}} className="flex flex-row justify-between items-center w-full text-xs my-2 px-2 font-bold">{c.toUpperCase()} <span className='font-bold'></span><Link data-bs-toggle="modal" data-bs-target="#exampleModalGuest" data-whatever="@getbootstrap" className='flex flex-row justify-center items-center gap-x-1 text-decoration-none hover:text-violet-700 text-violet-700'>Voir plus <img style={{height:'10px'}} src={voirPlus} alt="" /></Link> </div>
    <div className='h-full w-full flex flex-row justify-between flex-nowrap items-center gap-x-4 pb-3 mb-3 border-b-2 border-b-gray-300 overflow-x-auto px-1 groupeoverflow'>
    {
          lesgroupes?.data?.lesgroupes[c].map((e,i)=>{
              return <div class="" style={{width:'18rem',height:'auto'}}>
             <div style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+e.photo})`,backgroundPosition:'center',backgroundSize:'cover',height:'12rem'}}></div>
             <div style={{width:'18rem',height:'16rem'}} class="card-body bg-white flex flex-col justify-between">
              <h5 class="card-title font-bold text-violet-700">{e.nom?.length>50 ? e.nom?.substr(0,50)+'...' : e?.nom}</h5>
              <p class="card-text gap-y-2 flex flex-col"><span><span className=" text-violet-700">Objectif du groupe :</span> {e.objectif.length>60 ? e.objectif.substr(0,60)+'...' : e.objectif}</span> <span className="text-xs text-gray-700 flex flex-row start items-center "> <span> {e.membre.split(",").length-1} membres&nbsp; </span> <span><img style={{height:'5px'}} src={point} alt="" /></span> &nbsp;<span className='flex flex-row justify-center items-center gap-x-1'>  <img style={{height:'10px'}} src={coeur} alt="" />{e.like}</span> </span>  <span className='text-xs mb-1'>Crée par {e.user?.nom?.toUpperCase().substr(0,20)}</span> </p>
                <span className="flex flex-row gap-x-3">
                <img data-bs-toggle="modal" data-bs-target="#exampleModalGuest" data-whatever="@getbootstrap" className='amenpub position-relative top-2 cursor-pointer' style={{height:'26px',transition:'all ease 0.6s'}} src={coeur} alt="" />
               <Link data-bs-toggle="modal" data-bs-target="#exampleModalGuest" data-whatever="@getbootstrap"  class="btn focus:bg-violet-600 bg-violet-700 text-white mt-1 hover:bg-violet-600 text-xs">Rejoindre</Link>
               <Link to={'/groupe/'+e.id} class="btn bg-gray-300 mt-1 hover:bg-gray-200 hover:text-violet-700 text-xs">Apercu</Link>
               </span>
              </div>
            </div>
          })
      }
</div>
      </>
  })  :
    
    <LesGroupeSkeleton/>
}
<Link to={'/envoyer-suggestion'} className='mt-2 text-sm text-violet-700 underline hover:text-violet-700 hover:font-bold'>Suggérer une catégorie</Link>
</div>


      </div>
       
    </div>

   </div>

<BackToTop/>
<BottomBar/>

{/* modal creer un groupe  */}
<div class="modal fade" id="modalcreergroupe" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Créer un nouveau groupe</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
        <div class="form-group">
            <label for="portee" class="col-form-label">Choisissez la portée du groupe :</label>
              <ul id='portee' className='pl-3'>
                <li><input type="checkbox" onChange={()=>{setPortee(!portee)}} checked={portee}/> <span className='font-bold'>Public</span> <span className="text-xs">(Tout le monde peut voir le groupe ainsi que son contenu, et le rejoindre)</span></li>
                <li><input type="checkbox" onChange={()=>{setPortee(!portee)}} checked={!portee}/> <span className='font-bold'>privée</span> <span className="text-xs">(Seul les membres peuvent voir le groupe ainsi que son contenu, et l'adhésion se fait uniquement par invitation)</span> </li>
              </ul>
          </div>
        
        <div class="form-group">
            <label for="recipient-name" class="col-form-label">Photo du groupe <span className='text-xs'>(facultatif)</span> :</label>
            <div className="flex flex-row justify-center items-center"> <input type="file" accept='image/*' onChange={(e)=>{const file=e.target.files?.[0]; setSelectedImage(file ? URL.createObjectURL(file) : undefined);setPhoto(e.target.files[0])}} class="form-control z-30 opacity-0" id="photogroupeinput" /> <span style={{right:'80%'}} className='position-relative'><img style={{height:'40px'}} src={selectedImage} alt="" /></span> </div>
            <span className="text-red-700 text-sm">{(sizephoto/1048576)>5 && 'La taille de votre photo ne doit pas dépasser 05 mégas !'}</span>
          </div>

          <div class="form-group">
            <label for="groupe-name" class="col-form-label">Nom du groupe :</label>
            <input onChange={(e)=>{setNom(e.target.value)}} type="text" class="form-control" ref={textenomgroupe} placeholder='Exemple : Les enfants de Dieu' />
          </div>

          <div class="form-group">
            <label for="categorie" class="col-form-label">Choisissez la catégorie du groupe :</label>
            <select onChange={(e)=>{setCategorie(e.target.value)}} id='categorie' class="form-select" aria-label="Default select example">
               <option value='etude biblique' >ETUDE BIBLIQUE</option>
               <option value="priere et meditation">PRIERE ET MEDITATION</option>
               <option value="adoration et louange">ADORATION ET LOUANGE</option>
               <option value="autre">AUTRE</option>
           </select>
          </div>

          <div class="form-group">
            <label for="message-text" class="col-form-label">Entrez l'objectif du groupe :</label>
            <textarea onChange={(e)=>{setObjectif(e.target.value)}} rows={8} class="form-control" ref={texteobjectifgroupe} placeholder='Exemple : Faire des études bibliques chaque jour pour agrandir sa foi'></textarea>
          </div>
          <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
        <button disabled={((sizephoto/1048576)<=5 && nom && objectif) ? false : true} onClick={creerGroupe} style={{backgroundColor:(!nom || !objectif) && 'gray'}} type="button" data-bs-dismiss="modal" class="btn bg-violet-700 text-white hover:bg-violet-600 focus:bg-violet-700">Créer</button>
      </div>
        </form>
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