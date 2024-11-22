import { createContext, useState, useContext, useEffect } from "react";
import AuthCheck from "@/utils/authCheck";
const AppContext = createContext()


export function AppWrapper({ children }) {
  const [isLogged, setIsLogged] = useState()

  useEffect(() => {
    AuthCheck().then(resp => {
      setIsLogged(resp.user)
    })
  }, [])

  return (
    <AppContext.Provider value={{ isLogged, setIsLogged }} >{children}</AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}

