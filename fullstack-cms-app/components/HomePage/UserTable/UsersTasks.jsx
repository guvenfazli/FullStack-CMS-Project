import AssignedTasks from "./AssignedTasks"
export default function UsersTasks({ tasks }) {
  return (
    <div className="flex flex-col w-full gap-2 justify-center items-start">
      {tasks.length == 0 && <p>No tasks assigned.</p>}
      {tasks.map((task) => {
        return (
          <AssignedTasks key={task.id} task={task} />
        )
      })}
    </div>
  )
}