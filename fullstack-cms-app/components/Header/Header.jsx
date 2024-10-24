"use client"
import HeaderUserMenu from "./HeaderUserMenu"
import HeaderUserResponsiveMenu from "./HeaderUserResponsiveMenu"
import Logo from "@/assets/Vector.png"
import Image from "next/image"
import token from "@/utils/authCheck"
import { useAppContext } from "@/context"
import { useEffect, useState } from "react"


export default function Header() {
  const [user, setUser] = useState()
  const { isLogged } = useAppContext()
  console.log(isLogged)
  useEffect(() => {
    if (isLogged) {
      setUser(token())
    }
  }, [isLogged])



  const [isMenu, setIsMenu] = useState(false)
  const [isResponsiveMenu, setIsResponsiveMenu] = useState(false)

  if (user) {
    return (
      <div className="flex justify-between p-5 bg-gray-900 relative max-sm:justify-around">

        <div className="hidden items-center justify-center max-sm:flex">
          <button onClick={() => setIsResponsiveMenu(prev => !prev)}>Menu</button>
          <HeaderUserResponsiveMenu isResponsiveMenu={isResponsiveMenu} user={user} />
        </div>

        <div className="flex items-center max-sm:hidden">
          <Image src={Logo} alt="Logo" className="mr-3"></Image>
          <p className="text-white font-semibold text-lg">Laravel Nova</p>
        </div>


        <div>
          <input className="px-4 py-1 bg-gray-700 text-white w-96 rounded-2xl  max-[470px]:w-64 max-[350px]:w-48" placeholder="Search for Projects"></input>
        </div>

        <div className="flex flex-row items-center justify-center max-sm:hidden">

          <p className="text-lg text-gray-300 mr-2">{user && user.name}</p>
          <button onClick={() => setIsMenu(prev => !prev)}>+</button>
          <HeaderUserMenu isMenu={isMenu} user={user} setUser={setUser} />

        </div>
      </div>
    )
  }
}
