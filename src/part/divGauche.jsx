import { Link, useNavigate } from 'react-router-dom';
import docta from '../images/docta.jpg';
import acceuil from '../icons/images/accueil.png';
import groupe from '../icons/images/groupe.png';
import predication from '../icons/images/predication.png';
import musique from '../icons/images/music.png';
import question from '../icons/images/question.png';
import friendRequest from '../icons/images/copains.png';
import don from '../icons/images/faire-un-don.png';
import login from '../icons/images/login.png';
import joindre from '../icons/images/papier.png';
import suggestion from '../icons/images/avantages.png';
import { useContext } from 'react';
import { userContexte } from '../contexte/userContexte';
import { tokenContexte } from '../contexte/tokenContexte';
import axios from 'axios';
export function DivGauche(){
    const navigate=useNavigate();
    const {token}=useContext(tokenContexte)
    const logout=async()=>{
       
           await axios.post(`${process.env.REACT_APP_BACKEND_URL}/logout`,{},{
            headers:{
                "Authorization": "Bearer "+token
              }
           }).then((res)=>{
            if(res?.data?.statut=='200'){
                localStorage.removeItem('token_foi_chretienne');
                window.location.reload()
            }else{
              
            }
          }).catch((e)=>{
            if(e?.response?.data?.message?.includes('Unauthenticated')){
                navigate('/login')
            }
          })
        
       
    }

      const {userstore, setUserstore}=useContext(userContexte)
    return <>
    <div style={{height:'85vh'}} className="w-1/4 flex flex-col justify-start items-start px-4 fixed overflow-y-auto pb-2 gap-y-8">
        <div className='flex flex-col w-full gap-y-4 text-sm border-b-2 border-b-gray-300 pb-8'>
            <Link style={{borderLeft:window.location.href.includes('profile/'+(userstore && userstore?.data?.id))?"4px solid rgb(109 40 217 / var(--tw-bg-opacity, 1))":"0px",backgroundColor:window.location.href.includes('profile/'+(userstore && userstore.data.id)) ? 'rgb(209 213 219 / var(--tw-bg-opacity, 1))' :'',color:window.location.href.includes('profile/'+(userstore && userstore.data.id)) ? 'rgb(109 40 217 / var(--tw-bg-opacity, 1))' :'',display:!userstore && 'none'}} to={'/profile/'+(userstore && userstore.data.id)} className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l border-l-4 border-l-violet-700 hover:text-violet-700 w-full'><span className='rounded-full' style={{height:'30px',width:'30px',backgroundImage:`url(${userstore && process.env.REACT_APP_BACKEND_FILE+userstore?.data?.pp})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> {userstore && userstore.data.nom}</Link>
            <Link style={{borderLeft:window.location.href=='http://localhost:3000/'?"4px solid rgb(109 40 217 / var(--tw-bg-opacity, 1))":"0px",backgroundColor:window.location.href=='http://localhost:3000/' ? 'rgb(209 213 219 / var(--tw-bg-opacity, 1))' :'',color:window.location.href.length<=23 ? 'rgb(109 40 217 / var(--tw-bg-opacity, 1))' :''}} to={'/'} className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l-4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full'><span className='' style={{height:'30px',width:'30px',backgroundImage:`url(${acceuil})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Acceuil</Link>
            <Link style={{borderLeft:window.location.href.includes('groupe')?"4px solid rgb(109 40 217 / var(--tw-bg-opacity, 1))":"0px",backgroundColor:window.location.href.includes('groupe') ? 'rgb(209 213 219 / var(--tw-bg-opacity, 1))' :'',color:window.location.href.includes('groupe') ? 'rgb(109 40 217 / var(--tw-bg-opacity, 1))' :''}} to={'/groupes'} className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l-4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full'><span className='' style={{height:'28px',width:'28px',backgroundImage:`url(${groupe})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Groupes</Link>
            <Link style={{borderLeft:window.location.href.includes('amitie')?"4px solid rgb(109 40 217 / var(--tw-bg-opacity, 1))":"0px",backgroundColor:window.location.href.includes('amitie') ? 'rgb(209 213 219 / var(--tw-bg-opacity, 1))' :'',color:window.location.href.includes('amitie') ? 'rgb(109 40 217 / var(--tw-bg-opacity, 1))' :''}} to={'/amitie'} className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full text-sm'><span className='' style={{height:'25px',width:'25px',backgroundImage:`url(${friendRequest})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Amitiés</Link>
            <Link style={{borderLeft:window.location.href.includes('musique')?"4px solid rgb(109 40 217 / var(--tw-bg-opacity, 1))":"0px",backgroundColor:window.location.href.includes('musique') ? 'rgb(209 213 219 / var(--tw-bg-opacity, 1))' :'',color:window.location.href.includes('musique') ? 'rgb(109 40 217 / var(--tw-bg-opacity, 1))' :''}} to={'/musique'} className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l-4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full'><span className='' style={{height:'26px',width:'26px',backgroundImage:`url(${musique})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Musiques Chrétiennes</Link>
            <Link style={{borderLeft:window.location.href.includes('predication')?"4px solid rgb(109 40 217 / var(--tw-bg-opacity, 1))":"0px",backgroundColor:window.location.href.includes('predication') ? 'rgb(209 213 219 / var(--tw-bg-opacity, 1))' :'',color:window.location.href.includes('predication') ? 'rgb(109 40 217 / var(--tw-bg-opacity, 1))' :''}} to={'/predication'} className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l-4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full'><span className='' style={{height:'29px',width:'29px',backgroundImage:`url(${predication})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Prédications</Link>
            {/* <Link className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l-4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full'><span className='' style={{height:'30px',width:'30px',backgroundImage:`url(${video})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Vidéos</Link> */}
          
            {/* <Link className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l-4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full'><span className='' style={{height:'30px',width:'30px',backgroundImage:`url(${Thematique})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Thématiques bibliques</Link> */}
            {/* <Link className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l-4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full'><span className='' style={{height:'30px',width:'30px',backgroundImage:`url(${chorale})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Chorales</Link> */}
            {/* <Link className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l-4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full'><span className='rounded-full' style={{height:'35px',width:'35px',backgroundImage:`url(${docta})`,backgroundPosition:'center',backgroundSize:'cover'}} src={docta} alt="" ></span> Stories</Link> */}
        </div>
        <div className='flex flex-col w-full gap-y-4 text-sm'>
        <span className="flex flex-row"> {!token && <a href={'/login'} className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l-4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full text-sm'><span className='' style={{height:'18px',width:'18px',backgroundImage:`url(${login})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Se connecter</a>} {token && <button onClick={logout} className='text-sm flex flex-row items-center gap-x-3 pl-2'><span> <img style={{height:'19px'}} src={login} alt="" /> </span>Se déconnecter</button>}</span>
            {/* <Link to={'/don'} className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l-4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full'><span className='' style={{height:'29px',width:'29px',backgroundImage:`url(${don})`,backgroundPosition:'center',backgroundSize:'cover'}} src={docta} alt="" ></span> Faire un don</Link> */}
            <Link to={'/nous-joindre'} className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l-4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full'><span className='' style={{height:'28px',width:'28px',backgroundImage:`url(${joindre})`,backgroundPosition:'center',backgroundSize:'cover'}} src={docta} alt="" ></span> Nous joindre</Link>
            <Link to={'/envoyer-suggestion'} className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l-4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full'><span className='' style={{height:'28px',width:'28px',backgroundImage:`url(${suggestion})`,backgroundPosition:'center',backgroundSize:'cover'}} src={docta} alt="" ></span> Envoyer une suggestion</Link>
           <Link to={'/description'} className='flex flex-row justify-start px-2 py-1 rounded-lg items-center gap-x-2 text-decoration-none border-l hover:border-l4 hover:border-l-violet-700 hover:bg-gray-300 hover:text-violet-700 w-full text-sm'><span className='' style={{height:'25px',width:'25px',backgroundImage:`url(${question})`,backgroundPosition:'center',backgroundSize:'cover'}}  ></span> Qu'est ce que foi chrétienne ?</Link>
        </div>
    </div>
    </>
}