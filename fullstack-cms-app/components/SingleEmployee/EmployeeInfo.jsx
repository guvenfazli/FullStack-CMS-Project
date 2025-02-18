"use client"
import { useState } from "react"
import { useParams, notFound } from "next/navigation"
import EmployeeStats from "./EmployeeStats"
import EmployeeTasks from "./EmployeeTasks"
import SingleEmployeeCard from "./SingleEmployeeCard"

export default function EmployeeInfo({ foundEmployee, stats, error }) {

  if (error) {
    notFound()
  }

  const employeeId = useParams().employeeId
  const [fetchedEmployee, setFetchedEmployee] = useState(foundEmployee)
  const [foundEmployeeStats, setFoundEmployeeStats] = useState(stats)



  return (
    <div className="flex flex-col w-full justify-start gap-5 ">
      <div className="flex flex-row items-start justify-around rounded-xl h-[676px] max-md:flex-col max-md:gap-5 max-[1200px]:justify-between max-md:h-auto">
        <div className="w-1/4 bg-gray-800 max-md:w-full max-md:border-r-0 max-[1200px]:w-1/3">
          <SingleEmployeeCard fetchedEmployee={fetchedEmployee} />
        </div>

        <div className="w-1/2 bg-gray-800 flex flex-col h-full gap-5 justify-start rounded-md shadow-slate-950 max-md:w-full">

          <div className="w-full bg-gray-900 flex flex-col  overflow-scroll overflow-x-hidden justify-start shadow-md rounded-md shadow-slate-950 max-md:w-full">
            <div className="flex border-t border-t-yellow-600 rounded-tl-md rounded-tr-md  border-b border-b-yellow-600 p-3 w-full justify-center items-center max-md:rounded-tr-none">
              <p className="text-xl">Assigned Tasks</p>
            </div>
            <EmployeeTasks tasks={fetchedEmployee?.tasks} />
          </div>
        </div>

      </div>


      <div className="w-full bg-gray-900 flex flex-col justify-start shadow-md rounded-md shadow-slate-950 max-md:w-full">
        <div className="flex border-t border-t-yellow-600 rounded-tl-md rounded-tr-md border-b border-b-yellow-600 p-3 w-full justify-center items-center max-md:rounded-tr-none">
          <p className="text-xl">Employee Stats</p>
        </div>
        <EmployeeStats employeeStats={foundEmployeeStats} />
      </div>

    </div>
  )
}