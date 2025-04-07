import { Header } from '../components/header';
import docta from '../images/docta.jpg';
import left from '../icons/images/left.png';
import { useContext, useEffect, useState } from 'react';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
// Import Interfaces`
import { ICountry, IState, ICity } from 'country-state-city'
import { userContexte } from '../contexte/userContexte';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { tokenContexte } from '../contexte/tokenContexte';
import { Profile } from './profile';
import { Skeleton } from "@mui/material"

export function EditProfileSkeleton()
{
    return <>
   <div className="flex flex-col justify-center items-center w-full">
   
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
      
      <div className="w-3/4 px-2 h-full flex flex-col items-center justify-center nouvelledivdroite">
      <div className="h-full flex flex-row justify-center flex-wrap items-center gap-4 pb-24 w-full">
       
       

<div class="w-full formeditprofil">

  <div class="form-group">
            <label for="profiltof" class="block  text-sm font-medium text-gray-900">Photo de profile :</label>
            <Skeleton height='10em' width='30%'></Skeleton>
</div>

<div class="form-group">
            <label for="couverturetof" class="block text-sm font-medium text-gray-900">Photo de couverture :</label>
            <Skeleton height='10em' width='30%'></Skeleton>
</div>

<div class="mb-5">
    <label for="verset" class="block mb-2 text-sm font-medium text-gray-900 ">Verset préféré</label>
    <Skeleton height='6em' width='100%'></Skeleton>
  </div>
  
  <div class="mb-5">
    <label for="pseudo" class="block mb-2 text-sm font-medium text-gray-900">Pseudonyme</label>
    <Skeleton height='4em' width='100%'></Skeleton>
  </div>

<div class="mb-5">
    <label for="nom" class="block mb-2 text-sm font-medium text-gray-900">Nom</label>
    <Skeleton height='4em' width='100%'></Skeleton>
  </div>

  <div class="mb-5">
    <label for="prenom" class="block mb-2 text-sm font-medium text-gray-900">Prénom</label>
    <Skeleton height='4em' width='100%'></Skeleton>
  </div>

  {/* <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
  </div> */}
 {/* sexe  */}
  <div class="mb-5">
  <label for="sexe" class="block mb-2 text-sm font-medium text-gray-900">Sexe</label>
  <Skeleton height='4em' width='100%'></Skeleton>
    
  </div>
  {/* date de naissance  */}
  <div class="mb-5">
    <label for="naissance" class="block mb-2 text-sm font-medium text-gray-900">date de naissance</label>
    <Skeleton height='4em' width='100%'></Skeleton>
  </div>
  {/* pays  */}
  <div class="mb-5">
  <label for="pays" class="block mb-2 text-sm font-medium text-gray-900">Pays de résidence</label>
  <Skeleton height='4em' width='100%'></Skeleton>
  </div>

  {/* ville  */}
  <div class="mb-5">
  <label for="ville" class="block mb-2 text-sm font-medium text-gray-900">Ville de résidence</label>
  <Skeleton height='4em' width='100%'></Skeleton>
  </div>

  <div class="mb-5">
    <label for="quartier" class="block mb-2 text-sm font-medium text-gray-900">Quartier</label>
    <Skeleton height='4em' width='100%'></Skeleton>
  </div>

  <div class="mb-5">
    <label for="profession" class="block mb-2 text-sm font-medium text-gray-900">Profession</label>
    <Skeleton height='4em' width='100%'></Skeleton>
  </div>

  <div class="mb-5">
    <label for="telephone" class="block mb-2 text-sm font-medium text-gray-900">Téléphone</label>
    <Skeleton height='4em' width='100%'></Skeleton>
  </div>

  
  <Skeleton height='4.5em' width='100%'></Skeleton>

</div> 


      </div>

      </div>
       
    </div>

   </div>

<BackToTop/>
<BottomBar/>

    </>
}