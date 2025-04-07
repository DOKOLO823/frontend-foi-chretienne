import { Header } from '../components/header';
import fc from '../icons/images/fc.jpg';
import { Link, useNavigate } from "react-router-dom";
import left from '../icons/images/left.png';

export default function FormDon() {
    const navigate=useNavigate()
    return (
      <>
       <div className="h-full w-full flex flex-col justify-center items-center w-full">
       <Header/>
       <div className="flex flex-col justify-center px-3 py-12 mt-10 loginform">
       <span onClick={()=>{navigate(-1)}} className='cursor-pointer'><img className='float-left' style={{height:'16px'}} src={left} alt="retour premiers amis" /></span>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex flex-row justify-center items-center gap-x-2 mt-3">
            <img style={{height:'35px',borderRadius:'8px'}}
              alt="logo foi chretienne"
              src={fc}
            />
            <span className="font-bold text-violet-700 text-xl">FOI CHRÉTIENNE</span>
            </div>
            <div className='text-center mt-8 bg-white p-4 font-italic w-full rounded-lg position-relative -top-2 psaume'>Que chacun donne comme il l'a décidé dans son cœur, sans regret ni contrainte, car Dieu aime celui qui donne avec joie.<br/><br/><span className="bg-violet-700 text-white p-1 rounded-lg px-3 font-bold">2 Corinthiens 9 : 7</span></div>

            <h2 className="mt-10 text-center text-xl font-bold tracking-tight text-violt-700">
              Chaque don est très précieux, il nous permet de maintenir et améliorer cette plateforme chrétienne pour la gloire du seigneur.
            </h2>
          </div>
  
          <div className="mt-10 w-full">
            <form action="#" method="POST" className="space-y-6 w-full">
              <div>
                <label htmlFor="montant" className="block text-sm/6 font-medium text-gray-900">
                  Montant de votre choix
                </label>
                <div className="mt-2">
                  <input
                    id="montant"
                    name="montant"
                    type="number"
                    placeholder='Entrer votre montant svp'
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-violet-700 focus:border-violet-700 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="nom" className="block text-sm/6 font-medium text-gray-900">
                 Votre nom (facultatif)
                </label>
                <div className="mt-2">
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                  
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-violet-700 focus:border-violet-700 sm:text-sm/6"
                  />
                </div>
              </div>
  
  
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Votre ddresse e-mail (facultatif)
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                  
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-violet-700 focus:border-violet-700 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>

              <div className="flex flex-row justify-between text-sm font-medium mb-4">
                    <span className="flex flex-row justify-center items-center gap-x-2">
                        <input type="checkbox" /><span>Je reste anonyme</span>
                    </span>
                  </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-violet-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:violet-700 "
                >
                  Procéder au don
                </button>
              

              </div>
            </form>
  
          </div>
        </div>
    
       </div>
       </>
    )
  }
  