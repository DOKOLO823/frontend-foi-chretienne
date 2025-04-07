import axios from "axios"
import { useQuery } from "react-query"

export function TotalUser(){

    const {data:users,isLoading:loadlesgroupes}=useQuery({
        queryKey:['all-users'],
        queryFn:()=> axios.get(`${process.env.REACT_APP_BACKEND_URL}/all-users`,{
        
       }) 
      
      })

    return <>
   <div className="mt-3 pl-2">

   {
        users ? <p>Total users : {users?.data?.users}</p> : 'En cours...'
    }
    
   </div>
    </>
}