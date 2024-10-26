"use client"
import { useAppContext } from "@/context";
import DataCard from "./DataCard";
import { useEffect, useState } from "react";

export default function StatsData() {

  const { isLogged } = useAppContext()
  const [totalUsers, setTotalUsers] = useState()

  useEffect(() => {
    async function fetchEmployeeCounts() {
      const response = await fetch('http://localhost:8080/home', {
        method: 'GET',
        credentials: 'include'
      })
      const resData = await response.json()
      setTotalUsers(resData.totalUsers)
    }

    fetchEmployeeCounts()
  }, [])




  if (isLogged) {
    return (
      <div className="flex flex-col justify-start items-start">
        <div className="flex w-full  justify-start mb-10 max-sm:flex-col">
          <DataCard cardTitle="Current Users" dataType="Current" totalUsers={totalUsers} />
          <DataCard cardTitle="User Goal ( 100 )" dataType="Goal" totalUsers={totalUsers} />
        </div>
      </div>
    )
  }
}