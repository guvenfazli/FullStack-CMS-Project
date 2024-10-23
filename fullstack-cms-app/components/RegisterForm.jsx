import Link from "next/link"

export default function LoginForm() {
  return (
    <div className="flex flex-col items-center w-2/6">
      <form className="flex flex-col  p-4 w-full bg-gray-900 rounded-lg shadow-2xl">
        <label htmlFor="name" className="text-xl mb-3">Name</label>
        <input name="name" id="name" className="text-gray-800 text-xl p-1 mb-3 rounded-md pl-2" placeholder="Enter Your Name"></input>
        <label htmlFor="surname" className="text-xl mb-3">Surname</label>
        <input name="surname" id="surname" className="text-gray-800 text-xl p-1 mb-3 rounded-md pl-2" placeholder="Enter Your Surname"></input>
        <label htmlFor="email" className="text-xl mb-3">Email Address</label>
        <input name="email" id="email" className="text-gray-800 text-xl p-1 mb-3 rounded-md pl-2" placeholder="Enter Your Username"></input>
        <label htmlFor="password" className="text-xl mb-3">Password</label>
        <input name="password" id="password" className="text-gray-800 text-xl p-1 rounded-md pl-2 mb-5" type="password" placeholder="Enter Your Password"></input>
        <label htmlFor="jobTitle" className="text-xl mb-3">Job Title</label>
        <input name="jobTitle" id="jobTitle" className="text-gray-800 text-xl p-1 mb-3 rounded-md pl-2" placeholder="Title"></input>
        <div className="flex w-full items-center justify-between">
          <button className="text-xl font-bold  hover:text-gray-300 duration-150">Create Account</button>
          <Link className="text-gray-400 hover:text-gray-300 duration-100" href={'/userLogin'}>Do You Have an Account? <span className="font-bold">Login</span></Link>
        </div>
      </form>
    </div>
  )
}