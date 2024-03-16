import React,{useState} from 'react'
import { createContext } from 'react'
export const Authcontext = createContext()
export default function Authcontextprovider({children}) {
    const [username, setUsername] = useState(localStorage.getItem("username"))
    const [isLogin,setIsLogin] =useState(false)

  return (
    <Authcontext.Provider value={{username,setUsername,isLogin,setIsLogin}}>
        {children}
    </Authcontext.Provider>
  )
}

