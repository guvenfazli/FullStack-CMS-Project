"use client"
import { useEffect, useState } from "react"
import EmployeeCard from "../Employees/EmployeeCard"
import LoadingComp from "../Loading/LoadingComp"

export default function Admins() {

  const [allAdmins, setAllAdmins] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    async function fetchAdmins() {
      try {
        setIsLoading(true)
        const response = await fetch('http://localhost:8080/admins', {
          credentials: 'include'
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()

        setAllAdmins(resData.allAdmins)
        setIsLoading(false)

      } catch (err) {
        setIsError(err.message)
        setIsLoading(false)
      }
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

      {isError && <p>{isError}</p>}
    </div>
  )
}