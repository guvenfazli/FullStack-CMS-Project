"use client"
import Logo from "@/assets/Vector.png"
import Image from "next/image"
import token from "@/utils/authCheck"
import { useState } from "react"

export default function Header() {
  const user = token()
  const [isMenu, setIsMenu] = useState(false)


  return (
    <div className="flex justify-between p-5 bg-gray-900 relative">
      <div className="flex items-center">
        <Image src={Logo} alt="Logo" className="mr-3"></Image>
        <p className="text-white font-semibold text-lg">Laravel Nova</p>
      </div>


      <div>
        <input className="px-4 py-1 bg-gray-700 text-white w-96 rounded-2xl" placeholder="Search for Projects"></input>
      </div>

      <div className="flex flex-row items-center justify-center">
        <p className="text-lg text-gray-300 mr-2">{user.name}</p>
        <button onClick={() => setIsMenu(prev => !prev)}>+</button>

        <div className={`${!isMenu ? 'opacity-0 invisible' : 'opacity-100'} flex flex-col bg-gray-700 rounded-md px-4 py-2 absolute right-5 top-14 duration-100 `}>
          <button>Profile</button>
          <button>Log Out</button>
        </div>

      </div>
    </div>
  )
}