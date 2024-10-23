import Link from "next/link"

export default function LoginForm() {
  return (
    <div className="flex flex-col items-center w-2/6 max-lg:w-2/4 max-sm:w-4/5">
      <form className="flex flex-col text-xl py-6 px-8 w-full bg-gray-900 rounded-lg shadow-2xl max-lg:text-base max-sm:text-sm">
        <label htmlFor="name" className="mb-3">Name</label>
        <input name="name" id="name" className="text-gray-800 px-1 py-2 mb-3 rounded-md pl-2" placeholder="Enter Your Name"></input>
        <label htmlFor="surname" className="mb-3">Surname</label>
        <input name="surname" id="surname" className="text-gray-800 px-1 py-2 mb-3 rounded-md pl-2" placeholder="Enter Your Surname"></input>
        <label htmlFor="email" className="mb-3">Email Address</label>
        <input name="email" id="email" className="text-gray-800 px-1 py-2 mb-3 rounded-md pl-2" placeholder="Enter Your Email Address"></input>
        <label htmlFor="password" className="mb-3">Password</label>
        <input name="password" id="password" className="text-gray-800 px-1 py-2 rounded-md pl-2 mb-5" type="password" placeholder="Enter Your Password"></input>
        <label htmlFor="jobTitle" className="mb-3">Job Title</label>
        <input name="jobTitle" id="jobTitle" className="text-gray-800 px-1 py-2 rounded-md pl-2 mb-5" placeholder="Title"></input>
        <div className="flex text-xl w-full items-center justify-between max-xl:flex-col max-xl:text-center max-lg:text-base max-lg:flex-col max-lg:text-center max-sm:text-sm">
          <button className="border border-gray-800 px-5 py-2 rounded-lg font-bold hover:text-gray-900 hover:bg-gray-500 duration-150">Create Account</button>
          <Link className="text-gray-400 hover:text-gray-300 duration-100" href={'/userLogin'}>Do You Have an Account? <span className="font-bold">Login</span></Link>
        </div>
      </form>
    </div>
  )
}