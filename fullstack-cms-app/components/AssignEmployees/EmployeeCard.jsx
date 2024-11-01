import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function EmployeeCard({ employee, chooseEmployee }) {

  return (
    <div onClick={() => chooseEmployee(employee)} className="flex flex-col justify-start items-center">
      <Avatar className="duration-75 mb-2 w-20 h-20 hover:border-4 hover:border-yellow-400 hover:cursor-pointer">
        <AvatarImage src={`http://localhost:8080/${employee.profilePic}`} />
        <AvatarFallback>PP</AvatarFallback>
      </Avatar>

      <div className="text-center">
        <p>{employee.name + ' ' + employee.surname}</p>
        <p>{employee.job_title}</p>
      </div>
    </div>
  )

}