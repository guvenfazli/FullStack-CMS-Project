import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AssignedEmployees({ task, employee }) {
  return (
    <div>
      <Avatar className="duration-75 mb-2 hover:border-4 hover:border-yellow-400 hover:cursor-pointer">
        <AvatarImage className="z-10" src={`http://localhost:8080/${employee.profilePic}`} />
        <AvatarFallback>PP</AvatarFallback>
      </Avatar>
    </div>
  )
}