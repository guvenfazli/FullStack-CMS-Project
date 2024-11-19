import { useEffect, useState } from "react"
import { useAppContext } from "@/context"
import TableNav from "@/components/HomePage/UserTable/tableNav"
import ProjectTable from "./ProjectTable"
import CreateProjectForm from "./CreateProject"

export default function Projects({ socket }) {

  const { isLogged } = useAppContext()
  const [fetchedProjects, setFetchedProjects] = useState()
  const [filterType, setFilterType] = useState('id')


  async function searchProjects(searchParam) {

    const response = await fetch(`http://localhost:8080/projects?project=${searchParam}&filterParam=${filterType}`, {
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
      const response = await fetch(`http://localhost:8080/projects?filterParam=${filterType}`, {
        credentials: 'include'
      })
      const resData = await response.json()
      setFetchedProjects(resData.projects)
    }

    fetchProjects()
  }, [])


  return (
    <div>
      <div>
        <p className="text-2xl mb-5">Projects</p>
      </div>

      <TableNav isLogged={isLogged} socket={socket} searchFn={searchProjects} inputPlaceHolder="Search Projects" buttonText="Create Project" FormComponent={CreateProjectForm} dialogTitle='Create Project' />

      <ProjectTable isLogged={isLogged} fetchedProjects={fetchedProjects} filterType={filterType} setFetchedProjects={setFetchedProjects} setFilterType={setFilterType} socket={socket} />
    </div>
  )
}