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

  return (
    <div className="flex flex-row items-start justify-around rounded-xl max-md:flex-col max-md:gap-5">
      {isLoading ? <LoadingComp /> :
        <>
          <div className="w-1/4 bg-gray-800 max-md:w-full max-md:border-r-0">
            <SingleEmployeeCard fetchedEmployee={fetchedEmployee} />
          </div>

          <div className="w-1/2 bg-gray-900 shadow-md shadow-slate-950 max-md:w-full">
            <div className="flex border-t border-t-yellow-600  border-b border-b-yellow-600 p-3 w-full justify-center items-center max-md:rounded-tr-none">
              <p className="text-xl">Assigned Tasks</p>
            </div>
            <EmployeeTasks tasks={fetchedEmployee?.tasks} />
          </div>

        </>
      }

    </div>
  )
}