"use client"
import { useAppContext } from "@/context";
import { redirect } from "next/navigation";


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