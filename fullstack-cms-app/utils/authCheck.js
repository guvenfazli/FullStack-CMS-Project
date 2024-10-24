import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode"


export default function AuthCheck() {

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      const decoded = jwtDecode(token)
      return decoded
    } else {
      return redirect('/userLogin');
    }
  }


}