"use client"
import { useEffect, useState } from "react"
import EmployeeCard from "./EmployeeCard"
import LoadingComp from "../Loading/LoadingComp"
import RouteProtection from "@/utils/routeProtection"

export default function Employees() {

  const [employees, setEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    async function fetchEmployees() {
      await RouteProtection()
      setIsLoading(true)
      const response = await fetch('http://localhost:8080/employees', {
        credentials: 'include'
      })
      const resData = await response.json()
      setEmployees(resData.employees)
      setIsLoading(false)
    }

    fetchEmployees()
  }, [])



  return (
    <div className="flex justify-around items-start max-md:flex-col max-md:gap-5">
      {isLoading ? <LoadingComp /> : employees.map((employee) => {
        return (
          <EmployeeCard key={employee.id} employee={employee} />
        )
      })}
    </div>
  )
}