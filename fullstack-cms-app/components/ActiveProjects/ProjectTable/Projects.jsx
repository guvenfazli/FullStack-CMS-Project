"use client"
import { useEffect, useState } from "react"
import { useAppContext } from "@/context"
import TableNav from "@/components/HomePage/UserTable/tableNav"
import ProjectTable from "./ProjectTable"
import CreateProjectForm from "./CreateProject"
import LoadingComp from "@/components/Loading/LoadingComp"
import io from "socket.io-client"

let socket;
export default function Projects() {

  const { isLogged } = useAppContext()
  const [fetchedProjects, setFetchedProjects] = useState()
  const [isLoading, setIsLoading] = useState(true)
  async function searchProjects(searchParam) {

    const response = await fetch(`http://localhost:8080/projects?project=${searchParam}`, {
      credentials: 'include'
    })
    if (!response.ok) {
      const resData = await response.json()
      const error = new Error(resData.message)
      throw error
    }

    const resData = await response.json()
    setFetchedProjects(resData.projects)

  }

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch('http://localhost:8080/projects', {
        credentials: 'include'
      })
      const resData = await response.json()
      socket = io('http://localhost:8080/projectsPage')
      setFetchedProjects(resData.projects)
      setIsLoading(false)
    }

    fetchProjects()

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div>
      <div>
        <p className="text-2xl mb-5">Projects</p>
      </div>

      <TableNav isLogged={isLogged} socket={socket} searchFn={searchProjects} inputPlaceHolder="Search Projects" buttonText="Create Project" FormComponent={CreateProjectForm} dialogTitle='Create Project' />

      {isLoading ? <LoadingComp /> : <ProjectTable isLogged={isLogged} fetchedProjects={fetchedProjects} setFetchedProjects={setFetchedProjects} socket={socket} />}
    </div>
  )
}