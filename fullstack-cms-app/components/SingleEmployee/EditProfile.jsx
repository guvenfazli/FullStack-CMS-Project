import EditLabel from "../SingleProject/EditTaskDialog/EditLabel"
import EditInput from "../SingleProject/EditTaskDialog/EditInput"
import DatePicker from "../ActiveProjects/ProjectTable/DatePicker"
import AuthError from "../Authentication/AuthError"
import AuthSuccess from "../Authentication/AuthSuccess"
import { useState, useEffect } from "react"

export default function EditProfile({ employee }) {

  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)


  async function editAccount(e) {
    e.preventDefault()
    const fd = new FormData(e.target)
    try {
      const response = await fetch(`http://localhost:8080/employees/${employee.id}`, {
        method: 'PUT',
        body: fd,
        credentials: 'include'
      })

      if (!response.ok) {
        const resData = await response.json()
        throw new Error(resData.message)
      }

      const resData = await response.json()
      setIsSuccess(resData.message)
    } catch (err) {
      setIsError(err.message)
      e.target.reset()
    }
  }

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError(false)
      }, 3000)
    } else if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }
  }, [isError, isSuccess])




  return (
    <div className="flex flex-col items-center w-full max-lg:w-full max-sm:w-full">
      <form onSubmit={(e) => editAccount(e)} className="flex flex-col text-xl  w-full bg-gray-900 rounded-lg max-lg:text-base max-sm:text-sm">

        <EditLabel htmlFor="name">Name</EditLabel>
        <EditInput name="name" id="name" defValue={employee.name}>{employee.name}</EditInput>

        <EditLabel htmlFor="surname">Surname</EditLabel>
        <EditInput name="surname" id="surname" defValue={employee.surname}>{employee.surname}</EditInput>

        <EditLabel htmlFor="email">Email</EditLabel>
        <EditInput name="email" id="email" defValue={employee.email}>{employee.email}</EditInput>

        <EditLabel htmlFor="jobTitle">Job Title</EditLabel>
        <EditInput name="jobTitle" id="jobTitle" defValue={employee.jobTitle}>{employee.jobTitle}</EditInput>

        <EditLabel htmlFor="birthDate">Date of Birth</EditLabel>
        <DatePicker customFor="birthDate" id="birthDate" defValue={employee.birthDate}>Birthdate</DatePicker>

        <EditLabel htmlFor="phoneNumber">Contact Number</EditLabel>
        <EditInput name="phoneNumber" id="phoneNumber" defValue={employee.phoneNumber}>{employee.phoneNumber}</EditInput>

        <button className="mt-5 p-2 duration-75 bg-gray-600 rounded-lg hover:bg-gray-400 active:bg-gray-700">Complete</button>

        {isError && <AuthError errorState={isError} />}
        {isSuccess && <AuthSuccess isSuccess={isSuccess} />}
      </form>
    </div>
  )
}