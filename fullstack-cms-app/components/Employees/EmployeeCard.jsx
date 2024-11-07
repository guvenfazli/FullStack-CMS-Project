import EmployeeInformation from "./EmployeeInformation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function EmployeeCard({ employee }) {

  return (
    <div className="flex w-1/3 flex-col items-start justify-center rounded-md shadow-md shadow-slate-950 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 max-md:w-full">
      <div className="flex w-full h-full flex-col gap-5 items-start justify-center bg-gray-900 rounded-md shadow-lg">
        <div className="flex min-h-32 bg-zinc-800 relative w-full  justify-center">
          <Avatar className="h-24 w-24 -bottom-12 right-6 hover:cursor-pointer absolute max-lg:w-16 max-lg:h-16 max-md:w-32 max-md:h-32 border-4 border-gray-900">
            <AvatarImage src={`http://localhost:8080/${employee.profilePic}`} />
            <AvatarFallback>PP</AvatarFallback>
          </Avatar>
        </div>

        <EmployeeInformation employee={employee} />
      </div>
    </div>
  )
}