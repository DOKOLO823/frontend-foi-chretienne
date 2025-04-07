import { Header } from '../components/header';
import docta from '../images/docta.jpg';
import left from '../icons/images/left.png';
import point from '../icons/images/point.png';
import coeur from '../icons/images/coeur.png';
import coeurv from '../icons/images/coeurv.png';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { tokenContexte } from '../contexte/tokenContexte';
import { useContext } from 'react';
import { userContexte } from '../contexte/userContexte';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { MonoGroupeSkeleton } from '../skeletons/monogroupe';
export function MonoGroupe()
{
  const queryClient=useQueryClient();
     // liker un groupe suggestion
     const likeramensuggestion=(id,c)=>{
        if(document.getElementById('iconcoeursuggestion'+c).src==coeur){
          document.getElementById('iconcoeursuggestion'+c).src=coeurv
           document.getElementById('iconcoeursuggestion'+c).style.transform='scale(1.2)'
        }else{
          document.getElementById('iconcoeursuggestion'+c).src=coeur
           document.getElementById('iconcoeursuggestion'+c).style.transform='scale(1)'
        }
      
      }

    const tab=['','','','','','','','','','','','','','','','']
    const navigate=useNavigate();
    const {id}=useParams('id')
    const {cle}=useParams('cle')

    // afficher le grupe 
    const {token}=useContext(tokenContexte)
    const {userstore}=useContext(userContexte)
 
  const {data:monogroupe,isLoading}=useQuery({
    queryKey:['/mono-groupe','id','cle'],
    queryFn:()=>token ? axios.get(`${process.env.REACT_APP_BACKEND_URL}/mono-groupe/${id}/${cle}`,{
      headers:{
        "Authorization": "Bearer "+token
      }
    }) : navigate('/login')
  })
  console.log(monogroupe)

  const rejoindre=(id,idbouton)=>{
    document.getElementById(idbouton).textContent='encours d\'adhésion...'
   axios.post(`${process.env.REACT_APP_BACKEND_URL}/rejoindre-groupe`, {id},{
       headers:{
           "Authorization": "Bearer "+token
         }
   }).then((res)=>{
       if(res.data?.statut=='200'){
       document.getElementById(idbouton).textContent='Vous êtes membres'
       }else if(res.data?.statut=='300'){
      document.getElementById(idbouton).textContent='Vous êtes deja membres'
       }
     }).catch((err)=>{
      navigate('/login')
     })
   
 }

 const like=(id,idcoeur)=>{
  if(document.getElementById(idcoeur).src==coeur){
    document.getElementById(idcoeur).src=coeurv
  }else{
    document.getElementById(idcoeur).src=coeur
  }
 axios.post(`${process.env.REACT_APP_BACKEND_URL}/like-groupe`, {id},{
     headers:{
         "Authorization": "Bearer "+token
       }
 }).then((res)=>{
     if(res.data?.statut=='200'){
    
     }else{
    
     }
   }).catch((err)=>{
    navigate('/login')
   })
 
}

    return <>
   <div className="flex flex-col justify-center items-center w-full">
    <Header/>
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
        <div className=' flex flex-col items-start divgauche'> <DivGauche/> </div>
      <div className="w-full px-2 h-full flex flex-col items-center justify-center ">
      <p className="text-start mb-2 flex flex-row justify-start items-center gap-x-4 w-full pl-3"><span onClick={()=>{navigate(-1)}} className='cursor-pointer'><img style={{height:'16px'}} src={left} alt="" /></span></p>
      <div className="h-full flex flex-row justify-center flex-wrap items-center w-full gap-4 pb-24">
       
              {
                (monogroupe && monogroupe?.data?.statut=='200') ? <div class="w-1/2 monogroupe">
                <img class="card-img-top" src={process.env.REACT_APP_BACKEND_FILE+monogroupe?.data?.groupe?.photo} alt="Image d'un groupe"/>
                <div class="card-body w-full bg-white">
                  <h5 class="card-title font-bold text-violet-700"> {monogroupe?.data?.groupe?.nom>50 ? monogroupe?.data?.groupe?.nom+'...' : monogroupe?.data?.groupe?.nom} </h5>
                  <p class="card-text gap-y-2 flex flex-col"><span><span className=" text-violet-700">Objectif du groupe :</span> {monogroupe?.data?.groupe?.objectif?.length>60 ? monogroupe?.data?.groupe?.objectif?.substr(0,60)+'...' : monogroupe?.data?.groupe?.objectif} </span> <span className="text-xs text-gray-700 flex flex-row start items-center "> <span> {monogroupe?.data?.groupe?.membre?.split(",")?.length-1} membre(s)&nbsp; </span> <span><img style={{height:'5px'}} src={point} alt="" /></span> &nbsp;<span className='flex flex-row justify-center items-center gap-x-1'>  <img style={{height:'10px'}} src={coeur} alt="" />{monogroupe?.data?.groupe?.like}</span> </span>  <span className='text-xs mb-1'>Crée par {monogroupe?.data?.groupe?.user?.nom?.substr(0,40)?.toUpperCase()}</span> </p>
                <div className="flex flex-col">
                <span className="flex flex-row gap-x-3 w-full">
                 <img id={'coeur'+monogroupe?.data?.groupe?.id} onClick={()=>{like(monogroupe?.data?.groupe?.id,'coeur'+monogroupe?.data?.groupe?.id)}} className='amenpub position-relative top-2.5 cursor-pointer' style={{height:'26px',transition:'all ease 0.6s'}} src={userstore && monogroupe?.data?.groupe?.likeur?.includes(userstore?.data?.id+',') ? coeurv : coeur} alt="" />
                 
                 <Link style={{display:monogroupe?.data?.groupe?.membre?.includes(userstore?.data?.id+',') ? 'none' :'flex'}} id={'rejoindre'+monogroupe?.data?.groupe?.id} onClick={()=>{rejoindre(monogroupe?.data?.groupe?.id, 'rejoindre'+monogroupe?.data?.groupe?.id)}} class="btn focus:bg-violet-600 bg-violet-700 text-white mt-1 hover:bg-violet-600 text-xs">Rejoindre</Link>
                 <Link to={'/groupe/'+monogroupe?.data?.groupe?.id} class="btn bg-gray-300 mt-1 hover:bg-gray-200 hover:text-violet-700 text-xs">Apercu</Link>
                 </span>
                 <span style={{display:monogroupe?.data?.groupe?.membre?.includes(userstore?.data?.id+',') ? 'flex' :'none'}} className="text-xs w-full text-center position-relative top-2 flex flex-row justify-start">Vous êtes membres</span>
                </div>
                </div>
              </div>
: (monogroupe && monogroupe?.data?.statut=='404') ? 'Ce groupe a été supprimé' : <MonoGroupeSkeleton/>
              }
      </div>

      </div>
       
    </div>

   </div>

<BackToTop/>
<BottomBar/>

    </>
}