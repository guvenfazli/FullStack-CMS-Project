"use client"
import { useEffect, useState } from "react"
import StatsData from "./Stats/StatsData"
import UserTable from "./UserTable/userTable"
import io from "socket.io-client"

export default function HomePage() {

  const [socket, setSocket] = useState()

  useEffect(() => {
    const connectedSocket = io('http://localhost:8080/homePage')

    setSocket(connectedSocket)

    return () => {
      socket.disconnect()
    }
  }, [])

  if (socket) {
    return (
      <div>
        <StatsData socket={socket} />
        <UserTable socket={socket} />
      </div>
    )
  }

}