import { useNavigate } from "react-router-dom"
import left from '../icons/images/left.png';
import fc from '../icons/images/fcf.jpg';
import { BackToTop } from "../components/backToTop";

export function Description()
{
    const navigate=useNavigate()

    return <>
    <section class="bg-white dark:bg-gray-900">
    <span onClick={()=>{navigate(-1)}} className='cursor-pointer px-8 w-full mb-3 position-relative -right-5 top-4'><img className='float-left' style={{height:'16px'}} src={left} alt="" /></span>
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl text-3xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white text-violet-700">Foi chrétienne</h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg text-sm dark:text-gray-400">Le réseau social des enfants de Dieu.</p>
        
        </div>
        <div class=" lg:mt-0 lg:col-span-5 lg:flex flex flex-col items-center">
            <img src={fc} alt="mockup"/>
        </div>                
    </div>

    
<h2 class="text-4xl font-extrabold dark:text-white text-center mt-3">Qu'est ce que Foi chrétienne ?</h2>
<p class="my-4 text-lg text-gray-500 p-3"><span className="text-violet-700 font-medium">Foi chrétienne</span> est un réseau social chrétien qui permet à tous ceux qui aiment notre Seigneur JESUS-CHRIST d'entretenir mutuellement leurs fois et de rester connectés à Dieu. Ce réseau social chrétien est alors un lieu propre et responsable sans contenus obscènes ou dépravants mais qui honorent les valeurs chrétiennes.</p>

<h2 class="text-4xl font-extrabold dark:text-white text-center mt-3">Pourquoi choisir Foi chrétienne ?</h2>
<p class="my-4 text-lg text-gray-500 p-3">Les réseaux sociaux que nous connaissons aujourd'hui contiennent des contenus dépravants, obscènes, des fakes news et bien d'autres vices qui vont à l'encontre des valeurs chrétiennes déroutant ainsi la jeunesse de la voie du seigneur.<br/> Au contraire,  <span className="text-violet-700 font-medium">Foi chrétienne</span> est un réseau social qui prône les valeurs chrétiennes fortes telles que l'AMOUR et le PARDON. Ainsi, choisir <span className="text-violet-700 font-medium">le réseau social des enfants de Dieu</span> c'est choisir grandir dans la foi et faire un usage responsable de internet et des réseaux sociaux.</p>

<h2 class="text-3xl font-extrabold dark:text-white text-center mt-3">Que peut-on faire sur Foi chrétienne ?</h2>
<p class=" text-lg text-gray-500 p-3">Sur <span className="text-violet-700 font-medium">FOI CHRETIENNE</span>, on peut :</p>


<ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 p-3 position-relative -top-4">
    <li class="flex items-start">
        <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 shrink-0 mt-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>
        Partager des messages édifiants
    </li>
        <li class="flex items-start">
            <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 shrink-0 mt-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            Lancer des sujets de prières
        </li>
    <li class="flex items-start">
        <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 shrink-0 mt-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>
        Créer ou rejoindre des groupes privés et publics autour des thémes qui vous intéressent
    </li>

    <li class="flex items-start">
        <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 shrink-0 mt-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>
        Rédiger des méditations et des sujets de prières; Organiser des prières en directs (en visioconférence). Tout ceci au sein des groupes.
    </li>

    <li class="flex items-start">
        <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 shrink-0 mt-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>
        Discuter avec des frères et soeurs en Christ 
    </li>

    <li class="flex items-start">
        <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 shrink-0 mt-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>
        Suivre de la musique chrétienne et des vidéos de prédication
    </li>

    <li class="flex items-start">
        <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 shrink-0 mt-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>
        D'autres mises à jour sont en cours.
    </li>
  
</ul>

<h2 class="text-3xl font-extrabold dark:text-white text-center mt-3">Bon à savoir !</h2>
<p class=" text-lg text-gray-500 p-3">Vous pouvez facilement signaler une publication non conforme à cette plateforme et elle sera automatiquement supprimée apres 03 Signalements.</p>

<h2 class="text-3xl font-extrabold dark:text-white text-center my-3">Les fondateurs de Foi chrétienne</h2>



<div className="flex flex-row flex-wrap justify-center items-center">
<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-3 m-3">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Le Seigneur JESUS CHRIST DE NAZARETH</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Nous rendons grâce à JESUS CHRIST car il est le premier fondateur de FOI CHRETIENNE. En effet, sans ce dernier, le réseau social des enfants de Dieu n'aurait jamais vu le jour !</p>
  
</div>

<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-3 m-3">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">ING Dokolo yvan</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className="font-medium">Rôle </span>: PDG et développeur fullstack de FOI CHRETIENNE <br/> <span className="font-medium">Métier :</span> Elève ingénieur en génie logiciel</p>
  
</div>

<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-3 m-3">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Assouga Roland</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className="font-medium">Rôle </span>: Analyste <br/> <span className="font-medium">Métier :</span> Prêtre étudiant</p>
  
</div>

<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-3 m-3">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Devid bito</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className="font-medium">Rôle </span>: Responsable de la communication <br/> <span className="font-medium">Métier :</span> Elève ingénieur en énergie renouvelable</p>
  
</div>

<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-3 m-3">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Diengue Rousvelt</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className="font-medium">Rôle </span>: Analyste <br/> <span className="font-medium">Métier :</span> Elève ingénieur en génie logiciel</p>
  
</div>

<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 m-4">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Da'awe nathaniel</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className="font-medium">Rôle </span>: Responsable Marketing <br/> <span className="font-medium">Métier :</span> Elève ingénieur en génie logiciel</p>
  
</div>


</div>

</section>

 <BackToTop/>
    </>
}