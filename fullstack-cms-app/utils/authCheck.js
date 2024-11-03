import { redirect } from "next/navigation"
export default async function AuthCheck() {
  try {

    const response = await fetch('http://localhost:8080/auth/cookieCheck', {
      method: 'GET',
      credentials: 'include'
    })

    if (!response.ok) {
      const resData = await response.json()
      throw new Error(resData.message)
    }

    const resData = await response.json()

    return resData
  } catch (err) {
    redirect('/noAuth')
  }

}