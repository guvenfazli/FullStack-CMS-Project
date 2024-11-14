import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function EmployeesWorking({ assignedEmployees }) {

  return (
    <div className="flex p-2 flex-col gap-2 h-1/2">
      <div className="w-full py-2 border-t border-b border-yellow-600 flex justify-center items-center">
        <p className="text-xl">Employees Assigned To This Project</p>
      </div>

      <div className="flex flex-col justify-start gap-2 flex-wrap items-start">

        {assignedEmployees?.map((emp) => {
          return (
            <div key={emp.id} className="flex justify-start w-1/2 bg-yellow-700 rounded-xl text-gray-900 gap-2 font-bold items-center p-1 duration-75 hover:bg-yellow-500 hover:cursor-pointer">
              <div>
                <Avatar className="max-[700px]:hidden w-12 h-12 border-gray-900 border-2">
                  <AvatarImage src={`http://localhost:8080/${emp.profilePic}`} />
                  <AvatarFallback>PP</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex flex-row justify-around gap-2">
                <p>{emp.name + ' ' + emp.surname}</p>
                <p> - {emp.jobTitle}</p>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}