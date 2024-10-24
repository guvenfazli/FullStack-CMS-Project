import Link from "next/link"

export default function HeaderUserResponsiveMenu({ isResponsiveMenu, user }) {
  return (
    <div className={`${!isResponsiveMenu ? 'opacity-0 invisible' : 'opacity-100'} flex flex-col items-start bg-gray-700 rounded-md px-4 py-2 absolute left-5 top-14 duration-100 `}>
      {user && <Link href={`/${user.userId}`}>Profile</Link>}
      <button>My Tasks</button>
      <button>Log Out</button>
    </div>
  )
}