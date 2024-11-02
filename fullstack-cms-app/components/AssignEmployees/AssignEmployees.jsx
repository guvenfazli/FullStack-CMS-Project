import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import AssignedEmployees from "./AssignedEmployees"
import EmployeeCard from "./EmployeeCard"

export default function AssignEmployees({ task, isLogged }) {

  const [employeeList, setEmployeeList] = useState()
  const [chosenEmployees, setChosenEmployees] = useState([])
  const { toast } = useToast()


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

  function chooseEmployee(employeeId) {
    setChosenEmployees(prev => {
      let updated = [...prev]
      updated.push(employeeId)
      return updated
    })
  }

  function removeEmployee(employeeId) {
    const foundIndex = chosenEmployees.findIndex(emp => emp === employeeId)
    setChosenEmployees(prev => {
      let updated = [...prev]
      updated.splice(foundIndex, 1)
      return updated
    })
  }

  async function assignEmployees(taskId) {
    const response = await fetch(`http://localhost:8080/admin/assignEmployees/${taskId}`, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(chosenEmployees),
      headers: {
        'Content-Type': 'application/json',
      }
    })

  }

  async function resignEmployees(taskId, employeeId) {
    const response = await fetch(`http://localhost:8080/admin/resignEmployees/${taskId}/${employeeId}`, {
      method: 'PUT',
      credentials: 'include'
    })
  }

  return (
    <div className="flex flex-col p-2 justify-start items-start">
      <div className="flex flex-row items-start gap-2">
        {task.employees.length === 0 ? <p className="mb-5">No one assigned to this task.</p> :
          task.employees.map((emp) => {
            return (
              <AssignedEmployees key={emp.id} task={task} employee={emp} resignEmployees={resignEmployees} />
            )
          })
        }
      </div>

      {isLogged.isAdmin &&
        <>
          <div className="flex w-full p-2 flex-row justify-around items-start mb-5">
            {employeeList?.map((emp) => {
              const alreadyAssigned = task.employees.some((assignedEmp) => assignedEmp.id === emp.id)
              if (!alreadyAssigned) {
                return (
                  <EmployeeCard
                    key={emp.id}
                    employee={emp}
                    chooseEmployee={chooseEmployee}
                    removeEmployee={removeEmployee}
                    chosenEmployees={chosenEmployees} />
                )
              }
            })}
          </div>

          <div className="flex justify-center items-center w-full">
            <button onClick={() => assignEmployees(task.id)} className="p-2 rounded-md duration-75 bg-gray-300 text-gray-900 hover:bg-gray-600 hover:text-gray-300">Assign Employee</button>
          </div>
        </>
      }

    </div>
  )
}