import EditLabel from "../SingleProject/EditTaskDialog/EditLabel"
import EditInput from "../SingleProject/EditTaskDialog/EditInput"
import DatePicker from "../ActiveProjects/ProjectTable/DatePicker"

export default function EditProfile({ employee }) {
  return (
    <div className="flex flex-col items-center w-full max-lg:w-full max-sm:w-full">
      <form onSubmit={(e) => createAccount(e)} className="flex flex-col text-xl  w-full bg-gray-900 rounded-lg max-lg:text-base max-sm:text-sm">
        <EditLabel htmlFor="name">Name</EditLabel>
        <EditInput name="name" id="name" defValue={employee.name}>{employee.name}</EditInput>

        <EditLabel htmlFor="surname">Surname</EditLabel>
        <EditInput name="surname" id="surname" defValue={employee.surname}>{employee.surname}</EditInput>

        <EditLabel htmlFor="email">Email</EditLabel>
        <EditInput name="email" id="email" defValue={employee.email}>{employee.email}</EditInput>

        <EditLabel htmlFor="jobTitle">Job Title</EditLabel>
        <EditInput name="jobTitle" id="jobTitle" defValue={employee.jobTitle}>{employee.jobTitle}</EditInput>

        <EditLabel htmlFor="birthdate">Date of Birth</EditLabel>
        <DatePicker customFor="birthdate" id="birthdate" defValue={employee.birthdate}>Birthdate</DatePicker>

        <EditLabel htmlFor="phoneNumber">Contact Number</EditLabel>
        <EditInput name="phoneNumber" id="phoneNumber" defValue={employee.phoneNumber}>{employee.phoneNumber}</EditInput>
      </form>
    </div>
  )
}