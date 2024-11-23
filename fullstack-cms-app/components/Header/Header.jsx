"use client"
import { useEffect, useState } from "react"
import { useAppContext } from "@/context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SearchBar from "./Searchbar"
import HeaderUserMenu from "./HeaderUserMenu"
import HeaderUserResponsiveMenu from "./HeaderUserResponsiveMenu"
import Notifications from "./Notifications"
import Logo from "@/assets/Vector.png"
import Image from "next/image"
import io from "socket.io-client"

export default function Header() {
  const { isLogged } = useAppContext()
  const [socket, setSocket] = useState()
  const [isMenu, setIsMenu] = useState(false)
  const [isResponsiveMenu, setIsResponsiveMenu] = useState(false)


  useEffect(() => {
    if (isLogged) {
      const connectedSocket = io('http://localhost:8080/notifs') // Connects socket so user can get notifications.
      setSocket(connectedSocket)
    }
  }, [isLogged])


  if (isLogged && socket) {
    return (
      <div className="flex justify-between items-center p-5 bg-gray-900 relative max-sm:justify-around z-10">

        <div className="hidden items-center justify-center max-sm:flex">
          <button onClick={() => setIsResponsiveMenu(prev => !prev)}>Menu</button>
          <HeaderUserResponsiveMenu isResponsiveMenu={isResponsiveMenu} user={isLogged} setIsResponsiveMenu={setIsResponsiveMenu} socket={socket} />
        </div>

        <div className="flex items-center max-sm:hidden">
          <Image src={Logo} alt="Logo" className="mr-3"></Image>
          <p className="text-white font-semibold text-lg">Laravel Nova</p>
        </div>


        <SearchBar />

        <div className="flex flex-row items-center justify-evenly w-1/6 max-sm:hidden max-lg:w-1/4">
          <div className="relative max-md:hidden">
            <Notifications socket={socket} isLogged={isLogged} />
          </div>

          <div onClick={() => setIsMenu(prev => !prev)} className="flex flex-row items-center justify-center max-sm:hidden hover:cursor-pointer py-1 hover:bg-slate-700 duration-75 rounded-lg px-2">
            <Avatar className="max-[700px]:hidden">
              <AvatarImage src={`http://localhost:8080/${isLogged.userPp}`} />
              <AvatarFallback>PP</AvatarFallback>
            </Avatar>
            <p className="text-lg text-gray-300 ml-2 mr-2">{isLogged && isLogged.name}</p>
            <button>+</button>
          </div>

          <HeaderUserMenu isMenu={isMenu} user={isLogged} setIsMenu={setIsMenu} isLogged={isLogged} socket={socket} />

        </div>
      </div>
    )
  }
}
