"use client"
import { lazy, Suspense, useEffect, useState } from "react"
import io from "socket.io-client"
import Projects from "./ProjectTable/Projects"
import LoadingComp from "../Loading/LoadingComp"
import RouteProtection from "@/utils/routeProtection"


export default function ProjectsPage() {

  const [socket, setSocket] = useState()


  useEffect(() => {
    const connectedSocket = io('http://localhost:8080/projectsPage') // Socket Connection for live updates if a new project adds in.
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