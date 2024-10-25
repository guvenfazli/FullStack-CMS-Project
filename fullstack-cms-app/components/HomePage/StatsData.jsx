"use client"
import { useAppContext } from "@/context"



export default function StatsData() {

  const { isLogged } = useAppContext()

  if (isLogged) {
    return (
      <div>
        <p>Here will come the statistics</p>
      </div>
    )
  }
}