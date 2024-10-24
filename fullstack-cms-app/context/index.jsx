import { createContext, useState, useContext } from "react";

const AppContext = createContext()

export function AppWrapper({ children }) {
  const [isLogged, setIsLogged] = useState()

  return (
    <AppContext.Provider value={{ isLogged, setIsLogged }} >{children}</AppContext.Provider>
  )



}

export function useAppContext() {
  return useContext(AppContext)
}