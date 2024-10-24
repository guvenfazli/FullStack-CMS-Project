import { jwtDecode } from "jwt-decode"
import { redirect } from "next/navigation"
export default function AuthCheck() {

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      const decoded = jwtDecode(token)
      return decoded
    } else {
      return redirect('/userLogin')
    }
  }

}