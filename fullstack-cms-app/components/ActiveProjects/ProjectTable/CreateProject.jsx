import { useState } from "react"

import AuthLabel from "@/components/Authentication/AuthLabel"
import AuthInput from "@/components/Authentication/AuthInput"
import AuthError from "@/components/Authentication/AuthError"
import AuthSuccess from "@/components/Authentication/AuthSuccess"

export default function CreateProjectForm() {

  const [errorState, setErrorState] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)



  return (
    <div className="flex flex-col items-center w-full max-lg:w-2/4 max-sm:w-4/5">
      <form className="flex flex-col text-xl py-6 px-8 w-full bg-gray-900 rounded-lg max-lg:text-base max-sm:text-sm">

        <AuthLabel customFor={"name"}>Project Title</AuthLabel>
        <AuthInput customName={'name'} customPlace={'Project Title'} setErrorState={setErrorState} isError={errorState} />

        <AuthLabel customFor={"surname"}>Deadline</AuthLabel>
        <AuthInput customName={'surname'} customPlace={'Deadline'} setErrorState={setErrorState} isError={errorState} />

        <button className="mt-5 p-2 duration-75 bg-gray-600 rounded-lg hover:bg-gray-400 active:bg-gray-700">Create Project</button>

        {errorState && <AuthError errorState={errorState} />}
        {isSuccess && <AuthSuccess isSuccess={isSuccess} />}
      </form>
    </div>
  )
}