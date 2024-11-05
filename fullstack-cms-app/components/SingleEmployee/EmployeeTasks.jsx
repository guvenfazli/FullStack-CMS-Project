import Task from "./Task"
export default function EmployeeTasks({ tasks }) {
  return (
    <div className="flex flex-col border-b-yellow-600  justify-start items-start w-full ">

      {tasks?.length > 0 ? tasks?.map((task) => {
        return (
          <Task key={task.id} task={task} />
        )
      }) :

        <div className="w-full p-5 justify-center items-center">
          <p>No pending tasks.</p>
        </div>
      }
    </div>
  )
}
