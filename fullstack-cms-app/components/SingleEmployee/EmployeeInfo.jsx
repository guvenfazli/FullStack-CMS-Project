"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import SingleEmployeeCard from "./SingleEmployeeCard"
import EmployeeTasks from "./EmployeeTasks"
import LoadingComp from "../Loading/LoadingComp"
export default function EmployeeInfo() {

  const employeeId = useParams().employeeId
  const [fetchedEmployee, setFetchedEmployee] = useState()
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    async function fetchSingleEmployee() {
      setIsLoading(true)
      const response = await fetch(`http://localhost:8080/employees/${employeeId}`, {
        method: 'GET',
        credentials: 'include'
      })
      const resData = await response.json()
      setFetchedEmployee(resData.foundEmployee)
      setIsLoading(false)
    }

    fetchSingleEmployee()
  }, [])
  console.log(fetchedEmployee)

  return (
    <div className="flex flex-row items-start justify-around bg-slate-900 rounded-xl">
      {isLoading ? <LoadingComp /> :
        <>
          <div className="w-1/2 border-r p-2">
            <SingleEmployeeCard fetchedEmployee={fetchedEmployee} />
          </div>

          <div className="w-1/2">
            <div className="flex border-t border-b p-3 w-full justify-center items-center">
              <p className="text-xl">Assigned Tasks</p>
            </div>

            <EmployeeTasks tasks={fetchedEmployee?.tasks} />
          </div>

        </>
      }

    </div>
  )
}