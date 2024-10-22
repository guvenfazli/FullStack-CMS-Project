import Link from "next/link"

export default function LoginForm() {
  return (
    <div className="flex flex-col items-center w-2/6">
      <form className="flex flex-col  p-4 w-full bg-gray-900 rounded-lg shadow-2xl">
        <label className="text-xl mb-3">Email Address</label>
        <input className=" text-xl p-1 mb-3 rounded-md pl-2" placeholder="Enter Your Username"></input>
        <label className="text-xl mb-3">Password</label>
        <input className=" text-xl p-1 rounded-md pl-2 mb-5" type="password" placeholder="Enter Your Password"></input>
        <div className="flex w-full items-center justify-between">
          <button className="text-lg hover:text-gray-400 duration-150">Login</button>
          <Link className="text-gray-400 hover:text-gray-300 duration-100" href={'/'}>Don't You Have an Account? <span className="font-bold">Create One!</span></Link>
        </div>
      </form>
    </div>
  )
}