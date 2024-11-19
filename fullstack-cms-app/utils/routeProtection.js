import { redirect } from "next/navigation"
export default async function RouteProtection() {
  try {

    const response = await fetch('http://localhost:8080/auth/routeProtection', {
      method: 'GET',
      credentials: 'include'
    })

    console.log(response)


    if (!response.ok) {
      console.log('test')
      const resData = await response.json()
      throw new Error(resData.message)
    }
  } catch (err) {
    redirect('/noAuth')
  }

}