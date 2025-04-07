import { Header } from '../components/header';
import docta from '../images/docta.jpg';
import left from '../icons/images/left.png';
import { useContext, useEffect, useState } from 'react';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Country, State, City }  from 'country-state-city';

// Import Interfaces`
import { ICountry, IState, ICity } from 'country-state-city'
import { userContexte } from '../contexte/userContexte';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { tokenContexte } from '../contexte/tokenContexte';
import { Profile } from './profile';
import { EditProfileSkeleton } from '../skeletons/editProfil';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
export function EditProfile()
{
  const navigate=useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])

   const queryClient=useQueryClient();
  const {userstore}=useContext(userContexte)
  const {token}=useContext(tokenContexte)
  const {id}=useParams('id')
    
    const [profile, setProfile]=useState({})
    const [isoCode, setIsoCode]=useState()
    const paysc=Country.getAllCountries()
    const villes=City.getCitiesOfCountry(isoCode)
    const [pays, setPays]=useState()
    const [ville, setVille]=useState()
   
    const [loading, setLoading]=useState(false)
    
    const [selectedImage, setSelectedImage]=useState()
    const [selectedImageCouverture, setSelectedImageCouverture]=useState()
    const [pp, setPp]=useState(null)
    const [pc, setPc]=useState(null)
    const [nom, setNom]=useState()
    const [prenom, setPrenom]=useState()
    // const [password, setPassword]=useState(profile?.data?.mesinfos?.password)
    const [sexe, setSexe]=useState()
    const [birthday, setBirthday]=useState()
    const [quartier, setQuartier]=useState()
    const [pseudo, setPseudo]=useState()
    const [verset, setVerset]=useState()
    const [profession, setProfession]=useState()
    const [telephone, setTelephone]=useState()

    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/mes-infos/${id}`,{
        headers:{
            "Authorization": "Bearer "+token
          }
    }).then((res)=>{
        if(res.data?.statut=='200'){
       console.log(res.data)
       setIsoCode(res.data?.mesinfos?.pays)
       setSelectedImage(process.env.REACT_APP_BACKEND_FILE+res.data?.mesinfos?.pp)
       setSelectedImageCouverture(process.env.REACT_APP_BACKEND_FILE+res.data?.mesinfos?.pc)
       setProfile(res)
       setNom(res.data?.mesinfos?.nom)
       setPrenom(res.data?.mesinfos?.prenom)
       setPays(res.data?.mesinfos?.pays)
       setVille(res.data?.mesinfos?.ville)
      //  setPassword(res.data?.mesinfos?.password)
       setSexe(res.data?.mesinfos?.sexe)
       setBirthday(res.data?.mesinfos?.birthday)
       setQuartier(res.data?.mesinfos?.quartier)
       setPseudo(res.data?.mesinfos?.pseudo)
       setVerset(res.data?.mesinfos?.verset)
       setProfession(res.data?.mesinfos?.profession)
       setTelephone(res.data?.mesinfos?.telephone)
       setLoading(true)
        }else{
       
        }
      }).catch((err)=>{
      
      })
    
    },[])

    const [loadingspin, setLoadingspin]=useState(false)
          const updateProfil=()=>{
           
              (token && id==userstore?.data?.id) && axios.post(`${process.env.REACT_APP_BACKEND_URL}/update-profile`,{id,pp,pc,nom,prenom,sexe,birthday,pays,ville,quartier,pseudo,verset,profession,telephone},{
                headers:{
                  "Authorization": "Bearer "+token,
                  "Content-type": "multipart/form-data",
                }
              }).then((res)=>{
                if(res.data?.statut=='200'){
                  toast(res.data?.mesinfos?.message)
                  window.location.reload()
                }
              })
            }

            // limite taille de photo 
            const [sizepp, setSizepp]=useState(0)
            const [sizepc, setSizepc]=useState(0)
         

    return <>
   <div className="flex flex-col justify-center items-center w-full">
    <Header/>
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
        <div className=' flex flex-col items-start divgauche'> <DivGauche/> </div>
      <div className="w-3/4 px-2 h-full flex flex-col items-center justify-center nouvelledivdroite">
      <p className="text-start mb-2 flex flex-row justify-start items-center w-full "><span onClick={()=>{navigate(-1)}} className='cursor-pointer'><img style={{height:'16px'}} src={left} alt="" /></span></p>
      <div className="h-full flex flex-row justify-center flex-wrap items-center gap-4 pb-24 w-full">
       
       

{loading ? <div class="w-full formeditprofil">

  <div class="form-group">
            <label for="profiltof" class="block mb-2 text-sm font-medium text-gray-900">Photo de profile :</label>
           {(sizepp/1048576)>10 &&  <small className='text-red-700'>La taille de votre photo de profile ne doit pas dépasser 10 mégas !</small>}
            <div className="flex flex-row justify-center items-center"> <input type="file" accept='image/*' onChange={(e)=>{const file=e.target.files?.[0]; setSelectedImage(file ? URL.createObjectURL(file) : undefined) ; setPp(e.target.files[0]);setSizepp(e.target.files[0]['size'])}} class="form-control z-30 opacity-0" id="profiletof" /> <span style={{right:'70%'}} className='position-relative'><img style={{height:'90px'}} src={selectedImage} alt="" /></span> </div>
</div>

<div class="form-group">
            <label for="couverturetof" class="block mb-2 text-sm font-medium text-gray-900">Photo de couverture :</label>
           {(sizepc/1048576)>10 &&  <small className='text-red-700'>La taille de votre photo de couverture ne doit pas dépasser 10 mégas !</small>}
            <div className="flex flex-row justify-center items-center"> <input type="file" accept='image/*' onChange={(e)=>{const file=e.target.files?.[0]; setSelectedImageCouverture(file ? URL.createObjectURL(file) : undefined); setPc(e.target.files[0]); setSizepc(e.target.files[0]['size'])}} class="form-control z-30 opacity-0" id="couverturetof" /> <span style={{right:'70%'}} className='position-relative'><img style={{height:'90px'}} src={selectedImageCouverture} alt="" /></span> </div>
</div>

<div class="mb-5">
    <label for="verset" class="block mb-2 text-sm font-medium text-gray-900">Verset préféré</label>
    <textarea value={verset} onChange={(e)=>{setVerset(e.target.value)}} rows={3} id="verset" class="shadow-sm border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Exemple: Psaume 37 v 4 : Fais de l'Eternel tes délices, et il te donnera ce que ton coeur désire."/>
  </div>
  
  <div class="mb-5">
    <label for="pseudo" class="block mb-2 text-sm font-medium text-gray-900">Pseudonyme</label>
    <input value={pseudo} onChange={(e)=>{setPseudo(e.target.value)}} type="text" id="pseudo" class="shadow-sm border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Exemple: l'enfant de Dieu"  />
  </div>

<div class="mb-5">
    <label for="nom" class="block mb-2 text-sm font-medium text-gray-900">Nom</label>
   {document.getElementById('nom')?.value?.length==0 && <small className="text-red-700">Le nom est requis !</small>}
    <input value={nom} onChange={(e)=>{setNom(e.target.value)}} type="text" id="nom" class="shadow-sm border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
  </div>

  <div class="mb-5">
    <label for="prenom" class="block mb-2 text-sm font-medium text-gray-900 ">Prénom</label>
    <input value={prenom} onChange={(e)=>{setPrenom(e.target.value)}} type="text" id="prenom" class="shadow-sm border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
  </div>

  {/* <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
  </div> */}
 {/* sexe  */}
  <div class="mb-5">
  <label for="sexe" class="block mb-2 text-sm font-medium text-gray-900">Sexe</label>
  <select onChange={(e)=>{setSexe(e.target.value)}} id="sexe" class=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500">

    <option selected={profile?.data?.mesinfos?.sexe=='M' && true} value='M'>M</option>
    <option selected={profile?.data?.mesinfos?.sexe=='F' && true} value='F'>F</option>
  </select>
    
  </div>
  {/* date de naissance  */}
  <div class="mb-5">
    <label for="naissance" class="block mb-2 text-sm font-medium text-gray-900">date de naissance</label>
    <input value={birthday} onChange={(e)=>{setBirthday(e.target.value)}} type="date" id="naissance" class="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
  </div>
  {/* pays  */}
  <div class="mb-5">
  <label for="pays" class="block mb-2 text-sm font-medium text-gray-900">Pays de résidence</label>
  <select onChange={(e)=>{setIsoCode(e.target.value);setPays(e.target.value)}} id="pays" class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500">
{
    paysc.map((p)=>{
        return <option selected={profile?.data?.mesinfos?.pays==p.isoCode && true} value={p.isoCode}>{p.name}</option>
    })
}
  </select>
  </div>

  {/* ville  */}
  <div class="mb-5">
  <label for="ville" class="block mb-2 text-sm font-medium text-gray-900">Ville de résidence</label>
  <select onChange={(e)=>{setVille(e.target.value)}} id="ville" class=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500">
  {
    villes.map((v)=>{
        return <option selected={profile?.data?.mesinfos?.ville?.toLowerCase()==v.name?.toLowerCase() && true} value={v.name}>{v.name}</option>
    })
}

  </select>
  </div>

  <div class="mb-5">
    <label for="quartier" class="block mb-2 text-sm font-medium text-gray-900">Quartier</label>
    <input value={quartier} onChange={(e)=>{setQuartier(e.target.value)}} type="text" id="quartier" class="shadow-sm border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
  </div>

  <div class="mb-5">
    <label for="profession" class="block mb-2 text-sm font-medium text-gray-900">Profession</label>
    <input value={profession} onChange={(e)=>{setProfession(e.target.value)}} type="text" id="profession" class="shadow-sm border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
  </div>

  <div class="mb-5">
    <label for="telephone" class="block mb-2 text-sm font-medium text-gray-900">Téléphone</label>
    <input value={telephone} onChange={(e)=>{setTelephone(e.target.value)}} type="number" id="telephone" class="shadow-sm border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
  </div>

  
  <button disabled={(sizepc/1048576)<=10 && (sizepp/1048576<=10) && (document.getElementById('nom')!=null && document.getElementById('nom')?.value?.length>0 ) ? false : true} onClick={()=>{updateProfil();  setLoadingspin(true)}} type="submit" style={{backgroundColor:((sizepc/1048576)<=10 && (sizepp/1048576<=10) && (document.getElementById('nom')!=null && document.getElementById('nom')?.value?.length>0 ))==false && 'gray'}} class="w-full flex flex-row justify-center items-center gap-x-2 text-white bg-violet-700 hover:bg-violet-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-violet-700 dark:hover:bg-violet-600 dark:focus:ring-blue-800">Modifier <ClipLoader color={'white'}  loading={loadingspin}  size={30}/></button>

</div> : <EditProfileSkeleton/> }


      </div>

      </div>
       
    </div>

   </div>

<BackToTop/>
<BottomBar/>

    </>
}