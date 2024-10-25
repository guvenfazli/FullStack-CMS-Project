import { useState } from "react"
import Dashboard from "./Dashboard"
import Resources from "./Resources"

export default function NavBar() {

  const [isDashBoard, setIsDashBoard] = useState(false)
  const [isResources, setIsResources] = useState(false)

  return (
    <div>
      <div className="mb-7">
        <div onClick={() => setIsDashBoard(prev => !prev)} className="flex justify-between items-start hover:cursor-pointer">
          <button className={`${isDashBoard && "text-gray-600"} duration-100 hover:text-gray-500`}>Dashboard</button>
          <button className={`${!isDashBoard ? 'rotate-0' : 'rotate-90 text-gray-600'} duration-100 hover:text-gray-500`}>{!isDashBoard ? '+' : 'x'}</button>
        </div>
        <Dashboard isOpen={isDashBoard} />
      </div>

      <div>
        <div onClick={() => setIsResources(prev => !prev)} className="flex items-start justify-between hover:cursor-pointer">
          <button className={`${isResources && "text-gray-600"} duration-100 hover:text-gray-500`}>Resources</button>
          <button className={`${!isResources ? 'rotate-0' : 'rotate-90 text-gray-600'} duration-100 hover:text-gray-500`}>{!isResources ? '+' : 'x'}</button>
        </div>
        <Resources isOpen={isResources} />
      </div>
    </div>
  )
}