import { Header } from '../components/header';
import left from '../icons/images/left.png';
import close from '../icons/images/close.png';
import { useContext, useState } from 'react';
import { BottomBar } from '../components/bottomBar';
import { BackToTop } from '../components/backToTop';
import { DivGauche } from '../part/divGauche';
import { Link, useNavigate } from 'react-router-dom';
import { tokenContexte } from '../contexte/tokenContexte';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { NotificationSkeleton } from '../skeletons/notification';
export function Notification()
{
    const tab=['','','','','','','','','','','','','','','','']
    const navigate=useNavigate();
    const queryClient=useQueryClient();

    const {token}=useContext(tokenContexte)
//  liste des notifs 
    const {data:notifications,isLoading}=useQuery({
      queryKey:['notifications'],
      queryFn:()=>token ? axios.get(`${process.env.REACT_APP_BACKEND_URL}/notifications`,{
        headers:{
          "Authorization": "Bearer "+token
        }
      }) : navigate('/login')
    })

    // supprimer une notifications
    const [idnotification, setIdnotification]=useState()
    const mutationdeletenotification=useMutation({
        mutationFn:()=>{
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/delete-notification`,{idnotification},{
                headers:{
                  "Authorization": "Bearer "+token,
                }
              })
        },
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
          },
          onError:()=>navigate('/login')
      })

      const deletenotification=()=>{
        mutationdeletenotification.mutate()
      }
      

    return <>
   
   <div className="flex flex-col justify-center items-center w-full">
    <Header/>
    <div style={{top:'80px'}} className='position-relative flex flex-row justify-between items-start w-full deuxiemedivnavbar'>
        <div className=' flex flex-col items-start divgauche'> <DivGauche/> </div>
      <div className="w-3/4 h-full flex flex-col items-center justify-center nouvelledivdroite">
      <p className="text-start mb-3 flex flex-row justify-start items-center gap-x-4 w-full pl-3"><span onClick={()=>{navigate(-1)}} className='cursor-pointer'><img style={{height:'16px'}} src={left} alt="" /></span></p>
      <p className="text-center mb-3 text-violet-700 font-medium border-solid border-1 border-violet-700 rounded-lg w-11/12">Notifications</p>
      <div className="h-full flex flex-row justify-center flex-wrap items-center gap-4 w-full pb-24">
       
      
<div class="h-full flex flex-row justify-center flex-wrap items-center gap-3 pb-24 w-3/4 listediscussion">
    
    {
        notifications ? notifications?.data?.notifications?.map((e)=>{
            return <div class="w-full px-2">
            <div class="bg-white shadow-md rounded-lg overflow-hidden md:flex border-solid border-l-8 border-violet-700">
                <div class="w-full">
                    <div class="p-2 pr-1 md:p-5 bg-gray-100">
                    <button data-bs-toggle="modal" data-bs-target="#supprimerModal" onClick={()=>{setIdnotification(e?.id)}} class=""><img style={{height:'20px'}} src={close} alt="" /></button>
                        <div class="flex justify-between items-center">
                            <Link to={e?.lien} className='text-decoration-none hover:text-violet-700'>
                                <p class="font-bold text-sm">{e?.details}</p>
                                <div class="flex items-start">
                                   
                                    <span class="text-gray-700 text-xs">{e?.date}</span>
                                </div>
                            </Link>
    
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }):<NotificationSkeleton/>
    }
    
</div>

      </div>

      </div>
       
    </div>

   </div>

<BackToTop/>
<BottomBar/>

<div class="modal fade" id="supprimerModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="deleteModalLabel">Confirmer</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="mb-0">Voulez-vous vraiment supprimer cette notification ?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button onClick={deletenotification} type="button" class="btn btn-danger" data-bs-dismiss="modal" id="confirmDelete">Supprimer</button>
            </div>
        </div>
    </div>
</div>

    </>
}