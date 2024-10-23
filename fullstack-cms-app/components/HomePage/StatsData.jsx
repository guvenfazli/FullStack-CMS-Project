"use client"

import AuthCheck from "@/utils/authCheck"

export default function StatsData() {
  const token = AuthCheck()


  return (
    <div>
      <p>Here will come the statistics.</p>
    </div>
  )
}