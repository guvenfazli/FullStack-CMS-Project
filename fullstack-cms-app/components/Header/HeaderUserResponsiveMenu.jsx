import { useState } from "react"
import Link from "next/link"
import Dashboard from "../NavBar/Dashboard"
import Resources from "../NavBar/Resources"
import Notifications from "./Notifications"
import { useAppContext } from "@/context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function HeaderUserResponsiveMenu({ isResponsiveMenu, user, setIsResponsiveMenu, socket }) {
  const { isLogged } = useAppContext()
  const [isDashBoard, setIsDashBoard] = useState(false)
  const [isResources, setIsResources] = useState(false)

  function closeMenu() {
    setIsResponsiveMenu(false)
    setIsDashBoard(false)
    setIsResources(false)
  }

  return (
    <div onMouseLeave={() => closeMenu()} className={`${!isResponsiveMenu ? 'opacity-0 invisible' : 'opacity-100'} flex flex-col items-start bg-gray-700 rounded-md px-4 py-2 absolute left-5 top-14 duration-100 `}>
      <div className="flex w-full mb-5 justify-between items-center">
        <Avatar>
          <AvatarImage src={`http://localhost:8080/${isLogged.userPp}`} />
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>

        <p>{isLogged.name}</p>
      </div>
      {user && <Link className="mb-2 hover:text-gray-500 duration-100" href={`/users/${user.userId}`}>Profile</Link>}
      <button className="mb-2 hover:text-gray-500 duration-100">My Tasks</button>
      <button className="hover:text-gray-500 duration-100">Log Out</button>

      <div className="mt-3 w-full">
        <div onClick={() => setIsDashBoard(prev => !prev)} className="flex justify-between items-start hover:cursor-pointer">
          <button className={`${isDashBoard && "text-gray-600"} hover:text-gray-500 duration-100`}>Dashboard</button>
          <button className={`${!isDashBoard ? 'rotate-0' : 'rotate-90 text-gray-600'} duration-100 hover:text-gray-500`}>{!isDashBoard ? '+' : 'x'}</button>
        </div>
        <Dashboard isOpen={isDashBoard} />
      </div>

      <div className="mt-3">
        <div onClick={() => setIsResources(prev => !prev)} className="flex items-start justify-between hover:cursor-pointer">
          <button className={`${isResources && "text-gray-600"}  duration-100 hover:text-gray-500`}>Resources</button>
          <button className={`${!isResources ? 'rotate-0' : 'rotate-90 text-gray-600'} duration-100 hover:text-gray-500`}>{!isResources ? '+' : 'x'}</button>
        </div>
        <Resources isOpen={isResources} />
      </div>

      <div className="flex w-full justify-center items-center">
        <Notifications isLogged={isLogged} socket={socket} />
      </div>
    </div>
  )
}