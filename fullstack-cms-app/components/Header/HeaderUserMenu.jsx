import Link from "next/link"
import { redirect } from "next/navigation";

export default function HeaderUserMenu({ isMenu, user, setUser }) {


  function signOut() {
    localStorage.removeItem('token')
    setUser()
    redirect('/userLogin')
  }

  return (
    <div className={`${!isMenu ? 'opacity-0 invisible' : 'opacity-100'} flex flex-col items-start bg-gray-700 rounded-md px-4 py-2 absolute right-5 top-14 duration-100 `}>
      {user && <Link href={`/${user.userId}`}>Profile</Link>}
      <button>My Tasks</button>
      <button onClick={() => signOut()}>Log Out</button>
    </div>
  )
}