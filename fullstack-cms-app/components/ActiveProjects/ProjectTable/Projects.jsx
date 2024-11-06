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

  useEffect(() => {
    async function fetchAllProjects() {

      try {
        setIsLoading(true)
        const response = await fetch('http://localhost:8080/projects', {
          method: 'GET',
          credentials: 'include'
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()
        setFetchedProjects(resData.projects)
        setIsLoading(false)

      } catch (err) {
        setIsLoading(false)
      }

    }

    fetchAllProjects()
  }, [])

  async function searchProjects(searchParam) {
    try {

      const response = await fetch(`http://localhost:8080/projects?project=${searchParam}`, {
        method: 'GET',
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

  return (
    <div>
      <div>
        <p className="text-2xl mb-5">Projects</p>
      </div>

      <TableNav isLogged={isLogged} searchFn={searchProjects} inputPlaceHolder="Search Projects" buttonText="Create Project" FormComponent={CreateProjectForm} dialogTitle='Create Project' />
      {isLoading ? <LoadingComp /> : <ProjectTable isLogged={isLogged} fetchedProjects={fetchedProjects} setFetchedProjects={setFetchedProjects} />}
    </div>
  )
}