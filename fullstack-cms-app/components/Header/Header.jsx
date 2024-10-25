"use client"
import SearchBar from "./Searchbar"
import HeaderUserMenu from "./HeaderUserMenu"
import HeaderUserResponsiveMenu from "./HeaderUserResponsiveMenu"
import Logo from "@/assets/Vector.png"
import Image from "next/image"
import { useState } from "react"
import { useAppContext } from "@/context"

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

        <div className="flex flex-row items-center justify-center max-sm:hidden">

          <p className="text-lg text-gray-300 mr-2">{isLogged && isLogged.name}</p>
          <button onClick={() => setIsMenu(prev => !prev)}>+</button>
          <HeaderUserMenu isMenu={isMenu} user={isLogged} setIsMenu={setIsMenu} />

        </div>
      </div>
    )
  }
}
