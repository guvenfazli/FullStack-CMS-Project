import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Assigned({ employee }) {
  return (
    <div className="flex flex-col group hover:cursor-pointer justify-start items-center">
      <Avatar className="duration-75 mb-2 w-20 h-20 group-hover:border-4 group-hover:border-yellow-400 group-hover:cursor-pointer">
        <AvatarImage className="z-10" src={`http://localhost:8080/${employee.profilePic}`} />
        <AvatarFallback>PP</AvatarFallback>
      </Avatar>

      <div className="text-center">
        <p>{employee.name + ' ' + employee.surname}</p>
        <p>{employee.job_title}</p>
      </div>
    </div>
  )
}