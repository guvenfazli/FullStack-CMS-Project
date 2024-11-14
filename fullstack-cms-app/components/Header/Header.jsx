"use client"
import SearchBar from "./Searchbar"
import HeaderUserMenu from "./HeaderUserMenu"
import HeaderUserResponsiveMenu from "./HeaderUserResponsiveMenu"
import Notifications from "./Notifications"
import Logo from "@/assets/Vector.png"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAppContext } from "@/context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { notificationIcon, pendingNotificationIcon } from "../Icons/Icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import io from "socket.io-client"

export default function Header() {
  const { isLogged } = useAppContext()
  const [socket, setSocket] = useState()
  const [isMenu, setIsMenu] = useState(false)
  const [isResponsiveMenu, setIsResponsiveMenu] = useState(false)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (isLogged) {
      const connectedSocket = io('http://localhost:8080/notifs')
      setSocket(connectedSocket)
    }
  }, [isLogged])


  if (isLogged && socket) {
    return (
      <div className="flex justify-between p-5 bg-gray-900 relative max-sm:justify-around z-10">

        <div className="hidden items-center justify-center max-sm:flex">
          <button onClick={() => setIsResponsiveMenu(prev => !prev)}>Menu</button>
          <HeaderUserResponsiveMenu isResponsiveMenu={isResponsiveMenu} user={isLogged} setIsResponsiveMenu={setIsResponsiveMenu} />
        </div>

        <div className="flex items-center max-sm:hidden">
          <Image src={Logo} alt="Logo" className="mr-3"></Image>
          <p className="text-white font-semibold text-lg">Laravel Nova</p>
        </div>


        <SearchBar />

        <div className="flex flex-row items-center justify-evenly w-1/6 max-sm:hidden">
          <div className="relative">
            <Notifications socket={socket} isLogged={isLogged} />
          </div>

          <div onClick={() => setIsMenu(prev => !prev)} className="flex flex-row items-center justify-center max-sm:hidden hover:cursor-pointer">
            <Avatar className="max-[700px]:hidden ml-5">
              <AvatarImage src={`http://localhost:8080/${isLogged.userPp}`} />
              <AvatarFallback>PP</AvatarFallback>
            </Avatar>
            <p className="text-lg text-gray-300 ml-2 mr-2">{isLogged && isLogged.name}</p>
            <button>+</button>
          </div>

          <HeaderUserMenu isMenu={isMenu} user={isLogged} setIsMenu={setIsMenu} />

        </div>
      </div>
    )
  }
}
