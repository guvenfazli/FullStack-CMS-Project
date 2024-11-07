"use client"
import { useState, useEffect } from "react"
import CompletedProjects from "./Stats/CompletedProjects"
import TotalProjects from "./Stats/TotalProjects"
import TaskStatus from "./Stats/TaskStatus"

export default function StatShowcase() {

  const [projectStats, setProjectStats] = useState()

  useEffect(() => {
    async function fetchProjectStats() {
      const response = await fetch('http://localhost:8080/projectStats', {
        credentials: 'include'
      })
      const resData = await response.json()
      setProjectStats(resData)
    }

    fetchProjectStats()
  }, [])


  return (
    <div className="flex justify-around mb-10 max-sm:flex-col">
      <TotalProjects projectStats={projectStats} />
      <CompletedProjects projectStats={projectStats?.projectStatusData} />
      <TaskStatus projectStats={projectStats} />
    </div>
  )
}