import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react"
import { chosenIcon } from "@/components/Icons/Icons"

export default function EmployeeCard({ employee, chooseEmployee, removeEmployee, chosenEmployees }) {

  const [isChosen, setIsChosen] = useState(false)

  useEffect(() => {
    const foundEmployee = chosenEmployees?.some((emp) => emp === employee.id)
    setIsChosen(foundEmployee)
  }, [chosenEmployees])


  return (
    <div onClick={isChosen ? () => removeEmployee(employee.id) : () => chooseEmployee(employee.id)} className="flex flex-col group hover:cursor-pointer justify-start items-center">
      <Avatar className="duration-75 mb-2 w-20 h-20 group-hover:border-4 group-hover:border-yellow-400 group-hover:cursor-pointer">
        <div className={`text-center duration-100 flex justify-center items-center absolute border z-30 top-0 w-full bg-slate-300 rounded-full bottom-0 ${isChosen ? 'opacity-50' : 'opacity-0'}`}>
          {chosenIcon}
        </div>
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