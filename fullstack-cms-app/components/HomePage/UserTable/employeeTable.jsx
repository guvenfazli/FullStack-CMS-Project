import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function EmployeeTable({ fetchedEmployees }) {

  return (
    <Table>
      <TableCaption>Employee Table</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead className="w-[100px]">AVATAR</TableHead>
          <TableHead>NAME</TableHead>
          <TableHead>SURNAME</TableHead>
          <TableHead>EMAIL</TableHead>
          <TableHead>ADMIN</TableHead>
          <TableHead className="text-right">TITLE</TableHead>


        </TableRow>
      </TableHeader>
      <TableBody>
        {fetchedEmployees && fetchedEmployees.map((employee) =>
          <TableRow key={employee.id}>
            <TableCell className="font-medium">{employee.id}</TableCell>
            <TableCell>Soon</TableCell>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.surname}</TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell>Yes</TableCell>
            <TableCell className="text-right">{employee.job_title}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}