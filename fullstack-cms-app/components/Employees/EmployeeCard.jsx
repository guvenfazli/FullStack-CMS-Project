import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function EmployeeCard({ employee }) {
  return (
    <div className="flex border p-2 w-2/5 flex-col gap-5 items-start justify-center bg-gray-900 rounded-md shadow-md">
      <div className="flex w-full justify-center">
        <Avatar className="w-32 h-32 rounded-lg bg">
          <AvatarImage src={`http://localhost:8080/${employee.profilePic}`} />
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-row w-full justify-between items-center">
        <p>{employee.name + ' ' + employee.surname}</p>
        <p>{employee.job_title}</p>
      </div>

      <div>
        <p>{employee.isAdmin ? 'Admin' : 'Employee'}</p>
      </div>

      <div>
        <p>{employee.email}</p>
      </div>

    </div>
  )
}