"use client"
import Projects from "./ProjectTable/Projects"
import { lazy, Suspense, useEffect, useState } from "react"
import LoadingComp from "../Loading/LoadingComp"
import io from "socket.io-client"
import RouteProtection from "@/utils/routeProtection"


export default function ProjectsPage() {

  const [socket, setSocket] = useState()


  useEffect(() => {
    const connectedSocket = io('http://localhost:8080/projectsPage')
    setSocket(connectedSocket)
    RouteProtection()

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