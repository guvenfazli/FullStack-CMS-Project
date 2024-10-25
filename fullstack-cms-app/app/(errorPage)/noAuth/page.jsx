import Link from "next/link"
export default function NoTokenPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-4xl mb-5">In Order to Continue, Please Login First.</p>
      <Link className="text-3xl" href={'/userLogin'}>Login</Link>
    </div>
  )
}