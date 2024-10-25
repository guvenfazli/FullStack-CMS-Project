import { useState } from "react"
import Dashboard from "./Dashboard"
import Resources from "./Resources"

export default function NavBar() {

  const [isDashBoard, setIsDashBoard] = useState(false)
  const [isResources, setIsResources] = useState(false)

  return (
    <div className="border p-5 w-1/6">
      <div>
        <div className="flex justify-between">
          <button onClick={() => setIsDashBoard(prev => !prev)} className="mb-5">Dashboard</button>
          <p>{!isDashBoard ? '+' : 'x'}</p>
        </div>
        <Dashboard isOpen={isDashBoard} />
      </div>

      <div>
        <div className="flex justify-between">
          <button onClick={() => setIsResources(prev => !prev)} className="mb-5">Resources</button>
          <p>{!isResources ? '+' : 'x'}</p>
        </div>
        <Resources isOpen={isResources} />
      </div>
    </div>
  )
}