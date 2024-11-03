import Task from "./Task"
export default function EmployeeTasks({ tasks }) {
  console.log(tasks)
  return (
    <div className="flex flex-col justify-start items-start w-full gap-5">
      
      {tasks?.map((task) => {
        return (
          <Task key={task.id} task={task} />
        )
      })}
    </div>
  )
}