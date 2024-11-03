import Link from "next/link"
import UserTaskStatus from "./UserTaskStatus"
export default function AssignedTasks({ task }) {
  return (
    <Link href={`/projects/${task.projectId}`} className="flex gap-2 justify-between text-center w-full items-start">
      <p>{task.taskName}</p>
      <UserTaskStatus status={task.taskStatus}>{task.taskStatus}</UserTaskStatus>
    </Link>
  )
}