import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AssignedEmployees from "./AssignedEmployees"
import EmployeeCard from "./EmployeeCard"
import ChosenEmployees from "./ChosenEmployees"

export default function AssignEmployees({ task }) {

  const [employeeList, setEmployeeList] = useState()
  const [chosenEmployees, setChosenEmployees] = useState([])

  useEffect(() => {
    async function fetchEmployees() {
      const response = await fetch('http://localhost:8080/employees', {
        credentials: 'include'
      })
      const resData = await response.json()
      setEmployeeList(resData.employees)
    }

    fetchEmployees()
  }, [])

  function chooseEmployee(employee) {
    setChosenEmployees(prev => {
      let updated = [...prev]
      updated.push(employee)
      return updated
    })
  }

  function removeEmployee(employeeId) {
    const foundIndex = chosenEmployees.findIndex(emp => emp.id === employeeId)
    setChosenEmployees(prev => {
      let updated = [...prev]
      updated.splice(foundIndex, 1)
      return updated
    })
  }

  return (
    <div className="flex flex-col p-2 justify-start items-start">
      {task.employees.length === 0 ? <p className="mb-5">No one assigned to this task.</p> : <AssignedEmployees />}

      <div className="flex w-full p-2 flex-row justify-around items-start mb-5">
        {employeeList?.map((emp) => {
          return (
            <EmployeeCard key={emp.id} employee={emp} chooseEmployee={chooseEmployee} />
          )
        })}
      </div>

      <div className="flex p-2 w-full flex-col justify-start items-center mb-5 border-t">
        <p>Chosen Employees</p>


        <div className="flex w-full flex-row items-start gap-x-2 mb-5">
          {chosenEmployees.length === 0 ? <p>You did not choose anyone.</p> : chosenEmployees.map((emp) => {
            return (
              <ChosenEmployees key={emp.id} employee={emp} removeEmployee={removeEmployee} />
            )
          })}
        </div>
      </div>
    </div>
  )
}