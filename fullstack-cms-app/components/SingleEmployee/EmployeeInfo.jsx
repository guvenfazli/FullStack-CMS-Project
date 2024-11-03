"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function EmployeeInfo() {

  const employeeId = useParams().employeeId

  useEffect(() => {
    async function fetchSingleEmployee() {
      const response = await fetch(`http://localhost:8080/employees/${employeeId}`, {
        method: 'GET',
        credentials: 'include'
      })
    }

    fetchSingleEmployee()
  }, [])

  return (
    <div className="flex flex-row items-start justify-around bg-slate-900">

      <div className="w-1/2 border p-2">
        <p>Here will be the employee informations.</p>
      </div>

      <div className="w-1/2 border p-2">
        <p>Here will be the tasks that assigned to the employee.</p>
      </div>

    </div>
  )
}