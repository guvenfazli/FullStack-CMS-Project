"use client"

import AuthCheck from "@/utils/authCheck"
import { useEffect } from "react"

export default function StatsData() {
  
  useEffect(() => {
    fetch('http://localhost:8080/auth/cookieCheck', {
      method: 'GET',
      credentials: 'include'
    })
  })


  return (
    <div>
      <p>Here will come the statistics.</p>
    </div>
  )
}