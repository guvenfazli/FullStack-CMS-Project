"use client"
import { useEffect, useState } from "react"
import StatsData from "./Stats/StatsData"
import UserTable from "./UserTable/userTable"
import AuthCheck from "@/utils/authCheck"
import io from "socket.io-client"

export default function HomePage() {

  const [socket, setSocket] = useState()

  useEffect(() => {
    const connectedSocket = io('http://localhost:8080/homePage')
    AuthCheck()
    setSocket(connectedSocket)

    return () => {
      connectedSocket.disconnect()
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