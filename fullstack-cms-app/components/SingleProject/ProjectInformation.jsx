"use client"

import { useEffect, useState } from "react"
import { useAppContext } from "@/context"
import { useParams } from "next/navigation"
import { notFound } from 'next/navigation'
import LoadingComp from "../Loading/LoadingComp"
import ProjectCard from "./ProjectCard"
import TableNav from "../HomePage/UserTable/tableNav"
import TaskTable from "./TaskTable"
import CreateTask from "../ActiveProjects/ProjectTable/CreateTask"
import io from "socket.io-client"

let socket;
export default function ProjectInformation() {
  const { isLogged } = useAppContext()
  const projectId = useParams().projectId
  const [isLoading, setIsLoading] = useState(false)
  const [assignedEmployees, setAssignedEmployees] = useState()
  const [projectActivities, setProjectActivities] = useState()
  const [isError, setIsError] = useState(false)
  const [fetchedProject, setFetchedProject] = useState(null)
  useEffect(() => {
    async function fetchSingleProject() {
      try {
        setIsLoading(true)
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
        setAssignedEmployees(resData.groupList)
        setProjectActivities(resData.fetchedProject.projectActivities)
        setIsLoading(false)
      } catch (err) {
        setIsError(err.message)
        setIsLoading(false)
      }
    }

    fetchSingleProject()

    socket = io('http://localhost:8080/singleProjectPage')
    socket.emit('joinRoom', projectId)

    socket.on('refreshTasks', (emp) => {
      console.log('Worked')
      fetchSingleProject()
    })


    return () => {
      socket.off('disconnect')
    }


  }, [])

  if (isError) {
    notFound()
  }

  return (

    <>

      {isError ?
        <div className="flex w-full justify-center items-center p-5">
          <p>{isError}</p>
        </div> :

        <div>
          <div>
            <p className="text-3xl mb-3">{fetchedProject?.projectName}</p>
          </div>

          <ProjectCard fetchedProject={fetchedProject} assignedEmployees={assignedEmployees} projectActivities={projectActivities} />

          <div>
            <p className="text-3xl mb-5">Tasks</p>
          </div>
          <TableNav isLogged={isLogged} socket={socket} FormComponent={CreateTask} projectId={projectId} dialogTitle='Create Task' inputPlaceHolder="Search Tasks" buttonText="Create Task" />
          <TaskTable fetchedTasks={fetchedProject?.tasks} isLogged={isLogged} socket={socket} projectId={projectId} />
        </div>

      }

    </>
  )
}