import { createContext, useState } from "react";

export const tokenContexte=createContext();

export const TokenProvider=({children})=>{
    const [token, setToken]=useState(localStorage.getItem('token_foi_chretienne') ? JSON.parse(localStorage.getItem('token_foi_chretienne')) : null);
    const addToken=(t)=>{
        setToken(t)
    }
    return <tokenContexte.Provider value={{token, addToken}}> {children} </tokenContexte.Provider>
}