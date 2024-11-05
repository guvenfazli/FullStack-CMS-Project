import EditLabel from "../SingleProject/EditTaskDialog/EditLabel"
import EditInput from "../SingleProject/EditTaskDialog/EditInput"
import DatePicker from "../ActiveProjects/ProjectTable/DatePicker"

export default function EditProfile({ employee }) {

  async function editAccount(e) {
    e.preventDefault()

    const fd = new FormData(e.target)
    console.log(fd)
    try {
      const createAccount = await fetch(`http://localhost:8080/employees/${employee.id}`, {
        method: 'PUT',
        body: fd,
        credentials: 'include'
      })

      if (!createAccount.ok) {
        setIsLoading(false)
        const responseData = await createAccount.json()
        throw new Error(responseData.message)
      }

      const responseData = await createAccount.json()

    } catch (err) {
      e.target.reset()
    }
  }




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

      </form>
    </div>
  )
}