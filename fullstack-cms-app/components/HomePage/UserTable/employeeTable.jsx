import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function EmployeeTable() {
  return (
    <Table>
      <TableCaption>Employee Table</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead className="w-[100px]">AVATAR</TableHead>
          <TableHead>NAME</TableHead>
          <TableHead>EMAIL</TableHead>
          <TableHead>ADMIN</TableHead>
          <TableHead className="text-right">TITLE</TableHead>


        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell>$250.00</TableCell>
          <TableCell>Yes</TableCell>
          <TableCell className="text-right">Full-Stack Dev.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}