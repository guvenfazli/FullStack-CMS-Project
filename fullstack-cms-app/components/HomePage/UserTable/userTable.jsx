"use client"
import TableNav from "./tableNav"
import EmployeeTable from "./employeeTable"
import RegisterForm from "@/components/Authentication/RegisterForm"
import LoadingComp from "@/components/Loading/LoadingComp"

import { useEffect, useState } from "react"
import { useAppContext } from "@/context"


export default function UserTable() {
  const { isLogged } = useAppContext()
  const [allEmployees, setAllEmployees] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchAllEmployees() {
      setIsLoading(true)
      const response = await fetch('http://localhost:8080/employees', {
        method: 'GET',
        credentials: 'include'
      })
      const resData = await response.json()
      setAllEmployees(resData.employees)
      setIsLoading(false)
    }

    fetchAllEmployees()
  }, [])

  return (
    <div>
      <div>
        <p className="text-2xl mb-5">Users</p>
      </div>

      <TableNav isLogged={isLogged} FormComponent={RegisterForm} buttonText="Create Employee" inputPlaceHolder="Search Employees" />
      {isLoading ? <LoadingComp /> : <EmployeeTable fetchedEmployees={allEmployees} isLogged={isLogged} setAllEmployees={setAllEmployees} />}
    </div>
  )
}