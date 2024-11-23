import { useEffect, useState } from "react"
import AuthLabel from "@/components/Authentication/AuthLabel"
import AuthInput from "@/components/Authentication/AuthInput"
import AuthError from "@/components/Authentication/AuthError"
import AuthSuccess from "@/components/Authentication/AuthSuccess"
import DatePicker from "./DatePicker"

export default function CreateProjectForm({ projectId, socket }) {

  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  async function createProject(e) { // Project Creation
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
      setIsError(err.message)
    }
  }


  async function addTaskToProject(e, projectId) { // Adding task to projects
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
      socket.emit('taskCreated', projectId)
      const resData = await response.json()
      setIsSuccess(resData.message)
    } catch (err) {
      setIsError(err.message)
    }
  }

  useEffect(() => { // Error / Success timers
    if (isError) {
      setTimeout(() => {
        setIsError(false)
      }, 3000)
    } else if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }
  }, [isError, isSuccess])

  function clearStates() { // Clears the feedbacks as soon as getting clicked
    setIsError(false)
    setIsSuccess(false)
  }

  return (
    <div className="flex flex-col items-center w-full max-lg:w-full max-md:items-start max-sm:items-start max-sm:text-start">
      <form onSubmit={projectId ? (e) => addTaskToProject(e, projectId) : (e) => createProject(e)} className="flex flex-col text-xl py-6 px-8 w-full bg-gray-900 rounded-lg max-lg:text-base max-sm:text-sm max-[641px]:py-3 max-[641px]:px-3 ">

        <AuthLabel customFor={`${projectId ? 'Task Title' : 'Project Title'}`}>{projectId ? 'Task Title' : 'Project Title'}</AuthLabel>
        <AuthInput
          customName={projectId ? "taskTitle" : "projectTitle"} customPlace={projectId ? "Task Title" : "Project Title"} setErrorState={setIsError} isError={isError} />

        <AuthLabel customFor={"deadline"}>Deadline</AuthLabel>
        <DatePicker customFor={"deadline"} />

        <button onClick={() => clearStates()} className="mt-5 p-2 duration-75 bg-gray-600 rounded-lg hover:bg-gray-400 active:bg-gray-700">
          {projectId ? 'Add Task' : 'Create Project'}
        </button>

        {isError && <AuthError errorState={isError} />}
        {isSuccess && <AuthSuccess isSuccess={isSuccess} />}
      </form>
    </div >
  )
}