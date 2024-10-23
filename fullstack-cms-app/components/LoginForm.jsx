"use client"
import Link from "next/link"

export default function LoginForm() {

  function submitLogin(e) {
    e.preventDefault()
    const fd = new FormData(e.target)
    const data = Object.fromEntries(fd.entries())
    console.log(data)
    e.target.reset()
  }



  return (
    <div className="flex flex-col items-center w-2/6 max-lg:w-2/4 max-sm:w-4/5">
      <form onSubmit={(e) => submitLogin(e)} className="flex flex-col text-xl p-4 px-8 w-full bg-gray-900 rounded-lg shadow-2xl max-lg:text-base max-sm:text-sm">
        <label htmlFor="email" className="mb-3">Email Address</label>
        <input name="email" id="email" className="text-gray-800 px-1 py-2 mb-3 rounded-md pl-2" placeholder="Enter Your Email Address"></input>
        <label htmlFor="password" className=" mb-3">Password</label>
        <input name="password" id="password" className="text-gray-800 px-1 py-2 rounded-md pl-2 mb-5" type="password" placeholder="Enter Your Password"></input>
        <div className="flex text-xl w-full items-center justify-between max-xl:flex-col max-xl:text-center max-lg:text-base max-lg:flex-col max-lg:text-center max-sm:text-sm">
          <button className="font-bold border border-gray-800 px-5 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-500 duration-150 max-xl:mb-5 max-lg:mb-5">Login</button>
          <Link className="text-gray-400 hover:text-gray-300 duration-100" href={'/userRegister'}>Don't You Have an Account? <span className="font-bold">Create One!</span></Link>
        </div>
      </form>
    </div>
  )
}