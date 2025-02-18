import { useState, useEffect } from "react"
import CompletedProjects from "./Stats/CompletedProjects"
import TotalProjects from "./Stats/TotalProjects"
import TaskStatus from "./Stats/TaskStatus"

export default function StatShowcase({ socket }) {

  const [projectStats, setProjectStats] = useState()

  useEffect(() => {
    async function fetchProjectStats() {
      const response = await fetch('http://localhost:8080/projectStats', { // Getting the stats of the current active projects.
        credentials: 'include'
      })
      const resData = await response.json()
      setProjectStats(resData)
    }

    fetchProjectStats()

    socket.on('refreshProjects', (emp) => {
      fetchProjectStats()
    })

  }, [])

  return (
    <div className="flex justify-around mb-10 gap-10 max-sm:flex-col">
      <TaskStatus projectStats={projectStats} />
      <div className="flex flex-col justify-center items-start w-1/3 gap-5 max-sm:w-full">
        <TotalProjects projectStats={projectStats} />
        <CompletedProjects projectStats={projectStats?.projectStatusData} />
      </div>
    </div>
  )
}