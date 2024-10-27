"use client"
import TableNav from "./tableNav"
import EmployeeTable from "./employeeTable"



import { useEffect, useState } from "react"
import { useAppContext } from "@/context"


export default function UserTable() {
  const { isLogged } = useAppContext()
  const [allEmployees, setAllEmployees] = useState()

  useEffect(() => {
    async function fetchAllEmployees() {
      const response = await fetch('http://localhost:8080/employees', {
        method: 'GET',
        credentials: 'include'
      })
      const resData = await response.json()
      setAllEmployees(resData.employees)
    }

    fetchAllEmployees()
  }, [])



  return (
    <div>
      <div>
        <p className="text-2xl mb-5">Users</p>
      </div>



      <TableNav isLogged={isLogged} />
      <EmployeeTable fetchedEmployees={allEmployees} isLogged={isLogged} />
    </div>
  )
}