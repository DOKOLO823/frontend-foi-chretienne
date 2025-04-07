import { useContext, useEffect, useRef, useState } from "react";
import envoyer from '../icons/images/envoyer.png';
import left from '../icons/images/left.png';
import { Link, useNavigate, useParams } from "react-router-dom";
import { tokenContexte } from "../contexte/tokenContexte";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { userContexte } from "../contexte/userContexte";
import { DiscussionInboxSkeleton } from "../skeletons/discussionInbox";
import ClipLoader from 'react-spinners/ClipLoader';
import Pusher from "pusher-js";

export function DiscussionInbox(){
    const [message, setDirectcomment]=useState('')
    const {userstore}=useContext(userContexte)
    const navigate=useNavigate();
    // pour scroller vers le bas a chaque nouveau message 
    const messageEndRef=useRef(null);
   
    const queryClient=useQueryClient();
    const {id}=useParams('id')
    const {token}=useContext(tokenContexte)
//  liste des messages
    const {data:messages,isLoading}=useQuery({
      queryKey:['discussion','id'],
      queryFn:()=>token ? axios.get(`${process.env.REACT_APP_BACKEND_URL}/discussion/${id}`,{
        headers:{
          "Authorization": "Bearer "+token
        }
      }) : navigate('/login')
    })

    const [newmessage,setNewmessage]=useState()
    const [loading, setLoading]=useState(false)
    useEffect(()=>{
        messageEndRef.current?.scrollIntoView();
        setLoading(false)
    },[newmessage,messages])

    // envoyer un message 
    const idrecepteur=id
    const mutationsendmessage=useMutation({
        mutationFn:()=>{
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/envoi-message`,{idrecepteur,message},{
                headers:{
                  "Authorization": "Bearer "+token,
                }
              })
        },
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['discussion','id'] });
          },
          onError:()=>navigate('/login')
      })

      const sendMessage=()=>{
        document.getElementById('texteareasendmessage').value=null
        setLoading(true)
        mutationsendmessage.mutate()
      }

      // recevoir les messages en temps reel 
    const mutationactualise=useMutation({
        mutationFn:()=>{},
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['discussion','id'] });
          },
      })

      // supprimer message non lu 
      useEffect(()=>{
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/supprimer-nonlu`, {idrecepteur},{
          headers:{
              "Authorization": "Bearer "+token
            }
      }).then((res)=>{
          if(res.data?.statut=='200'){
         
          }else{
         
          }
        }).catch((err)=>{
         navigate('/login')
        })
      
      },[])

      // websocket 
        useEffect(()=>{
        
          Pusher.logToConsole = true;
      
          var pusher = new Pusher('2cab761eeee3a5f348a0', {
            cluster: 'mt1'
          });
      
          const channel = pusher.subscribe('my-channel');
          // Bind to an event
          channel.bind('my-event', (data) => {
           // Handle the new notification
            // setStatescroll(false)
            mutationactualise.mutate()
            // publications?.data?.pubs?.push(JSON.stringify(data?.message))
          });
         // Clean up the Pusher instance when the component unmounts
          return () => {
            pusher.unsubscribe('my-event');
            pusher.disconnect();
          };
      
        },[])

    return <>
    {
        messages ? <div class="h-screen flex flex-col">
        <p onClick={()=>{navigate(-1)}} className="text-start mb-2 flex flex-row justify-start items-center gap-x-1 pl-4 pt-1 cursor-pointer"><span><img style={{height:'16px'}} src={left} alt="" /></span> retour</p>
        <div className="flex flex-row justify-between items-center mx-auto bg-white rounded-lg shadow-lg  sm:py-2 sm:space-y-0 sm:space-x-3 w-full">
                    <Link to={'/profile/'+messages?.data?.interlocuteur?.id}
                class="w-full px-4 flex flex-row justify-start gap-x-3 items-center text-decoration-none">
                <div><img class="mx-auto h-12 w-12 rounded-full sm:mx-0 sm:shrink-0" src={process.env.REACT_APP_BACKEND_FILE+messages?.data?.interlocuteur?.pp} alt="avatar"/></div>
                <div class="text-center sm:text-left">
                    <div class="py-2 flex flex-col items-start text-decoration-none">
                        <span class=" text-black font-semibold text-sm">
                           {messages?.data?.interlocuteur?.nom[0]?.toUpperCase()+messages?.data?.interlocuteur?.nom?.slice(1)?.substring(0,30)} {messages?.data?.interlocuteur?.prenom?.substring(0,15)}
                        </span>
                        <span class="text-slate-500 text-start text-xs">
                        {messages?.data?.interlocuteur?.pseudo?.length>33 ? messages?.data?.interlocuteur?.pseudo?.substring(0,33)+'...' : messages?.data?.interlocuteur?.pseudo}
                        </span>
                    </div>
                   
                </div>
            </Link>
                </div>
    
        <div class="bg-gray-200 flex-1 overflow-y-scroll">
            <div className="p-2 border-solid border-b border-1 border-gray-300 text-center text-xs">Cette discussion est privée. N'ayez pas des propos qui vont à l'encontre des valeurs chrétiennes.</div>
           {
            messages?.data?.messages?.map((e)=>{
                return  <div class="px-4 py-2 mb-3">
              {userstore?.data?.id!=e?.expediteur_id && <>
                <Link to={'/profile/'+messages?.data?.interlocuteur?.id} class="flex items-center mb-2 text-decoration-none hover:text-violet-700">
                    <img class="w-8 h-8 rounded-full mr-2" src={process.env.REACT_APP_BACKEND_FILE+messages?.data?.interlocuteur?.pp} alt="User Avatar"/>
                    <div class="font-medium text-sm">
                        {messages?.data?.interlocuteur?.nom[0].toUpperCase()+messages?.data?.interlocuteur?.nom?.slice(1)?.substring(0,25)}&nbsp;
                        {messages?.data?.interlocuteur?.prenom?.substring(0,15)}
                        </div>
                </Link>
                <div className="text-xs">{e?.date}</div>
                <div class="bg-white rounded-lg p-2 shadow mb-4 max-w-sm">
                   {e?.message}
                </div>
              </>}
               {userstore?.data?.id==e?.expediteur_id && <>
                <div style={{justifyContent:'end'}} class="flex items-center">
                    <div class=" flex flex-col">
                    <div className="text-xs">{e?.date}</div>
                       <div className="bg-violet-800 text-white  rounded-lg p-2 shadow mr-2 max-w-sm"> {e?.message}</div>
                    </div>
                   <Link to={'/profile/'+userstore?.data?.id} className="text-decoration-none"> <img class="w-8 h-8 rounded-full" src={process.env.REACT_APP_BACKEND_FILE+userstore?.data?.pp} alt="User Avatar"/></Link>
                </div>
               </>}
            </div>
            })
           }
           <div ref={messageEndRef}/>
        </div>
        <div class="bg-gray-100 px-4 py-2">
            <div class="flex items-center">
                <textarea maxLength={5000} onChange={(e)=>{setDirectcomment(e.target.value)}} style={{fontSize:'small'}} className="w-full focus:border-violet-700 border-1 border-solid" name="" rows={1} id="texteareasendmessage"></textarea>
              <div className="flex flex-row">
              <button onClick={sendMessage} style={{display:document.getElementById('texteareasendmessage')?.value?.trim()?.length>0 ? 'flex' : 'none'}} class="pl-3">
                <img src={envoyer} style={{height:'30px'}} class="fa fa-send"></img>
          </button>
          <ClipLoader color={'rgb(109 40 217)'}  loading={loading}  size={30}/>
              </div>
            </div>
        </div>
    </div> : <DiscussionInboxSkeleton/>
    }
    </>
}