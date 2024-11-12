import { useState } from "react"
import AuthLabel from "@/components/Authentication/AuthLabel"
import AuthInput from "@/components/Authentication/AuthInput"
import AuthError from "@/components/Authentication/AuthError"
import AuthSuccess from "@/components/Authentication/AuthSuccess"
import DatePicker from "./DatePicker"

export default function CreateProjectForm({ projectId, socket }) {

  const [errorState, setErrorState] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  async function createProject(e) {
    e.preventDefault()
    const fd = new FormData(e.target)
    const data = Object.fromEntries(fd.entries())

    try {
      const response = await fetch('http://localhost:8080/admin/createProject', {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        const resData = await response.json()
        throw new Error(resData.message)
      }
      socket.emit('projectCreated', 'Project successfully created.')
      const resData = await response.json()
      setIsSuccess(resData.message)
    } catch (err) {
      setErrorState(err.message)
    }
  }


  async function addTaskToProject(e, projectId) {
    e.preventDefault()
    const fd = new FormData(e.target)
    const data = Object.fromEntries(fd.entries())

    try {
      const response = await fetch(`http://localhost:8080/admin/createTask/${projectId}`, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        const resData = await response.json()
        throw new Error(resData.message)
      }
      socket.emit('projectCreated', 'Task successfully created.')
      const resData = await response.json()
      setIsSuccess(resData.message)
    } catch (err) {
      setErrorState(err.message)
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-lg:w-2/4 max-sm:w-4/5">
      <form onSubmit={projectId ? (e) => addTaskToProject(e, projectId) : (e) => createProject(e)} className="flex flex-col text-xl py-6 px-8 w-full bg-gray-900 rounded-lg max-lg:text-base max-sm:text-sm">

        {projectId ? <AuthLabel customFor={"taskTitle"}>Task Title</AuthLabel> : <AuthLabel customFor={"projectTitle"}>Project Title</AuthLabel>}
        <AuthInput customName={projectId ? "taskTitle" : "projectTitle"} customPlace={projectId ? "Task Title" : "Project Title"} setErrorState={setErrorState} isError={errorState} />

        <AuthLabel customFor={"deadline"}>Deadline</AuthLabel>
        <DatePicker customFor={"deadline"} />

        <button className="mt-5 p-2 duration-75 bg-gray-600 rounded-lg hover:bg-gray-400 active:bg-gray-700">
          {projectId ? 'Add Task' : 'Create Project'}
        </button>

        {errorState && <AuthError errorState={errorState} />}
        {isSuccess && <AuthSuccess isSuccess={isSuccess} />}
      </form>
    </div>
  )
}