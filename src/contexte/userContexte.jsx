import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { tokenContexte } from "./tokenContexte";

export const userContexte=createContext();

export const UserProvider=({children})=>{
     const {token}=useContext(tokenContexte)
     const {data:userstore,isLoading}=useQuery({
            queryKey:['user'],
            queryFn:()=>token && axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`,{
                headers:{
                    "Authorization": "Bearer "+token
                  }
            }),
            enabled:Boolean(token)
          })
   
    return <userContexte.Provider value={{userstore}}> {children} </userContexte.Provider>
}