"use client"
import { useEffect, useState } from "react"
import EmployeeCard from "../Employees/EmployeeCard"
import LoadingComp from "../Loading/LoadingComp"

export default function Admins() {

  const [allAdmins, setAllAdmins] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchAdmins() {
      setIsLoading(true)
      const response = await fetch('http://localhost:8080/admins', {
        method: 'GET',
        credentials: 'include'
      })
      const resData = await response.json()
      setAllAdmins(resData.allAdmins)
      setIsLoading(false)
    }


    fetchAdmins()
  }, [])

  return (
    <div className="flex justify-around items-start">
      {isLoading ? <LoadingComp /> : allAdmins?.map((admin) => {
        return (
          <EmployeeCard key={admin.id} employee={admin.employee} />
        )
      })}
    </div>
  )
}