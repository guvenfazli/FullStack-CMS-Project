import { redirect } from "next/navigation";


export default function AuthCheck() {
  const token = localStorage.getItem('token')
  if (token) {
    return token
  } else {
    return redirect('/userLogin');
  }
}