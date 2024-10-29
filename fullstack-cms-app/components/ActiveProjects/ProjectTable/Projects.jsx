"use client"

import { useEffect, useState } from "react"
import { useAppContext } from "@/context"
import TableNav from "@/components/HomePage/UserTable/tableNav"
import ProjectTable from "./ProjectTable"
import CreateProjectForm from "./CreateProject"
export default function Projects() {

  const { isLogged } = useAppContext()
  const [fetchedProjects, setFetchedProjects] = useState()

  useEffect(() => {

    async function fetchAllProjects() {

      const response = await fetch('http://localhost:8080/projects', {
        method: 'GET',
        credentials: 'include'
      })

      const resData = await response.json()
      setFetchedProjects(resData.projects)

    }

    fetchAllProjects()

  }, [])



  return (
    <div>
      <div>
        <p className="text-2xl mb-5">Projects</p>
      </div>

      <TableNav isLogged={isLogged} inputPlaceHolder="Search Projects" buttonText="Create Project" FormComponent={CreateProjectForm} dialogTitle='Create Project' />
      <ProjectTable isLogged={isLogged} fetchedProjects={fetchedProjects} />
    </div>
  )
}