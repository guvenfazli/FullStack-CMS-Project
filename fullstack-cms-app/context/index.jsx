import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AuthCheck from "@/utils/authCheck";
const AppContext = createContext()

export function AppWrapper({ children }) {
  const [isLogged, setIsLogged] = useState()

  useEffect(() => {
    AuthCheck().then(resp => {
      setIsLogged(jwtDecode(resp.user))
    })
  }, [])

  return (
    <AppContext.Provider value={{ isLogged, setIsLogged }} >{children}</AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}

