import fc from '../icons/images/fc.jpg';
import eye from '../icons/images/eye.png'
import hidden from '../icons/images/hidden.png'
import { Link, useNavigate } from "react-router-dom";
import { Country, State, City }  from 'country-state-city';
import { useContext, useEffect, useState } from 'react';
import { tokenContexte } from '../contexte/tokenContexte';
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function Signup() {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  
  const navigate=useNavigate()
   const {token, addToken}=useContext(tokenContexte)
    useEffect(()=>{
      if(token){
        navigate('/')
      }
    },[])

    const [isoCode, setIsoCode]=useState('CM')
    const payss=Country.getAllCountries()
    const villes=City.getCitiesOfCountry(isoCode)
   

    const [nom, setNom]=useState('')
    const [prenom, setPrenom]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [passwordConfirm, setPasswordConfirm]=useState('')
    const [passwordConfirmError, setPasswordConfirmError]=useState('')
    const [emailUnique, setEmailUnique]=useState('')
    const [pays, setPays]=useState(isoCode)
    const [ville, setVille]=useState('Abong Mbang')

    const signup=(event)=>{
      event.preventDefault()
      setLoading(true)
    if(password==passwordConfirm){
      toast('Un instant svp...')
       axios.post(`${process.env.REACT_APP_BACKEND_URL}/creer-compte`, {nom,prenom,email,password,pays,ville}).then((res)=>{
        setLoading(false)
         if(typeof(res.data.message)!=undefined && res.data.message.includes('Duplicate entry')){
          setEmailUnique('Cette adresse e-mail existe deja !')
          setLoading(false)
         }
         if(res.data.statut=='200'){
          localStorage.setItem('token_foi_chretienne',JSON.stringify(res.data?.token))
          navigate('/verify-email')
         }
       }).catch((err)=>{
        setLoading(false)
        toast('Une erreur s\'est produite. Veuillez réessayer svp.')
       })
    }else{
      setPasswordConfirmError('Le mot de passe confirmé est différent du premier')
      setLoading(false)
    }
    }

    // look passowrd 
    const [lookpassword, setLookpassword]=useState(true)

    return (
      <>
      <ToastContainer/>
       <div className="h-full w-full flex flex-col justify-center items-center">
       <div className="flex flex-col justify-center px-3 py-12 loginform w-full">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex flex-row justify-center items-center gap-x-2">
            <img style={{height:'35px',borderRadius:'8px'}}
              alt="logo foi chretienne"
              src={fc}
            />
            <span className="font-bold text-violet-700 text-xl">FOI CHRÉTIENNE</span>
            </div>
            <h2 className="mt-10 text-center text-xl font-bold tracking-tight text-violt-700">
              Créer un compte<br/> <span className='text-xs font-medium position-relative -top-2'> c'est rapide et simple !</span>
            </h2>
          </div>
  
          <div className="mt-2 w-full">
            <form onSubmit={signup} className="space-y-6 w-full">
            <div>
                <label htmlFor="nom" className="block text-sm/6 font-medium text-gray-900">
                 Nom
                </label>
                <div className="mt-2">
                  <input
                   onChange={(e)=>{ setNom(e.target.value) }}
                    id="nom"
                    name="nom"
                    type="text"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-violet-700 focus:border-violet-700 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="prenom" className="block text-sm/6 font-medium text-gray-900">
                 Prenom
                </label>
                <div className="mt-2">
                  <input
                   onChange={(e)=>{ setPrenom(e.target.value) }}
                    id="prenom"
                    name="prenom"
                    type="text"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-violet-700 focus:border-violet-700 sm:text-sm/6"
                  />
                </div>
              </div>


                
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Addresse e-mail
                </label>
                <div className="mt-2">
                  <input
                   onChange={(e)=>{ setEmail(e.target.value) }}
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-violet-700 focus:border-violet-700 sm:text-sm/6"
                  />
                  <p className="text-sm text-red-700">{emailUnique}</p>
                </div>
              </div>
  
              <div>
                <div className="flex flex-row items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 position-relative top-1">
                   Mot de passe
                  </label>
                  <img onClick={()=>{setLookpassword(!lookpassword)}} src={lookpassword ? eye : hidden} className='h-6 position-relative right-4 top-10' alt="" />
                </div>
                <div className="mt-2 flex flex-row items-center">
                  <input
                   onChange={(e)=>{ setPassword(e.target.value) }}
                    id="password"
                    name="password"
                    type={lookpassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-violet-700 focus:border-violet-700 sm:text-sm/6"
                  />
                 
                </div>
             
              </div>

              <div>
                <div className="flex flex-row items-center justify-between">
                  <label htmlFor="confirmed_password" className="block text-sm/6 font-medium text-gray-900 position-relative top-1">
                   Confirmez le mot de passe
                  </label>
                </div>
                <div className="mt-2">
                  <input
                   onChange={(e)=>{ setPasswordConfirm(e.target.value) }}
                    id="confirmed_password"
                    name="cpassword"
                    type={lookpassword ? 'text' : 'password'}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-violet-700 focus:border-violet-700 sm:text-sm/6"
                  />
                  <p className="text-sm text-red-700">{passwordConfirmError}</p>
                </div>
              </div>

               {/* pays  */}
  <div class="mb-5">
  <label for="pays" class="block mb-2 text-sm font-medium text-gray-900">Pays de résidence</label>
  <select name='pays' onChange={(e)=>{setPays(e.target.value);setIsoCode(e.target.value)}} id="pays" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
{
    payss.map((p)=>{
        return <option selected={p.isoCode=='CM' && true} value={p.isoCode}>{p.name}</option>
    })
}
  </select>
  </div>

  {/* ville  */}
  <div class="mb-5">
  <label for="ville" class="block mb-2 text-sm font-medium text-gray-900">Ville de résidence</label>
  <select onChange={(e)=>{setVille(e.target.value)}} name='ville' id="ville" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  {
    villes.map((v)=>{
        return <option value={v.name}>{v.name}</option>
    })
}

  </select>
  </div>
  
              <div>

              <button
                  type="submit"
                  className="flex flex-row gap-x-2 items-center w-full justify-center rounded-md bg-violet-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:violet-700 "
                >
                 <span>S'inscrire</span>
                  <ClipLoader color={color}  loading={loading}  size={30}
                 />
                </button>
              

              </div>
            </form>
  
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Vous avez déjà un compte?{' '}
              <Link to={'/login'} className="font-semibold text-violet-600 hover:text-violet-700 underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
    
       </div>
       </>
    )
  }
  