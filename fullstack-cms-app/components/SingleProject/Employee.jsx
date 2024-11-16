import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function Employee({ emp }) {
  return (
    <div className="flex justify-start w-1/2 bg-yellow-700 rounded-xl text-gray-900 gap-2 font-bold items-center p-1 duration-75 hover:bg-yellow-500 hover:cursor-pointer">
      <div>
        <Avatar className="max-[700px]:hidden w-12 h-12 border-gray-900 border-2">
          <AvatarImage src={`http://localhost:8080/${emp.profilePic}`} />
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-row justify-around gap-2">
        <Link href={`/employees/${emp.id}`} className="hover:underline duration-75">{emp.name + ' ' + emp.surname}</Link>
        <p> - {emp.jobTitle}</p>
      </div>
    </div>
  )
}