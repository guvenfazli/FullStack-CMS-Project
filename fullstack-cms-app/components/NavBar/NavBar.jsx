import { useState } from "react"
import Dashboard from "./Dashboard"
import Resources from "./Resources"

export default function NavBar() {

  const [isDashBoard, setIsDashBoard] = useState(false)
  const [isResources, setIsResources] = useState(false)

  return (
    <div className="border">
      <div className="mb-7">
        <div onClick={() => setIsDashBoard(prev => !prev)} className="flex  justify-between hover:cursor-pointer">
          <button className={`${isDashBoard && "mb-5"}`}>Dashboard</button>
          <p>{!isDashBoard ? '+' : 'x'}</p>
        </div>
        <Dashboard isOpen={isDashBoard} />
      </div>

      <div>
        <div onClick={() => setIsResources(prev => !prev)} className="flex  justify-between hover:cursor-pointer">
          <button className={`${isResources && "mb-5"}`}>Resources</button>
          <p>{!isResources ? '+' : 'x'}</p>
        </div>
        <Resources isOpen={isResources} />
      </div>
    </div>
  )
}