"use client"
import { useState } from "react"
import Link from "next/link"
import AuthInput from "./AuthInput"
import AuthLabel from "./AuthLabel"
import AuthError from "./AuthError"
import AuthSuccess from "./AuthSuccess"
export default function RegisterForm() {

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState()
  const [errorState, setErrorState] = useState()


  async function createAccount(e) {
    e.preventDefault()
    const fd = new FormData(e.target)
    const data = Object.fromEntries(fd.entries())
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

        <AuthLabel customFor={"name"}>Name*</AuthLabel>
        <AuthInput customName={'name'} customPlace={'Enter Your Name'} setErrorState={setErrorState} isError={errorState} />

        <AuthLabel customFor={"surname"}>Surname*</AuthLabel>
        <AuthInput customName={'surname'} customPlace={'Enter Your Surname'} setErrorState={setErrorState} isError={errorState} />

        <AuthLabel customFor={"email"}>Email Address*</AuthLabel>
        <AuthInput inputType={'email'} customName={'email'} customPlace={'Enter Your Email'} setErrorState={setErrorState} isError={errorState} />

        <AuthLabel customFor={"password"}>Password*</AuthLabel>
        <AuthInput customName={'password'} customPlace={'Enter Your Password'} setErrorState={setErrorState} isError={errorState} inputType={'password'} />

        <AuthLabel customFor={"jobTitle"}>Job Title*</AuthLabel>
        <AuthInput customName={'jobTitle'} customPlace={'Your Title'} setErrorState={setErrorState} isError={errorState} />

        <div className="flex text-xl w-full items-center justify-between max-xl:flex-col max-xl:text-center max-lg:text-base max-lg:flex-col max-lg:text-center max-sm:text-sm">
          <button disabled={isLoading} className="border border-gray-800 px-5 py-2 rounded-lg font-bold hover:text-gray-900 hover:bg-gray-500 duration-150 disabled:bg-gray-300">{isLoading ? 'Creating Account' : 'Create Account'}</button>
          <Link className="text-gray-400 hover:text-gray-300 duration-100" href={'/userLogin'}>Do You Have an Account? <span className="font-bold">Login</span></Link>
        </div>

        {errorState && <AuthError errorState={errorState} />}
        {isSuccess && <AuthSuccess isSuccess={isSuccess} />}
      </form>


    </div>
  )
}