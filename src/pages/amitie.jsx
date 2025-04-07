import React, { useContext } from 'react';
import { Header } from '../components/header';
import left from '../icons/images/left.png';
import { useState } from 'react';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { Link, useNavigate } from 'react-router-dom';
import { AmitieSuggestion } from '../part/amitieSuggestion';
import { AmitieDemande } from '../part/amitieDemande';
import { tokenContexte } from '../contexte/tokenContexte';


export default function Amitie (){
  const [state, setState]=useState(false)
   const {token}=useContext(tokenContexte)
  return <>
  <div className="flex flex-col justify-center items-center w-full">
     <Header/>
     <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
         <div className=' flex flex-col items-start divgauche'> <DivGauche/> </div>
       <div className="w-3/4 px-2 h-full flex flex-col items-center justify-center nouvelledivdroite">
       <p className="text-start mb-2 flex flex-col justify-center items-center gap-y-4 position-relative -top-2 w-full">
       <div className='text-center bg-white p-4 font-italic w-full rounded-lg psaume'>Voici, oh ! qu’il est agréable, qu’il est doux Pour des frères de demeurer ensemble !<br/><br/><span className="bg-violet-700 text-white p-1 rounded-lg px-3 font-bold">Psaume 133 : 1</span></div>
       </p>
     
       <div className='w-full flex flex-col'>
    <div className='w-full flex flex-row justify-center bg-white'>
   
    </div>
    <div className="w-full flex flex-row justify-center items-center text-xs font-medium mb-2 gap-x-2"><span style={{backgroundColor:state ? '#80808085' : 'rgb(109 40 217)', color:state ? 'rgb(109 40 217)' : 'white'}} onClick={()=>{setState(false)}} className='btn p-2 bg-violet-700 text-xs rounded-xl font-medium'>Suggestion d'ami(e)s</span> {!token ? '' : <span style={{backgroundColor:!state ? '#80808085' : 'rgb(109 40 217)', color:!state ? 'rgb(109 40 217)' : 'white'}} onClick={()=>{setState(true)}} className='btn p-2 bg-gray-300 text-xs rounded-xl font-medium'>Demandes d'amitié</span>}
   {token ? '' :  <Link to={'/login'} style={{backgroundColor:'#80808085', color:'rgb(109 40 217)'}} className='btn p-2 bg-gray-300 text-xs rounded-xl font-medium text-decoration-none'>Demandes d'amitié</Link>}
    </div>
     {!state ? <AmitieSuggestion/> : <AmitieDemande/>}
   </div>
 
       </div>
        
     </div>
 
    </div>
 
 <BackToTop/>
 <BottomBar/>
 </>
}
