"use client"
import Projects from "./ProjectTable/Projects"
import StatShowcase from "./ProjectStats/StatShowcase"
import { useEffect, useState } from "react"
import io from "socket.io-client"

export default function ProjectsPage() {

  const [socket, setSocket] = useState()

  useEffect(() => {
    const connectedSocket = io('http://localhost:8080/projectsPage')
    setSocket(connectedSocket)


    return () => {
      connectedSocket.disconnect()
    }
  }, [])


  if (socket) {
    return (
      <div className="border">
        <StatShowcase socket={socket} />
        <Projects socket={socket} />
      </div>
    )
  }
}