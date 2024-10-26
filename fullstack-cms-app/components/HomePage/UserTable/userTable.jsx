import TableNav from "./tableNav"
import EmployeeTable from "./employeeTable"

export default function UserTable() {




  
  return (
    <div>
      <div>
        <p className="text-2xl mb-5">Users</p>
      </div>

      <TableNav />
      <EmployeeTable />
    </div>
  )
}