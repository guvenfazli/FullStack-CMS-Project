import EmployeeCard from "./EmployeeCard"

export default function Employees({ fetchedEmployees, isErr }) {
  return (
    <div className="flex justify-around items-start max-md:flex-col max-md:gap-5">
      {fetchedEmployees.map((employee) => {
        return (
          <EmployeeCard key={employee.id} employee={employee} />
        )
      })}
    </div>
  )
}