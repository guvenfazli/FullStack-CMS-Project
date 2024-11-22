import Link from "next/link"

export default function Resources({ isOpen }) {
  return (
    <div className={`flex flex-col justify-start duration-100 items-start overflow-hidden ${isOpen ? "max-h-56 mt-5 max-sm:mt-2" : "max-h-0"}`}>
      <Link href={'/employees'} className="mb-3 duration-100 hover:text-gray-500">Employees</Link>
      <Link href={'/admins'} className="mb-3 duration-100 hover:text-gray-500">Admins</Link>
      <Link href={'/activeProjects'} className="mb-3 duration-100 hover:text-gray-500 text-left">Active Projects</Link>
    </div>
  )
}

