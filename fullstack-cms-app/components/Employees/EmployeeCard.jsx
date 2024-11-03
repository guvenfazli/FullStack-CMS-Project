import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function EmployeeCard({ employee }) {
  return (
    <div className="flex border p-2 w-1/3 flex-col gap-5 items-start justify-center bg-gray-900 rounded-md shadow-md">
      <div className="flex w-full justify-center">
        <Avatar className="w-32 h-32 rounded-lg">
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
        <p>{employee.tasks.length}</p>
      </div>

    </div>
  )
}