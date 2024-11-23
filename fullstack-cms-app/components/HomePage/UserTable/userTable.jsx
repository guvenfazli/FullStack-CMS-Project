"use client"
import { useEffect, useState } from "react"
import { useAppContext } from "@/context"
import TableNav from "./tableNav"
import EmployeeTable from "./employeeTable"
import RegisterForm from "@/components/Authentication/RegisterForm"
import LoadingComp from "@/components/Loading/LoadingComp"

export default function UserTable({ socket }) {
  const { isLogged } = useAppContext()
  const [allEmployees, setAllEmployees] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchAllEmployees() { // Fetches the employees
      setIsLoading(true)
      const response = await fetch('http://localhost:8080/employees', {
        credentials: 'include'
      })
      const resData = await response.json()
      setAllEmployees(resData.employees)
      setIsLoading(false)
    }

    socket.on('refreshEmployees', (emp) => {
      fetchAllEmployees()
    })

    fetchAllEmployees()

    return () => {
      socket.disconnect()
    }
  }, [])



  async function searchEmployees(searchParam) {
    const response = await fetch(`http://localhost:8080/employees?employee=${searchParam}`, {
      credentials: 'include'
    })
    const resData = await response.json()
    setAllEmployees(resData.employees)
  }


  return (
    <div>
      <div>
        <p className="text-2xl mb-5">Employees</p>
      </div>

      <TableNav
        isLogged={isLogged} searchFn={searchEmployees} FormComponent={RegisterForm} buttonText="Create Employee" inputPlaceHolder="Search Employees" socket={socket} />
      {isLoading ? <LoadingComp /> : <EmployeeTable fetchedEmployees={allEmployees} isLogged={isLogged} setAllEmployees={setAllEmployees} socket={socket} />}
    </div>
  )
}