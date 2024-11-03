import Task from "./Task"
export default function EmployeeTasks({ tasks }) {
  
  return (
    <div className="flex flex-col justify-start items-start w-full ">
      {tasks?.map((task) => {
        return (
          <Task key={task.id} task={task} />
        )
      })}
    </div>
  )
}