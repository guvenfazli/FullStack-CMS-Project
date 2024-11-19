"use client"
import Projects from "./ProjectTable/Projects"
import { lazy, Suspense, useEffect, useState } from "react"
import { useAppContext } from "@/context"
import LoadingComp from "../Loading/LoadingComp"
import io from "socket.io-client"
import AuthCheck from "@/utils/authCheck"

export default function ProjectsPage() {

  const { isLogged } = useAppContext()
  const [socket, setSocket] = useState()


  useEffect(() => {
    const connectedSocket = io('http://localhost:8080/projectsPage')
    setSocket(connectedSocket)
    AuthCheck()

    return () => {
      connectedSocket.disconnect()
    }
  }, [])

  const LazyComp = lazy(() => import("./ProjectStats/StatShowcase"))



  if (socket) {
    return (
      <div>
        <Suspense fallback={<LoadingComp />}>
          <LazyComp socket={socket} />
        </Suspense>

        <Projects socket={socket} />
      </div>
    )
  }
}