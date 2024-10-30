"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import ProjectCard from "./ProjectCard"
export default function ProjectInformation() {

  const projectId = useParams().projectId
  const [fetchedProject, setFetchedProject] = useState(null)

  useEffect(() => {
    async function fetchSingleProject() {
      try {
        const response = await fetch(`http://localhost:8080/projects/${projectId}`, {
          method: 'GET',
          credentials: 'include'
        })
        const resData = await response.json()
        setFetchedProject(resData.fetchedProject)
        console.log(resData.fetchedProject)
      } catch (err) {

      }

    }

    fetchSingleProject()
  }, [])


  return (
    <div>
      <div>
        <p className="text-3xl mb-5">{fetchedProject.projectName}</p>
      </div>

      <ProjectCard fetchedProject={fetchedProject} />

    </div>
  )
}