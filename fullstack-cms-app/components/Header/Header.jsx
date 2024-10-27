"use client"
import SearchBar from "./Searchbar"
import HeaderUserMenu from "./HeaderUserMenu"
import HeaderUserResponsiveMenu from "./HeaderUserResponsiveMenu"
import Logo from "@/assets/Vector.png"
import Image from "next/image"
import { useState } from "react"
import { useAppContext } from "@/context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header() {
  const { isLogged } = useAppContext()

  const [isMenu, setIsMenu] = useState(false)
  const [isResponsiveMenu, setIsResponsiveMenu] = useState(false)

  if (isLogged) {
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

        <div onClick={() => setIsMenu(prev => !prev)} className="flex flex-row items-center justify-center max-sm:hidden hover:cursor-pointer">
          <Avatar className="max-[700px]:hidden">
            <AvatarImage src={`http://localhost:8080/${isLogged.userPp}`} />
            <AvatarFallback>PP</AvatarFallback>
          </Avatar>
          <p className="text-lg text-gray-300 ml-2 mr-2">{isLogged && isLogged.name}</p>
          <button>+</button>
          <HeaderUserMenu isMenu={isMenu} user={isLogged} setIsMenu={setIsMenu} />

        </div>
      </div>
    )
  }
}
