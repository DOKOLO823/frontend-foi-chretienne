import { useNavigate } from 'react-router-dom';
import left from '../icons/images/left.png';
export function VerificationGroupe(){
    const navigate=useNavigate()
    return <>
    <section class="bg-white dark:bg-gray-900 p-2 ">
    <span onClick={()=>{navigate(-1)}} className='cursor-pointer position-relative top-2 flex flex-row items-center text-violet-700'><img style={{height:'20px'}} src={left} alt="" /> &nbsp; retour</span>
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-md sm:text-center">
          <h4 class="mb-4 text-xl tracking-tight font-extrabold text-gray-900 sm:text-xl dark:text-white text-violet-700">Groupe crée avec succès</h4>
          <p class="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">Votre groupe a été crée avec succès. Nous l'examinons. Vous serez informés apres sa validation ! Pour l'instant, il n'est visible que par vous.</p>
         
         
            
         
      </div>
  </div>
</section>
    </>
}