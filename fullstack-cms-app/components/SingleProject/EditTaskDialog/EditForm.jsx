import EditLabel from "./EditLabel"
import EditInput from "./EditInput"
import DatePicker from "@/components/ActiveProjects/ProjectTable/DatePicker"
export default function EditForm({ task }) {
  return (
    <form className="flex flex-col text-xl py-6 px-8 w-full bg-gray-900 rounded-lg max-lg:text-base max-sm:text-sm">
      <EditLabel>Task Title</EditLabel>
      <EditInput defaultValue={task.taskName}>{task.taskName}</EditInput>

      <EditLabel>Deadline</EditLabel>
      <DatePicker defaultValue={task.taskDeadline}>Deadline</DatePicker>

      <button className="mt-5 p-2 duration-75 bg-gray-600 rounded-lg hover:bg-gray-400 active:bg-gray-700">Done</button>
    </form>
  )
}