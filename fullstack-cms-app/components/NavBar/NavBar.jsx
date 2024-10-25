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
          <button className={`${isDashBoard && "mb-5"}`}>Dashboard</button>
          <button className={`${!isDashBoard ? 'rotate-0' : 'rotate-90'} duration-75`}>{!isDashBoard ? '+' : 'x'}</button>
        </div>
        <Dashboard isOpen={isDashBoard} />
      </div>

      <div>
        <div onClick={() => setIsResources(prev => !prev)} className="flex items-start justify-between hover:cursor-pointer">
          <button className={`${isResources && "mb-5"}`}>Resources</button>
          <button className={`${!isResources ? 'rotate-0' : 'rotate-90'} duration-75`}>{!isResources ? '+' : 'x'}</button>
        </div>
        <Resources isOpen={isResources} />
      </div>
    </div>
  )
}