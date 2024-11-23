"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useEffect, useState } from "react"
import AuthInput from "./AuthInput"
import FileUploader from "./FileUploader"
import AuthLabel from "./AuthLabel"
import AuthError from "./AuthError"
import AuthSuccess from "./AuthSuccess"
import AuthNavigate from "./AuthNavigate"

export default function RegisterForm({ newUserCreation, socket }) {

  const [isLoading, setIsLoading] = useState(false)
  const [fileState, setFileState] = useState() // Gets the profile picture of the user.
  const [isSuccess, setIsSuccess] = useState()
  const [errorState, setErrorState] = useState()

  async function createAccount(e) {
    e.preventDefault()
    const fd = new FormData(e.target)
    fd.append('profilePic', fileState)
    let createAccount;

    try {
      setIsLoading(true)
      if (newUserCreation) { // Admin creates the user
        createAccount = await fetch('http://localhost:8080/admin/createEmployee', {
          method: 'POST',
          body: fd,
          credentials: 'include'
        })
        socket.emit('employeeCreated', 'Employee Created')
      } else { // User first time registering
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

  function gatherFiles(e) { // Gets the files from the input file uploader
    setFileState(prev => {
      prev = e.target.files
      return prev
    })
  }

  useEffect(() => { // Sets a timer for the feedbacks
    if (errorState) {
      setTimeout(() => {
        setErrorState(false)
      }, 3000)
    } else if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false)
      }, 1000)
    }
  }, [errorState, isSuccess])

  if (newUserCreation) { // Admin employee creation form.
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
          <Select name="jobTitle">
            <SelectTrigger className={`text-gray-800 px-1 py-2 mb-3 rounded-md pl-2 text-xl`}>
              <SelectValue placeholder="Title" />
            </SelectTrigger>
            <SelectContent className="hover:cursor-pointer group-[]:">
              <SelectItem value="Frontend Dev.">Frontend Developer</SelectItem>
              <SelectItem value="Backend Dev.">Backend Developer</SelectItem>
              <SelectItem value="Fullstack Dev.">Fullstack Developer</SelectItem>
              <SelectItem value="System Dsgnr.">System Designer</SelectItem>
              <SelectItem value="UI/UX Dsgnr">UI/UX Designer</SelectItem>
              <SelectItem value="DevOps Eng.">DevOps Engineer</SelectItem>
            </SelectContent>
          </Select>


          <AuthLabel customFor={"birthDate"}>Date of Birth*</AuthLabel>
          <AuthInput customName={'birthDate'} inputType={'date'} setErrorState={setErrorState} isError={errorState} />


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
  } else { // User creation form
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
          <Select name="jobTitle">
            <SelectTrigger className={`text-gray-800 px-1 py-2 mb-3 rounded-md pl-2 text-xl`}>
              <SelectValue placeholder="Title" />
            </SelectTrigger>
            <SelectContent className="hover:cursor-pointer group-[]:">
              <SelectItem value="Frontend Dev.">Frontend Developer</SelectItem>
              <SelectItem value="Backend Dev.">Backend Developer</SelectItem>
              <SelectItem value="Fullstack Dev.">Fullstack Developer</SelectItem>
              <SelectItem value="System Dsgnr.">System Designer</SelectItem>
              <SelectItem value="UI/UX Dsgnr">UI/UX Designer</SelectItem>
              <SelectItem value="DevOps Eng.">DevOps Engineer</SelectItem>
            </SelectContent>
          </Select>

          <AuthLabel customFor={"birthDate"}>Date of Birth*</AuthLabel>
          <AuthInput customName={'birthDate'} inputType={'date'} setErrorState={setErrorState} isError={errorState} />

          <AuthLabel customFor={"phoneNumber"}>Contact Number*</AuthLabel>
          <AuthInput customName={'phoneNumber'} customPlace={"1234567890"} setErrorState={setErrorState} isError={errorState} />


          <AuthLabel>Profile Pic*</AuthLabel>
          <FileUploader setFileState={gatherFiles} customName={'profilePic'} customPlace={'Profile Picture'} inputType={'file'} setErrorState={setErrorState} isError={errorState} />


          <AuthNavigate
            authType={'Sign Up'} navHref={'/userLogin'} isLoading={isLoading}>Already have an account? <span className="font-bold">Log In!</span></AuthNavigate>

          {errorState && <AuthError errorState={errorState} />}
          {isSuccess && <AuthSuccess isSuccess={isSuccess} />}
        </form>
      </div>
    )
  }

}