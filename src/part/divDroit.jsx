import { Link, useNavigate } from 'react-router-dom';
import voirPlus from '../icons/images/right.png';
import plus from '../icons/images/plus.png';
import groupepardefaut from '../images/groupe.svg';
import { Slide } from 'react-slideshow-image';
import { useContext, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { tokenContexte } from '../contexte/tokenContexte';
import axios from 'axios';
import { toast } from 'react-toastify';
import { userContexte } from '../contexte/userContexte';
import { SuggestionGroupeHomeSkeleton } from '../skeletons/suggestiongroupehome';
import { DemandeDivDroitSkeleton } from '../skeletons/demandedivdroit';
export function DivDroit(){
    const tab=['','','','','','','','','','','','','','']
    const tab2=['','','','','']
     const {token}=useContext(tokenContexte)
     const {userstore}=useContext(userContexte)
     const navigate=useNavigate();

    const [selectedImage, setSelectedImage]=useState(groupepardefaut)
    const [portee, setPortee]=useState(true)

    // liste mes groupes 
    const {data:mesgroupesauth,isLoading}=useQuery({
      queryKey:['mes-groupes'],
      queryFn:()=> token && axios.get(`${process.env.REACT_APP_BACKEND_URL}/mes-groupes`,{
       headers:{
         "Authorization": "Bearer "+token
       }
     })
    })

    // creer groupe 
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
//       queryClient.invalidateQueries({ queryKey: ['mes-groupes'] });
//       toast('Groupe crée avec succes')
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

      // liste des grupes 
      const {data:lesgroupes,isLoading:loadlesgroupes}=useQuery({
        queryKey:['les-groupes'],
        queryFn:()=> token ? axios.get(`${process.env.REACT_APP_BACKEND_URL}/les-groupes`,{
          headers:{
            "Authorization": "Bearer "+token
          }
       }) :axios.get(`${process.env.REACT_APP_BACKEND_URL}/les-groupes-guest`)
      
      })

      // adherer un groupe 
      const rejoindre=(id,idbouton)=>{
        document.getElementById(idbouton).textContent='en cours...'
       axios.post(`${process.env.REACT_APP_BACKEND_URL}/rejoindre-groupe`, {id},{
           headers:{
               "Authorization": "Bearer "+token
             }
       }).then((res)=>{
           if(res.data.statut=='200'){
            document.getElementById(idbouton).textContent='Réussi'
        
           }else{
            document.getElementById(idbouton).textContent='deja membre'
           }
         })
       
     }

    //  demandes 
    const {data:demandes,isLoading:loaddemande}=useQuery({
     queryKey:['demande-amitie'],
     queryFn:()=> token && axios.get(`${process.env.REACT_APP_BACKEND_URL}/demade-amitie`,{
      headers:{
        "Authorization": "Bearer "+token
      }
    })
   })
 
   const accepter=(iddemandeur,idbouton)=>{
     document.getElementById(idbouton).textContent='en cours...'
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/accepter-demande`, {iddemandeur},{
        headers:{
            "Authorization": "Bearer "+token
          }
    }).then((res)=>{
        if(res.data.statut=='200'){
        document.getElementById(idbouton).textContent='Vous êtes amis'
        }else{
       
        }
      }).catch((err)=>{
       navigate('/login')
      })
    
  }

  const refuser=(iddemandeur,idbouton)=>{
    document.getElementById(idbouton).textContent='rejet en cours...'
   axios.post(`${process.env.REACT_APP_BACKEND_URL}/refuser-demande`, {iddemandeur},{
       headers:{
           "Authorization": "Bearer "+token
         }
   }).then((res)=>{
       if(res.data.statut=='200'){
       document.getElementById(idbouton).textContent='Demande rejetée'
       }else{
      
       }
     }).catch((err)=>{
      navigate('/login')
     })
   
 }


    return <>
    <div style={{height:'85vh'}} className=" flex flex-col justify-between items-center fixed overflow-y-auto pb-2 gap-y-8 w-1/4 px-4">
       {/* demande amitie  */}
        <div className="flex flex-col w-full border-b border-b-2 border-b-gray-300 pb-4">
          {(demandes && token && demandes?.data?.demandes?.length>0) ?   <div className="flex flex-row justify-between items-center w-full text-xs mb-2"> <span>Demande d'amitié</span><Link to={'/amitie'} className='flex flex-row justify-center items-center gap-x-1 text-decoration-none hover:text-violet-700'>Voir plus <img style={{height:'10px'}} src={voirPlus} alt="" /></Link> </div> : ''}
          {token &&   <div className=''>
            {demandes ? demandes?.data?.demandes?.slice(0,1)?.map((e)=>{
               return <Slide>
               
               {
                demandes && demandes?.data?.demandes?.map((e)=>{
                  return <div style={{width:'auto',height:'auto'}} class="pt-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-row justify-center items-center">
    
                  <div style={{width:'20rem',height:'17rem'}} class="flex flex-col items-center w-full mt-6 gap-y-2">
                      <div style={{backgroundImage:`url(${process.env.REACT_APP_BACKEND_FILE+e.pp})`,backgroundPosition:'center',backgroundSize:'cover'}} className="w-16 h-16 rounded-full hover:scale-105 hover:duration-700"></div>
                      <Link to={'/profile/1'} className='text-decoration-none '>  <span class=" text-sm font-medium text-violet-700">{e.nom && e.nom.substring(0,20)} {e.prenom && e.prenom.substring(0,18)}</span></Link>
                      <span class="text-xs text-gray-500 dark:text-gray-400 position-relative -top-1 text-center">{e.pseudo>30 ? e.pseudo.substring(0,30)+'...' : e.pseudo}</span>
                      <span className='text-xs'>{e.commun && e.commun>0 ? e.commun+' '+'Ami(e)s en commun' : ''}</span>
                      <div class="flex mt-4 md:mt-6 ">
                          <a id={'boutondivdroit'+e.id} onClick={()=>{accepter(e.id,'boutondivdroit'+e.id)}} class="inline-flex cursor-pointer text-decoration-none items-center px-4 py-2 text-xs font-medium text-center text-white bg-violet-700 rounded-lg hover:bg-violet-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Accepter</a>
                          <a id={'boutonrefuser'+e.id} onClick={()=>{refuser(e.id,'boutonrefuser'+e.id)}} style={{backgroundColor:'#80808026'}}  class="py-2 cursor-pointer px-4 text-decoration-none ms-2 text-xs font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Rejeter</a>
                      </div>
                  </div>
              </div>
                })
               }
   
                </Slide>
                 }
                ):<DemandeDivDroitSkeleton/>}
            </div>}
        </div>

      {/*nes groupes  */}
      <div className="flex flex-col w-full">
        <Link style={{display:!token && 'none'}} data-bs-toggle="modal" data-bs-target="#modalcreergroupe" data-whatever="@getbootstrap" className="text-center bg-white p-1 rounded-2xl text-decoration-none flex flex-row justify-center items-center mb-2 hover:text-violet-700 hover:scale-105 hover:duration-700"><img style={{height:'20px'}} src={plus} alt="" /> &nbsp;Créer un groupe</Link>
        <Link style={{display:token && 'none'}} data-bs-toggle="modal" data-bs-target="#exampleModalGuest" data-whatever="@getbootstrap" className="text-center bg-white p-1 rounded-2xl text-decoration-none flex flex-row justify-center items-center mb-2 hover:text-violet-700 hover:scale-105 hover:duration-700 w-3/4 m-3"><img style={{height:'20px'}} src={plus} alt="" /> &nbsp;Créer un groupe</Link>
            <div style={{display:(!token || mesgroupesauth?.data?.mesgroupes?.length==0) && 'none'}} className="flex flex-row justify-between items-center w-full text-xs m-2"> <span>Mes groupes</span><Link to={'/mes-groupes'} className='flex flex-row justify-center items-center gap-x-1 text-decoration-none hover:text-violet-700'>Voir plus <img style={{height:'10px'}} src={voirPlus} alt="" /></Link> </div>
           <div style={{display:(!token || mesgroupesauth?.data?.mesgroupes?.length==0) && 'none'}} className="flex flex-col justify-around items-start gap-y-4 mt-2 border-b border-b-2 border-b-gray-300 pb-4">
           {
            mesgroupesauth ? mesgroupesauth?.data?.mesgroupes?.slice(0,5)?.map((c)=>{
                return <Link to={'/groupe/'+c.id} className="flex flex-row justify-start items-center gap-x-2 text-decoration-none hover:text-violet-700">
                <div style={{backgroundImage: `url(${process.env.REACT_APP_BACKEND_FILE+c.photo})`,backgroundPosition:'center',backgroundSize:'cover',backgroundRepeat:'no-repeat'}} className='w-12 h-12 rounded-full hover:scale-105 hover:duration-700'></div>
                 <div className='flex flex-col justify-center items-start text-sm'>
                     <span className='font-bold'>{c.nom?.length>30 ? c.nom?.substr(0,30)+'...' : c?.nom}</span><span className='text-xs'>{c.membre.split(",").length-1} membres</span>
                 </div>
                </Link>
            }):<SuggestionGroupeHomeSkeleton/>
           }
           </div>
      </div>

      {/* suggestion de groupes  */}
      <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between items-center w-full text-xs m-2"> <span>Suggestions</span><Link to={'/groupes'} className='flex flex-row justify-center items-center gap-x-1 text-decoration-none hover:text-violet-700'>Voir plus <img style={{height:'10px'}} src={voirPlus} alt="" /></Link> </div>
           <div className="flex flex-col justify-around items-start gap-y-4 mt-2 border-b border-b-2 border-b-gray-300 pb-4">
          
          {
             ( lesgroupes && token) ? Object.keys(lesgroupes?.data?.lesgroupes)?.map((c,i)=>{
            
              return <>
              <p style={{display:lesgroupes?.data?.lesgroupes[c].length==0 && 'none'}} className='text-xs'>{c?.toUpperCase()}</p>
                {
              lesgroupes?.data?.lesgroupes[c].map((e)=>{
                  return <div style={{width:'18rem',display:e.membre?.includes(userstore?.data?.id+",") && 'none'}} className="flex flex-row justify-start items-center gap-x-2 text-decoration-none">
                  <div style={{backgroundImage: `url(${process.env.REACT_APP_BACKEND_FILE+e?.photo})`,backgroundPosition:'center',backgroundSize:'cover',backgroundRepeat:'no-repeat'}} className='w-12 h-12 rounded-full hover:scale-105 hover:duration-700'></div>
                   <div className='flex flex-col justify-center items-start text-sm'>
                       <span className='font-bold'>{e.nom?.length>50 ? e.nom?.substr(0,50)+'...' : e?.nom}</span><span className='text-xs'>{e.membre.split(",").length-1} membre(s)</span><span className='flex flex-row gap-x-2'><button id={'rejoindre'+e.id} onClick={()=>{rejoindre(e.id, 'rejoindre'+e.id)}} className="btn bg-violet-700 text-white hover:bg-violet-600 focus:bg-violet-600 text-xs">Adherer</button><Link to={'/groupe/'+e.id} className="btn bg-gray-300 hover:bg-gray-200 hover:text-violet-700 hover:font-bold text-xs">Voir</Link></span>
                   </div>
                  </div>
              })
             }
              </>
             }) :(lesgroupes && !token) ? 
             
           
            Object.keys(lesgroupes?.data?.lesgroupes)?.map((c,i)=>{
              return <>
               <p style={{display:lesgroupes?.data?.lesgroupes[c].length==0 && 'none'}} className='text-xs'>{c?.toUpperCase()}</p>
              {
                 lesgroupes?.data?.lesgroupes[c].map((e)=>{
                  return <div style={{width:'18rem',display:e.membre?.includes(userstore?.data?.id+",") && 'none'}} className="flex flex-row justify-start items-center gap-x-2 text-decoration-none">
                  <div style={{backgroundImage: `url(${process.env.REACT_APP_BACKEND_FILE+e?.photo})`,backgroundPosition:'center',backgroundSize:'cover',backgroundRepeat:'no-repeat'}} className='w-12 h-12 rounded-full hover:scale-105 hover:duration-700'></div>
                   <div className='flex flex-col justify-center items-start text-sm'>
                       <span className='font-bold'>{e.nom?.length>50 ? e.nom?.substr(0,50)+'...' : e?.nom}</span><span className='text-xs'>{e.membre.split(",").length-1} membre(s)</span><span className='flex flex-row gap-x-2'><button data-bs-toggle="modal" data-bs-target="#exampleModalGuest" data-whatever="@getbootstrap" className="btn bg-violet-700 text-white hover:bg-violet-600 focus:bg-violet-600 text-xs">Adherer</button><Link to={'/groupe/'+e.id} className="btn bg-gray-300 hover:bg-gray-200 hover:text-violet-700 hover:font-bold text-xs">Voir</Link></span>
                   </div>
                  </div>
              })
              }
              </>
            })
            :<SuggestionGroupeHomeSkeleton/>
           
          }
           </div>
      </div>

       {/* amis en ligne  */}
       {/* <div className="flex flex-col w-full">
       <p className="text-start text-sm">Vos ami(e)s en ligne actuellement :</p>
        
           <div className="flex flex-col justify-around items-start gap-y-4 mt-2 border-b border-b-2 border-b-gray-300 pb-4">
           {
            tab2.map((e)=>{
                return <Link to={'/profile/1'} className="flex flex-row justify-start items-center text-decoration-none hover:text-violet-700">
                <div style={{backgroundImage: `url(${docta})`,backgroundPosition:'center',backgroundSize:'cover',backgroundRepeat:'no-repeat'}} className='w-12 h-12 rounded-full hover:scale-105 hover:duration-700'>  </div><span className="h-3 w-3 bg-green-700 position-relative right-3 top-4 rounded-full border-white border-2 box-border"></span>
                 <div className='flex flex-col justify-center items-start text-sm'>
                     <span className='font-bold'>Nom de l'utilisateur</span><span className='text-xs'>Pseudonyme</span>
                 </div>
                </Link>
            })
           }
           </div>
      </div> */}

    </div>

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


    </>
}