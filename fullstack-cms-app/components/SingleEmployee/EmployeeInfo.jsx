"use client"
import { Suspense, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { notFound } from "next/navigation"
import SingleEmployeeCard from "./SingleEmployeeCard"
import EmployeeTasks from "./EmployeeTasks"
import LoadingComp from "../Loading/LoadingComp"
import { lazy } from "react"
import RouteProtection from "@/utils/routeProtection"

export default function EmployeeInfo() {

  const employeeId = useParams().employeeId
  const [fetchedEmployee, setFetchedEmployee] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    async function fetchSingleEmployee() {
      await RouteProtection()
      try {
        setIsLoading(true)
        const response = await fetch(`http://localhost:8080/employees/${employeeId}`, {
          credentials: 'include'
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()
        setFetchedEmployee(resData.foundEmployee)
        setIsLoading(false)
      } catch (err) {
        setIsError(err.message)
        setIsLoading(false)
      }

    }

    fetchSingleEmployee()
  }, [])

  if (isError) {
    notFound()
  }

  const LazySingleEmployeeCard = lazy(() => import("./SingleEmployeeCard"))

  return (
    <div className="flex flex-row items-start justify-around rounded-xl max-md:flex-col max-md:gap-5 max-[1200px]:justify-between">
      <div className="w-1/4 bg-gray-800 max-md:w-full max-md:border-r-0 max-[1200px]:w-1/3">
        <Suspense fallback={<LoadingComp />}>
          <LazySingleEmployeeCard fetchedEmployee={fetchedEmployee} />
        </Suspense>
      </div>

      <div className="w-1/2 bg-gray-900 shadow-md rounded-md shadow-slate-950 max-md:w-full">
        <div className="flex border-t border-t-yellow-600 rounded-tl-md rounded-tr-md  border-b border-b-yellow-600 p-3 w-full justify-center items-center max-md:rounded-tr-none">
          <p className="text-xl">Assigned Tasks</p>
        </div>
        <EmployeeTasks tasks={fetchedEmployee?.tasks} />
      </div>
    </div >
  )
}