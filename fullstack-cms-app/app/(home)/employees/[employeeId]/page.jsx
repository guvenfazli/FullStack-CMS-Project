import EmployeeInfo from "@/components/SingleEmployee/EmployeeInfo"
import RouteProtection from "@/utils/routeProtection"
import { cookies } from "next/headers";

export default async function SingleEmployeePage({ params }) {

  const { employeeId } = await params
  const cookie = await cookies()

  /* await RouteProtection() // Checks if the user is authenticated */
  try {
    const response = await fetch(`http://localhost:8080/employees/${employeeId}`, {
      headers: { Cookie: cookie.toString() }
    })

    if (!response.ok) {
      const resData = await response.json()
      const error = new Error(resData.message)
      throw error
    }

    const resData = await response.json()
    return (
      <EmployeeInfo foundEmployee={resData.foundEmployee} stats={resData.foundEmployeeStats} />
    )
  } catch (err) {
    return (
      <EmployeeInfo error={err} />
    )
  }


}