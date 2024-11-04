import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"


export default function EmployeeCard({ employee }) {

  return (
    <div className="flex w-1/5 flex-col items-start justify-center rounded-md shadow-md bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 max-md:w-full">
      <div className="flex w-full h-full flex-col gap-5 items-start justify-center bg-gray-900 rounded-md shadow-lg">
        <div className="flex min-h-40 bg-zinc-800 relative w-full  justify-center">
          <Avatar className="h-24 w-24 -bottom-12 right-6 hover:cursor-pointer absolute max-lg:w-16 max-lg:h-16 max-md:w-32 max-md:h-32 border-4 border-gray-900">
            <AvatarImage src={`http://localhost:8080/${employee.profilePic}`} />
            <AvatarFallback>PP</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col gap-5 w-full p-2">
          <div className="flex flex-col w-full justify-start items-start max-sm:flex-col">
            <p className="text-lg max-lg:text-sm max-md:text-lg">{employee.name + ' ' + employee.surname}</p>
            <p className="text-sm text-gray-500 max-lg:text-sm max-md:text-lg">{employee.job_title}</p>
          </div>

          <div className="flex flex-row w-full justify-between items-center">
            <p className="text-sm text-gray-500">Contact:</p>
            <p>{employee.email}</p>
          </div>

          <div className="flex flex-row w-full justify-between items-center">
            <p className="text-sm text-gray-500">Pending Tasks:</p>
            <p>{employee.tasks?.length}</p>
          </div>

          <div className="flex flex-row w-full justify-center items-center">
            <Link className="p-2 duration-75 bg-zinc-800 rounded-lg hover:bg-gray-300 hover:text-gray-700 " href={`/employees/${employee.id}`}>More Details</Link>
          </div>
        </div>
      </div>
    </div>
  )
}