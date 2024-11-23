import { useEffect, useState } from "react"
import AssignedEmployees from "./AssignedEmployees"
import EmployeeCard from "./EmployeeCard"

export default function AssignEmployees({ task, isLogged, socket, projectId }) {

  const [employeeList, setEmployeeList] = useState()
  const [chosenEmployees, setChosenEmployees] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)


  useEffect(() => {
    async function fetchEmployees() { // Gets the employee to assign.
      const response = await fetch('http://localhost:8080/employees', {
        credentials: 'include'
      })
      const resData = await response.json()
      setEmployeeList(resData.employees)
    }

    fetchEmployees()
  }, [])

  useEffect(() => { // Sets timer for the feedbacks.
    if (isError) {
      setTimeout(() => {
        setIsError(false)
      }, 3000)
    }

    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }

  }, [isError, isSuccess])

  function chooseEmployee(employeeId) { // Adds employee to a list, that will be assigned for the chosen task
    setChosenEmployees(prev => {
      let updated = [...prev]
      updated.push(employeeId)
      return updated
    })
  }

  function removeEmployee(employeeId) { // Removes the employee from the task
    const foundIndex = chosenEmployees.findIndex(emp => emp === employeeId)
    setChosenEmployees(prev => {
      let updated = [...prev]
      updated.splice(foundIndex, 1)
      return updated
    })
  }

  async function assignEmployees(taskId) { // Assignes the chosen employee.
    try {
      const response = await fetch(`http://localhost:8080/admin/assignEmployees/${taskId}/${projectId}`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(chosenEmployees),
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData.message)
        throw error
      }
      socket.emit('employeeAssigned', projectId, chosenEmployees, taskId)
      const resData = await response.json()
      setIsSuccess(resData.message)
      setChosenEmployees([])
    } catch (err) {
      setIsError(err.message)
    }


  }

  async function resignEmployees(taskId, employeeId) { // Resigns the employee

    try {
      const response = await fetch(`http://localhost:8080/admin/resignEmployees/${taskId}/${employeeId}/${projectId}`, {
        method: 'PUT',
        credentials: 'include'
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData.message)
        throw error
      }

      socket.emit('employeeReassigned', projectId, employeeId, taskId)
      const resData = await response.json()
      setIsSuccess(resData.message)
    } catch (err) {
      setIsError(err.message)
    }
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

      {isLogged.isAdmin ?
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

          <div className="flex w-full justify-center mt-4 items-center">
            {isSuccess && <p className="text-green-500">{isSuccess}</p>}
            {isError && <p className="text-red-500">{isError}</p>}
          </div>
        </> :

        <>
          <div className="flex w-full p-2 flex-row justify-around items-start mb-5">
            {employeeList?.map((emp) => {
              return (
                <EmployeeCard
                  key={emp.id}
                  employee={emp}
                  chooseEmployee={chooseEmployee}
                  removeEmployee={removeEmployee}
                  chosenEmployees={chosenEmployees} />
              )
            })}
          </div>
        </>
      }

    </div>
  )
}