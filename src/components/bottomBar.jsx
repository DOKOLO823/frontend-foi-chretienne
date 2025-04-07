import { Link } from "react-router-dom";

export function BottomBar(){
    return <>
    

<div class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 bottomBar hidden">
    <div class="grid h-full grid-cols-3 mx-auto font-medium pr-3 ">
        <Link style={{color:window.location.href.length<=23 ?"rgb(109 40 217 / var(--tw-bg-opacity, 1))":''}} to={'/'} class="inline-flex text-decoration-none flex-col items-center justify-center px-5 border-gray-200 border-x hover:bg-gray-50 hover:text-violet-700 dark:hover:bg-gray-800 group dark:border-gray-600">
        <i class="fa-solid fa-house hover:text-violet-700"></i>
            <span style={{fontSize:'x-small',color:window.location.href?.length<=30 ? "rgb(109 40 217 / var(--tw-bg-opacity, 1))":''}} class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-violet-700 z-10 dark:group-hover:text-violet-700 font-bold">Accueil</span>
        </Link>
        <Link style={{color:window.location.href.includes('groupe')?"rgb(109 40 217 / var(--tw-bg-opacity, 1))":''}} to={'/groupes'} class="inline-flex text-decoration-none flex-col items-center justify-center px-5 border-e border-gray-200 hover:bg-gray-50 hover:text-violet-700 dark:hover:bg-gray-800 group dark:border-gray-600">
        <i class="fa-solid fa-people-group hover:text-violet-700"></i>
            <span style={{fontSize:'x-small',color:window.location.href.includes('groupes')?"rgb(109 40 217 / var(--tw-bg-opacity, 1))":''}} class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-violet-700 z-10 dark:group-hover:text-violet-700 font-bold">Groupes</span>
        </Link>
        {/* <Link type="button" class="inline-flex text-decoration-none flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <i class="fa-solid fa-video hover:text-violet-700"></i>
            <span class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-violet-700 z-10 dark:group-hover:text-violet-700">Vidéos</span>
        </Link> */}
      
        {/* <Link type="button" class="inline-flex text-decoration-none flex-col items-center justify-center px-5 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 group border-x dark:border-gray-600">
        <i class="fa-solid fa-circle-info hover:text-violet-700"></i>
            <span class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-violet-700 z-10 dark:group-hover:text-violet-700">Annonces</span>
        </Link> */}

        <Link style={{color:window.location.href.includes('amitie')?"rgb(109 40 217 / var(--tw-bg-opacity, 1))":''}} to={'/amitie'} type="button" class="inline-flex position-relative right-1 text-decoration-none flex-col items-center justify-center px-5 border-gray-200 hover:bg-gray-50 hover:text-violet-700 dark:hover:bg-gray-800 group border-x dark:border-gray-600">
         <span className="flex flex-row "> <i class="fa-solid fa-user-group hover:text-violet-700"></i> </span>  
            <span style={{fontSize:'x-small',color:window.location.href.includes('amitie')?"rgb(109 40 217 / var(--tw-bg-opacity, 1))":''}} class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-violet-700 z-10 dark:group-hover:text-violet-700 font-bold">Amitiés</span>
        </Link>

       {/* <Link style={{color:window.location.href.includes('predication')?"rgb(109 40 217 / var(--tw-bg-opacity, 1))":''}}  to={'/predication'} type="button" class="inline-flex position-relative right-1 text-decoration-none flex-col items-center justify-center px-5 border-gray-200 hover:text-violet-700 hover:bg-gray-50 dark:hover:bg-gray-800 group border-x dark:border-gray-600">
          <i class="fa-solid fa-video hover:text-violet-700"></i>
            <span style={{fontSize:'x-small',color:window.location.href.includes('predication')?"rgb(109 40 217 / var(--tw-bg-opacity, 1))":''}} class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-violet-700 z-10 dark:group-hover:text-violet-700 font-bold">Prédications</span>
        </Link>

        <Link style={{color:window.location.href.includes('musique')?"rgb(109 40 217 / var(--tw-bg-opacity, 1))":''}} to={'/musique'} type="button" class="inline-flex position-relative right-1 text-decoration-none flex-col items-center justify-center px-5 border-gray-200 hover:bg-gray-50 hover:text-violet-700 dark:hover:bg-gray-800 group border-x dark:border-gray-600">
        <i class="fa-solid fa-music hover:text-violet-700"></i>
            <span style={{fontSize:'x-small',color:window.location.href.includes('musique')?"rgb(109 40 217 / var(--tw-bg-opacity, 1))":''}} class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-violet-700 z-10 dark:group-hover:text-violet-700 font-bold">Musiques</span>
        </Link> */}
       
    </div>
</div>

    </>
}