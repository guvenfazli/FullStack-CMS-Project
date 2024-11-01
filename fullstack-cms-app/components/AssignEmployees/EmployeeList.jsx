import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function EmployeeCard({ employee }) {

  return (
    <div className="flex flex-col justify-start items-center">
      <Avatar className="hover:cursor-pointer mb-3 w-24 h-24 hover:border-2 hover:border-gray-200" size="lg">
        <AvatarImage src={`http://localhost:8080/${employee.profilePic}`} />
        <AvatarFallback>PP</AvatarFallback>
      </Avatar>

      <div>
        <p>{employee.name + ' ' + employee.surname}</p>
        <p>{employee.job_title}</p>
      </div>
    </div>
  )

}