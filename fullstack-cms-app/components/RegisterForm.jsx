"use client"
import { useState } from "react"
import Link from "next/link"

export default function LoginForm() {

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState()
  const [errorState, setErrorState] = useState()


  async function createAccount(e) {
    e.preventDefault()
    const fd = new FormData(e.target)
    const data = Object.fromEntries(fd.entries())
    setIsLoading(true)

    try {
      setIsLoading(true)
      const createAccount = await fetch('http://localhost:8080/auth/createAccount', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!createAccount.ok) {
        setIsLoading(false)
        const responseData = await createAccount.json()
        throw new Error(responseData.message)
      }
      const responseData = await createAccount.json()
      setIsSuccess(responseData.message)
      setIsLoading(false)
      e.target.reset()
    } catch (err) {
      setErrorState(err.message)
      e.target.reset()
    }
  }

  return (
    <div className="flex flex-col items-center w-2/6 max-lg:w-2/4 max-sm:w-4/5">
      <form onSubmit={(e) => createAccount(e)} className="flex flex-col text-xl py-6 px-8 w-full bg-gray-900 rounded-lg shadow-2xl max-lg:text-base max-sm:text-sm">
        <label htmlFor="name" className="mb-3">Name*</label>
        <input onChange={() => setErrorState(false)} name="name" id="name" className={`text-gray-800 px-1 py-2 mb-3 rounded-md pl-2 ${errorState && "border-2 border-red-500 duration-100"}`} placeholder="Enter Your Name"></input>
        <label htmlFor="surname" className="mb-3">Surname*</label>
        <input onChange={() => setErrorState(false)} name="surname" id="surname" className={`text-gray-800 px-1 py-2 mb-3 rounded-md pl-2 ${errorState && "border-2 border-red-500 duration-100"}`} placeholder="Enter Your Surname"></input>
        <label htmlFor="email" className="mb-3">Email Address*</label>
        <input onChange={() => setErrorState(false)} name="email" id="email" className={`text-gray-800 px-1 py-2 mb-3 rounded-md pl-2 ${errorState && "border-2 border-red-500 duration-100"}`} placeholder="Enter Your Email Address"></input>
        <label htmlFor="password" className="mb-3">Password*</label>
        <input onChange={() => setErrorState(false)} name="password" id="password" className={`text-gray-800 px-1 py-2 mb-3 rounded-md pl-2 ${errorState && "border-2 border-red-500 duration-100"}`} type="password" placeholder="Enter Your Password"></input>
        <label htmlFor="jobTitle" className="mb-3">Job Title*</label>
        <input onChange={() => setErrorState(false)} name="jobTitle" id="jobTitle" className={`text-gray-800 px-1 py-2 mb-3 rounded-md pl-2 ${errorState && "border-2 border-red-500 duration-100"}`} placeholder="Title"></input>
        <div className="flex text-xl w-full items-center justify-between max-xl:flex-col max-xl:text-center max-lg:text-base max-lg:flex-col max-lg:text-center max-sm:text-sm">
          <button disabled={isLoading} className="border border-gray-800 px-5 py-2 rounded-lg font-bold hover:text-gray-900 hover:bg-gray-500 duration-150 disabled:bg-gray-300">{isLoading ? 'Creating Account' : 'Create Account'}</button>
          <Link className="text-gray-400 hover:text-gray-300 duration-100" href={'/userLogin'}>Do You Have an Account? <span className="font-bold">Login</span></Link>
        </div>

        {errorState &&
          <div className="mt-5 flex justify-center items-center">
            <p className="text-xl text-red-500">{errorState}</p>
          </div>
        }
        {isSuccess &&
          <div className="mt-5 flex justify-center items-center">
            <p className="text-xl text-green-500">{isSuccess}</p>
          </div>
        }
      </form>


    </div>
  )
}