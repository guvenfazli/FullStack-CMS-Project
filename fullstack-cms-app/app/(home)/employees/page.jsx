import { cookies } from "next/headers"
import Employees from "@/components/Employees/Employees"
export default async function EmployeesPage() {

  const cookie = await cookies()

  try {
    const response = await fetch('http://localhost:8080/employees', {
      headers: { Cookie: cookie.toString() }
    })

    if (!response.ok) {
      const resData = await response.json()
      const error = new Error(resData.message)
      throw error
    }
    const resData = await response.json()

    return (
      <Employees fetchedEmployees={resData.employees} />
    )

  } catch (err) {
    return (
      <Employees fetchedEmployees={resData.employees} isError={err} />
    )
  }
}