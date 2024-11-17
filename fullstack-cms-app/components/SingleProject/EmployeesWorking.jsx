import Employee from "./Employee"

export default function EmployeesWorking({ assignedEmployees }) {
  
  return (
    <div className="flex p-2 flex-col gap-2 h-1/2">
      <div className="w-full py-2 border-t border-b border-yellow-600 flex justify-center items-center">
        <p className="text-xl max-md:text-sm">Employees Assigned To This Project</p>
      </div>

      {assignedEmployees?.length === 0 &&
        <div className="flex justify-center items-center">
          <p>No employees assigned.</p>
        </div>
      }

      <div className="flex flex-col justify-start gap-2 flex-wrap items-start overflow-scroll overflow-x-hidden">
        {assignedEmployees?.map((emp) => {
          return (
            <Employee key={emp.id} emp={emp} />
          )
        })}
      </div>
    </div>
  )
}