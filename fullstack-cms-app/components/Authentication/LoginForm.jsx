"use client"

import { useState } from "react"
import Link from "next/link"
import AuthInput from "./AuthInput"
import AuthLabel from "./AuthLabel"
import AuthError from "./AuthError"
import AuthSuccess from "./AuthSuccess"

export default function LoginForm() {

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState()
  const [errorState, setErrorState] = useState()

  async function submitLogin(e) {
    e.preventDefault()
    const fd = new FormData(e.target)
    const data = Object.fromEntries(fd.entries())

    try {

      setIsLoading(true)
      const sendRequest = await fetch('http://localhost:8080/auth/loginAccount', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!sendRequest.ok) {
        const resData = await sendRequest.json()
        throw new Error(resData.message)
      }

      const resData = await sendRequest.json()

      setIsSuccess(resData.message)
      setIsLoading(false)

    } catch (err) {
      setIsLoading(false)
      setErrorState(err.message)
    }

    e.target.reset()
  }


  return (
    <div className="flex flex-col items-center w-2/6 max-lg:w-2/4 max-sm:w-4/5">
      <form onSubmit={(e) => submitLogin(e)} className="flex flex-col text-xl p-4 px-8 w-full bg-gray-900 rounded-lg shadow-2xl max-lg:text-base max-sm:text-sm">

        <AuthLabel customFor="email">Email</AuthLabel>
        <AuthInput inputType={'email'} customName={'email'} customPlace={'Enter Your Email'} setErrorState={setErrorState} isError={errorState} />

        <AuthLabel customFor="password">Password</AuthLabel>
        <AuthInput inputType={'password'} customName={'password'} customPlace={'Enter Your Password'} setErrorState={setErrorState} isError={errorState} />

        <div className="flex text-xl w-full items-center justify-between max-xl:flex-col max-xl:text-center max-lg:text-base max-lg:flex-col max-lg:text-center max-sm:text-sm">
          <button className="font-bold border border-gray-800 px-5 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-500 duration-150 max-xl:mb-5 max-lg:mb-5">Login</button>
          <Link className="text-gray-400 hover:text-gray-300 duration-100" href={'/userRegister'}>Don't You Have an Account? <span className="font-bold">Create One!</span></Link>
        </div>


        {errorState && <AuthError errorState={errorState} />}
        {isSuccess && <AuthSuccess isSuccess={isSuccess} />}
      </form>
    </div>
  )
}