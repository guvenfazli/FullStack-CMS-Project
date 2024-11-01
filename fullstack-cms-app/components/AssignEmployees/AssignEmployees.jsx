import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import EmployeeCard from "./EmployeeList"

export default function AssignEmployees({ task }) {

  const [employeeList, setEmployeeList] = useState()

  useEffect(() => {
    async function fetchEmployees() {
      const response = await fetch('http://localhost:8080/employees', {
        credentials: 'include'
      })
      const resData = await response.json()
      console.log(resData.employees)
      setEmployeeList(resData.employees)
    }

    fetchEmployees()
  }, [])



  return (
    <div className="flex flex-col justify-start items-start">
      <div className="mb-5">
        <p>Here will be the already assigned employees.</p>
      </div>

      <div className="flex w-full flex-row justify-around items-start">
        {employeeList?.map((emp) => {
          return (
            <EmployeeCard key={emp.id} employee={emp} />
          )
        })}
      </div>
    </div>
  )
}