"use client"
import { useAppContext } from "@/context";
import { redirect } from "next/navigation";
import DataCard from "./DataCard";

export default function StatsData() {

  const { isLogged } = useAppContext()


  if (isLogged) {
    return (
      <div className="flex flex-col justify-start items-start">
        <div className="flex w-full  justify-start  mb-10">
          <DataCard cardTitle="Current Users" dataType="Current" />
          <DataCard cardTitle="User Goal" dataType="Goal" />
        </div>
        <p>Here will come the statistics</p>
      </div>
    )
  }
}