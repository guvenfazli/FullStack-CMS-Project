import { useEffect, useState } from "react"
import AssignedEmployees from "./AssignedEmployees"
import EmployeeCard from "./EmployeeCard"

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
            <EmployeeCard key={emp.id} employee={emp} chooseEmployee={chooseEmployee} removeEmployee={removeEmployee} chosenEmployees={chosenEmployees} />
          )
        })}
      </div>

      <div className="flex justify-center items-center w-full">
        <button className="p-2 rounded-md bg-gray-300 text-gray-900">Assign Employee</button>
      </div>

    </div>
  )
}