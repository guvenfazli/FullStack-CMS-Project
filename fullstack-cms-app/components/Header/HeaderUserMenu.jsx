import Link from "next/link"
import Notifications from "./Notifications";
import { redirect } from "next/navigation";

export default function HeaderUserMenu({ isMenu, user, setIsMenu, socket, isLogged }) {

  function signOut() {
    fetch('http://localhost:8080/auth/logOut', {
      method: 'POST',
      credentials: 'include'
    }).then(success => {
      redirect('/userLogin')
    })
  }

  return (
    <div onMouseLeave={() => setIsMenu(false)} className={`${!isMenu ? 'opacity-0 invisible' : 'opacity-100'} flex flex-col items-start bg-gray-700 rounded-md px-4 py-2 absolute right-5 top-14 duration-100 `}>
      {user && <Link className="mb-2 hover:text-gray-500 duration-100" href={`/employees/${user.userId}`}>Profile</Link>}

      <Link href={`/employees/${user.userId}`} className="mb-2 hover:text-gray-500 duration-100">My Tasks</Link>
      <button className="hover:text-gray-500 duration-100" onClick={() => signOut()}>Log Out</button>
      
      <div className="md:hidden flex w-full justify-center items-center">
        <Notifications socket={socket} isLogged={isLogged} />
      </div>
    </div>
  )
}