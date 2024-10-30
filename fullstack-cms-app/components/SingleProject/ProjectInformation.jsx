"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import LoadingComp from "../Loading/LoadingComp"
import ProjectCard from "./ProjectCard"
export default function ProjectInformation() {

  const projectId = useParams().projectId
  const [isLoading, setIsLoading] = useState(false)
  const [fetchedProject, setFetchedProject] = useState(null)

  useEffect(() => {
    async function fetchSingleProject() {

      try {
        setIsLoading(true)
        const response = await fetch(`http://localhost:8080/projects/${projectId}`, {
          method: 'GET',
          credentials: 'include'
        })
        const resData = await response.json()
        setFetchedProject(resData.fetchedProject)
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
      }

    }

    fetchSingleProject()
  }, [])


  return (

    <div>
      {isLoading || !fetchedProject ? <LoadingComp /> :
        <>
          <div>
            <p className="text-3xl mb-5">{fetchedProject?.projectName}</p>
          </div>

          <ProjectCard fetchedProject={fetchedProject} />
        </>
      }
    </div>
  )
}