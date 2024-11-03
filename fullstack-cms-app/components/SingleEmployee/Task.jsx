import UserTaskStatus from "../HomePage/UserTable/UserTaskStatus"
import Link from "next/link"
export default function Task({ task }) {
  return (
    <Link href={`/projects/${task.projectId}`} className="flex w-full justify-between items-center border-b border-b-gray-500 p-2">
      <p className="text-lg">{task.taskName}</p>
      <UserTaskStatus status={task.taskStatus}>{task.taskStatus}</UserTaskStatus>
    </Link>
  )
}