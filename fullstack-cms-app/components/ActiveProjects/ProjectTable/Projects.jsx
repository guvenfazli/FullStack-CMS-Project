"use client"

import { useEffect, useState } from "react"
import { useAppContext } from "@/context"

import TableNav from "@/components/HomePage/UserTable/tableNav"
import ProjectTable from "./ProjectTable"
import CreateProjectForm from "./CreateProject"
import LoadingComp from "@/components/Loading/LoadingComp"
export default function Projects() {

  const { isLogged } = useAppContext()
  const [fetchedProjects, setFetchedProjects] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isCreateTask, setIsCreateTask] = useState(false)

  useEffect(() => {

    async function fetchAllProjects() {
      setIsLoading(true)
      const response = await fetch('http://localhost:8080/projects', {
        method: 'GET',
        credentials: 'include'
      })

      const resData = await response.json()
      setFetchedProjects(resData.projects)
      setIsLoading(false)

    }

    fetchAllProjects()

  }, [])



  return (
    <div>
      <div>
        <p className="text-2xl mb-5">Projects</p>
      </div>

      <TableNav isLogged={isLogged} inputPlaceHolder="Search Projects" buttonText="Create Project" FormComponent={CreateProjectForm} dialogTitle='Create Project' />
      {isLoading ? <LoadingComp /> : <ProjectTable isLogged={isLogged} fetchedProjects={fetchedProjects} />}

 



    </div>
  )
}