import EditLabel from "./EditLabel"
import EditInput from "./EditInput"
import DatePicker from "@/components/ActiveProjects/ProjectTable/DatePicker"
import { useState } from "react"
export default function EditForm({ task, socket, projectId }) {

  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)


  async function editTask(e) {
    e.preventDefault()
    const fd = new FormData(e.target)
    const data = Object.fromEntries(fd.entries())

    try {
      const response = await fetch(`http://localhost:8080/admin/editTask/${task.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData.message)
        throw error
      }

      const resData = await response.json()
      socket.emit('taskEdited', `${projectId}`)
      setIsSuccess(resData.message)
    } catch (err) {
      setIsError(err.message)
    }

  }

  return (
    <form onSubmit={(e) => editTask(e)} className="flex flex-col text-xl py-6 px-8 w-full bg-gray-900 rounded-lg max-lg:text-base max-sm:text-sm">
      <EditLabel htmlFor="taskTitle">Task Title</EditLabel>
      <EditInput name="taskTitle" id="taskTitle" defValue={task.taskName}>{task.taskName}</EditInput>

      <EditLabel htmlFor="deadline">Deadline</EditLabel>
      <DatePicker customFor="deadline" id="deadline" defValue={task.taskDeadline}>Deadline</DatePicker>

      <button className="mt-5 p-2 duration-75 bg-gray-600 rounded-lg hover:bg-gray-400 active:bg-gray-700">Done</button>

      {isError && <p className="mt-4">{isError}</p>}
      {isSuccess && <p className="mt-4">{isSuccess}</p>}
    </form>
  )
}