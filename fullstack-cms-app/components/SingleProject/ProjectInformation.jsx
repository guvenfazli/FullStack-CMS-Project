"use client"

import { lazy, Suspense, useEffect, useState } from "react"
import { useAppContext } from "@/context"
import { useParams } from "next/navigation"
import { notFound } from 'next/navigation'
import ProjectCard from "./ProjectCard"
import LoadingComp from "../Loading/LoadingComp"
import TableNav from "../HomePage/UserTable/tableNav"
import TaskTable from "./TaskTable"
import CreateTask from "../ActiveProjects/ProjectTable/CreateTask"
import io from "socket.io-client"
import AuthCheck from "@/utils/authCheck"


let socket;
export default function ProjectInformation() {
  const { isLogged } = useAppContext()
  const projectId = useParams().projectId
  const [fetchedProject, setFetchedProject] = useState(null)
  const [projectActivities, setProjectActivities] = useState()
  const [projectTasks, setProjectTasks] = useState([])
  const [assignedEmployees, setAssignedEmployees] = useState()
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    async function fetchSingleProject() {
      await AuthCheck()
      try {
        const response = await fetch(`http://localhost:8080/projects/${projectId}`, {
          credentials: 'include'
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()

        setFetchedProject(resData.fetchedProject)
        setProjectActivities(resData.fetchedProject.projectActivities)
        setProjectTasks(resData.projectTasks)
        setAssignedEmployees(resData.groupList)
      } catch (err) {
        setIsError(err.message)
      }
    }

    fetchSingleProject()

    socket = io('http://localhost:8080/singleProjectPage')
    socket.emit('joinRoom', projectId)

    socket.on('refreshTasks', (emp) => {
      fetchSingleProject()
    })


    return () => {
      socket.off('disconnect')
    }


  }, [])

  if (isError) {
    notFound()
  }

  const LazyTaskTable = lazy(() => import("./TaskTable"))

  return (
    <div>
      <div>
        <p className="text-3xl mb-3 max-sm:text-xl">{fetchedProject?.projectName}</p>
      </div>

      <ProjectCard fetchedProject={fetchedProject} assignedEmployees={assignedEmployees} projectActivities={projectActivities} />


      <div>
        <p className="text-3xl mb-5">Tasks</p>
      </div>
      <TableNav
        isLogged={isLogged} socket={socket} FormComponent={CreateTask} projectId={projectId} dialogTitle='Create Task' inputPlaceHolder="Search Tasks" buttonText="Create Task" />

      <Suspense fallback={<LoadingComp />}>
        <LazyTaskTable fetchedTasks={projectTasks} isLogged={isLogged} socket={socket} projectId={projectId} />
      </Suspense>
    </div>
  )
}