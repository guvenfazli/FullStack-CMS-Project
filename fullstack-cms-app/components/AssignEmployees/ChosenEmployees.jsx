import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function ChosenEmployees({ employee, removeEmployee }) {
  return (
    <div onClick={() => removeEmployee(employee.id)} className="flex flex-col text-center justify-start items-center">
      <Avatar className="duration-75 mb-2  hover:border-4 hover:border-yellow-400 hover:cursor-pointer">
        <AvatarImage src={`http://localhost:8080/${employee.profilePic}`} />
        <AvatarFallback>PP</AvatarFallback>
      </Avatar>
    </div>
  )
}