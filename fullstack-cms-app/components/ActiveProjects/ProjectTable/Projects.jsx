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
  const [isLoading, setIsLoading] = useState(false)

  async function searchProjects(searchParam) {
    try {
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

    } catch (err) {
      setIsLoading(false)
    }

  }

  useEffect(() => {
    socket = io('http://localhost:8080/projectsPage')

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

      {!socket ? <LoadingComp /> : <ProjectTable isLogged={isLogged} fetchedProjects={fetchedProjects} setFetchedProjects={setFetchedProjects} socket={socket} />}
    </div>
  )
}