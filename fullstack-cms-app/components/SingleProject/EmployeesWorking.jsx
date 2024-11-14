import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"


export default function EmployeesWorking({ assignedEmployees }) {

  console.log(assignedEmployees)
  return (
    <div className="flex p-2 flex-col gap-2 h-1/2">
      <div className="w-full py-2 border-t border-b border-yellow-600 flex justify-center items-center">
        <p className="text-xl">Employees Assigned To This Project</p>
      </div>

      <div className="flex flex-col justify-start gap-2 flex-wrap items-start">

        {assignedEmployees?.map((emp) => {
          return (
            <div key={emp.id} className="flex justify-around w-1/2 bg-yellow-700 rounded-xl text-gray-900 text-xl font-bold items-center p-2">
              <p>{emp.name}</p>
              <p>{emp.surname}</p>
            </div>
          )
        })}

      </div>
    </div>
  )
}