import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react"

export default function EmployeeCard({ employee, chooseEmployee, removeEmployee, chosenEmployees }) {

  const [isChosen, setIsChosen] = useState(false)

  useEffect(() => {
    function checkEmployee() {
      const foundEmployee = chosenEmployees?.some((emp) => emp === employee)
      setIsChosen(foundEmployee)
    }

    checkEmployee()
  }, [chosenEmployees])


  return (
    <div onClick={isChosen ? () => removeEmployee(employee) : () => chooseEmployee(employee)} className="flex flex-col justify-start items-center">
      <Avatar className="duration-75 mb-2 w-20 h-20 hover:border-4 hover:border-yellow-400 hover:cursor-pointer">
        <div className={`text-center duration-100 flex justify-center items-center absolute border z-30 top-0 w-full bg-black rounded-full bottom-0 ${isChosen ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xs">Chosen</p>
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