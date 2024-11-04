import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"


export default function EmployeeCard({ employee }) {

  return (
    <div className="flex w-1/3 flex-col items-start justify-center p-0.5 rounded-md shadow-md bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800">
      <div className="flex w-full h-full flex-col gap-5 p-2 items-start justify-center bg-gray-900 rounded-md shadow-md">
        <div className="flex w-full justify-center">
          <Avatar className="w-32 h-32 rounded-lg hover:cursor-pointer">
            <AvatarImage src={`http://localhost:8080/${employee.profilePic}`} />
            <AvatarFallback>PP</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-row w-full justify-between items-center">
          <p className="text-lg">{employee.name + ' ' + employee.surname}</p>
          <p className="text-lg">{employee.job_title}</p>
        </div>

        <div className="flex flex-row w-full justify-between items-center">
          <p>Role:</p>
          <p>{employee.isAdmin ? 'Admin' : 'Employee'}</p>
        </div>

        <div className="flex flex-row w-full justify-between items-center">
          <p>E-mail:</p>
          <p>{employee.email}</p>
        </div>

        <div className="flex flex-row w-full justify-between items-center">
          <p>Pending Tasks:</p>
          <p>{employee.tasks?.length}</p>
        </div>

        <div className="flex flex-row w-full justify-center items-center">
          <Link className="p-2 duration-75 bg-gray-600 rounded-lg hover:bg-gray-300 hover:text-gray-700" href={`/employees/${employee.id}`}>See More Details</Link>
        </div>
      </div>
    </div>
  )
}