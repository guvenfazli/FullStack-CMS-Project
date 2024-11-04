"use client"
import { useRef, useState } from "react"
import Link from "next/link"
import AuthInput from "./AuthInput"
import FileUploader from "./FileUploader"
import AuthLabel from "./AuthLabel"
import AuthError from "./AuthError"
import AuthSuccess from "./AuthSuccess"
import AuthNavigate from "./AuthNavigate"

export default function RegisterForm({ newUserCreation }) {

  const [isLoading, setIsLoading] = useState(false)
  const [fileState, setFileState] = useState()
  const [isSuccess, setIsSuccess] = useState()
  const [errorState, setErrorState] = useState()

  async function createAccount(e) {
    e.preventDefault()
    const fd = new FormData(e.target)
    fd.append('profilePic', fileState)
    let createAccount

    try {
      setIsLoading(true)
      if (newUserCreation) {
        createAccount = await fetch('http://localhost:8080/admin/createEmployee', {
          method: 'POST',
          body: fd,
          credentials: 'include'
        })
      } else {
        createAccount = await fetch('http://localhost:8080/auth/createAccount', {
          method: 'POST',
          body: fd,
        })
      }
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

  function gatherFiles(e) {
    setFileState(prev => {
      prev = e.target.files
      return prev
    })
  }

  if (newUserCreation) {
    return (
      <div className="flex flex-col items-center w-full max-lg:w-full max-sm:w-full">
        <form onSubmit={(e) => createAccount(e)} className="flex flex-col text-xl  w-full bg-gray-900 rounded-lg max-lg:text-base max-sm:text-sm">

          <AuthLabel customFor={"name"}>Name*</AuthLabel>
          <AuthInput customName={'name'} customPlace={"Enter Employee's Name"} setErrorState={setErrorState} isError={errorState} />

          <AuthLabel customFor={"surname"}>Surname*</AuthLabel>
          <AuthInput customName={'surname'} customPlace={"Enter Employee's Surname"} setErrorState={setErrorState} isError={errorState} />

          <AuthLabel customFor={"email"}>Email Address*</AuthLabel>
          <AuthInput inputType={'email'} customName={'email'} customPlace={"Enter Employee's Email"} setErrorState={setErrorState} isError={errorState} />

          <AuthLabel customFor={"password"}>Password*</AuthLabel>
          <AuthInput customName={'password'} customPlace={"Enter Employee's Password"} setErrorState={setErrorState} isError={errorState} inputType={'password'} />

          <AuthLabel customFor={"jobTitle"}>Job Title*</AuthLabel>
          <AuthInput customName={'jobTitle'} customPlace={"Enter Employee's Title"} setErrorState={setErrorState} isError={errorState} />

          <AuthLabel customFor={"birthdate"}>Date of Birth*</AuthLabel>
          <AuthInput customName={'birthdate'} inputType={'date'} setErrorState={setErrorState} isError={errorState} />


          <AuthLabel customFor={"phoneNumber"}>Contact Number*</AuthLabel>
          <AuthInput customName={'phoneNumber'} customPlace={"1234567890"} setErrorState={setErrorState} isError={errorState} />

          <AuthLabel>Profile Pic*</AuthLabel>
          <FileUploader setFileState={gatherFiles} customName={'profilePic'} customPlace={"Employee's Picture"} inputType={'file'} setErrorState={setErrorState} isError={errorState} />


          <AuthNavigate authType={'Sign Up'} navHref={'/userLogin'} newUserCreation={newUserCreation} />

          {errorState && <AuthError errorState={errorState} />}
          {isSuccess && <AuthSuccess isSuccess={isSuccess} />}
        </form>
      </div>
    )
  } else {
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

          <AuthLabel customFor={"birthDate"}>Date of Birth*</AuthLabel>
          <AuthInput customName={'birthDate'} inputType={'date'} setErrorState={setErrorState} isError={errorState} />

          <AuthLabel customFor={"phoneNumber"}>Contact Number*</AuthLabel>
          <AuthInput customName={'phoneNumber'} customPlace={"1234567890"} setErrorState={setErrorState} isError={errorState} />


          <AuthLabel>Profile Pic*</AuthLabel>
          <FileUploader setFileState={gatherFiles} customName={'profilePic'} customPlace={'Profile Picture'} inputType={'file'} setErrorState={setErrorState} isError={errorState} />


          <AuthNavigate authType={'Sign Up'} navHref={'/userLogin'} />

          {errorState && <AuthError errorState={errorState} />}
          {isSuccess && <AuthSuccess isSuccess={isSuccess} />}
        </form>
      </div>
    )
  }

}