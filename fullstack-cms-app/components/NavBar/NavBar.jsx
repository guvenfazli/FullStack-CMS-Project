import { useState } from "react"
import { useAppContext } from "@/context"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import Dashboard from "./Dashboard"
import Resources from "./Resources"

export default function NavBar() {
  const { isLogged } = useAppContext()
  const [isDashBoard, setIsDashBoard] = useState(false)
  const [isResources, setIsResources] = useState(false)

  function toggleAll() {
    if (isDashBoard !== isResources) {
      setIsDashBoard(true)
      setIsResources(true)
    } else {
      setIsDashBoard(prev => !prev)
      setIsResources(prev => !prev)
    }
  }

  if (isLogged) {
    return (
      <div>
        <div className="mb-7">
          <div onClick={() => setIsDashBoard(prev => !prev)} className="flex justify-between items-start hover:cursor-pointer">
            <button className={`${isDashBoard && "text-gray-600"} duration-100 hover:text-gray-500`}>Dashboard</button>
            <button className={`${!isDashBoard ? 'rotate-0' : 'rotate-90 text-gray-600'} duration-100 hover:text-gray-500`}>{!isDashBoard ? '+' : 'x'}</button>
          </div>
          <Dashboard isOpen={isDashBoard} />
        </div>

        <div className="mb-3">
          <div onClick={() => setIsResources(prev => !prev)} className="flex items-start justify-between hover:cursor-pointer">
            <button className={`${isResources && "text-gray-600"} duration-100 hover:text-gray-500`}>Resources</button>
            <button className={`${!isResources ? 'rotate-0' : 'rotate-90 text-gray-600'} duration-100 hover:text-gray-500`}>{!isResources ? '+' : 'x'}</button>
          </div>
          <Resources isOpen={isResources} />
        </div>

        <div className="flex items-center flex-row">
          <Switch checked={isDashBoard === true && isResources === true} onCheckedChange={() => toggleAll()} className="mr-1" id="toggle-all" />
          <Label htmlFor="toggle-all">Toggle All</Label>
        </div>
      </div>
    )
  }

}