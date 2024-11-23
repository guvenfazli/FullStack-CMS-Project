import Link from "next/link"
export default function EmployeeInformation({ employee }) {
  return (
    <div className="flex flex-col gap-5 w-full p-2">
      <div className="flex flex-col w-full justify-start items-start max-sm:flex-col">
        <p className="text-lg max-lg:text-sm max-md:text-lg">{employee.name + ' ' + employee.surname}</p>
        <p className="text-sm text-gray-500 max-lg:text-sm max-md:text-lg">{employee.jobTitle}</p>
      </div>

      <div className="flex flex-row w-full justify-between items-center">
        <p className="text-sm text-gray-500">Contact:</p>
        <p>{employee.email}</p>
      </div>

      <div className="flex flex-row w-full justify-between items-center">
        <p className="text-sm text-gray-500">Pending Tasks:</p>
        <p>{employee.tasks?.length}</p>
      </div>

      <div className="flex flex-row w-full justify-between items-center">
        <p className="text-sm text-gray-500">Completed Tasks:</p>
        <p>{employee?.completedTasks}</p>
      </div>

      <div className="flex flex-row w-full justify-center items-center">
        <Link className="p-2 duration-75 bg-zinc-800 rounded-lg hover:bg-gray-300 hover:text-gray-700 " href={`/employees/${employee.id}`}>More Details</Link>
      </div>
    </div>
  )
}