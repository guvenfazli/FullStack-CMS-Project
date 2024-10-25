import { useState } from "react"
import Link from "next/link"
import Dashboard from "../NavBar/Dashboard"
import Resources from "../NavBar/Resources"
import { useAppContext } from "@/context"

export default function HeaderUserResponsiveMenu({ isResponsiveMenu, user }) {
  const { isLogged } = useAppContext()
  const [isDashBoard, setIsDashBoard] = useState(false)
  const [isResources, setIsResources] = useState(false)

  return (
    <div className={`${!isResponsiveMenu ? 'opacity-0 invisible' : 'opacity-100'} flex flex-col items-start bg-gray-700 rounded-md px-4 py-2 absolute left-5 top-14 duration-100 `}>
      <p className="mb-5">{isLogged.name}</p>
      {user && <Link className="mb-2" href={`/${user.userId}`}>Profile</Link>}
      <button className="mb-2">My Tasks</button>
      <button>Log Out</button>

      <div className="mt-3 w-full">
        <div onClick={() => setIsDashBoard(prev => !prev)} className="flex  justify-between hover:cursor-pointer">
          <button className={`${isDashBoard && "mb-5"}`}>Dashboard</button>
          <p>{!isDashBoard ? '+' : 'x'}</p>
        </div>
        <Dashboard isOpen={isDashBoard} />
      </div>

      <div className="mt-3">
        <div onClick={() => setIsResources(prev => !prev)} className="flex justify-between hover:cursor-pointer">
          <button className={`${isResources && "mb-5"}`}>Resources</button>
          <p>{!isResources ? '+' : 'x'}</p>
        </div>
        <Resources isOpen={isResources} />
      </div>
    </div>
  )
}