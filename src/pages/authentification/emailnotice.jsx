import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export function EmailNotice(){

  const {email}=useParams('email')
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [erreur, setErreur]=useState('')

const resendLink=(event)=>{
event.preventDefault()

axios.post(`${process.env.REACT_APP_BACKEND_URL}/resend-link-verify`, {email}).then((res)=>{
  console.log(res.data)
    if(res.data.statut=='500'){
      setErreur(res.data.message)
      setLoading(false)
    }
    else if (res.data.statut=='200'){
      setErreur(res.data.message)
      setLoading(false)
    }
  })
}

    return <>
     <div class="container">
 
  <div class="row">
    <div class="alert alert-success col-md-12" role="alert" id="notes">
      <h4>NOTES</h4>
      <ul>
        <li>Nous venons de vous envoyer un lien par mail. Pour activer votre compte, cliquez dessus.</li>
        <li>Si vous n'avez pas recu de lien, cliquez sur le bouton "Envoyer encore le lien".</li>
      </ul>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12">
      <div class="jumbotron text-center">
        <h2 className="mb-3">Verifiez vos mails et cliquez sur le lien de verification pour activer votre compte !</h2>
        <p className="text-center text-red-700 font-medium">{erreur}</p>
        <form onSubmit={()=>{resendLink();setLoading(true)}}>
        <div class="col-md-9 col-sm-12">
            <div class="form-group form-group-lg">
            <button
       
       type="submit"
       className="flex flex-row gap-x-2 items-center w-full justify-center rounded-md bg-violet-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:violet-700 "
     >
      <span>Envoyer encore le lien</span>
       <ClipLoader color={color}  loading={loading}  size={30}
      />
     </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
</div>
    

    </>
}