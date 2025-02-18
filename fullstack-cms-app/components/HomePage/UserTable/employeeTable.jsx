import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { trashCan, eyeIcon, taskIcon, isAdminTrue, isAdminFalse, filterUp } from "@/components/Icons/Icons"
import UsersTasks from "./UsersTasks"
import Link from "next/link"


export default function EmployeeTable({ fetchedEmployees, isLogged, setAllEmployees, socket }) {

  const [filterType, setFilterType] = useState('id')
  const { toast } = useToast()

  function filterTable(filter) {
    setFilterType(prev => {
      if (prev === filter) {
        return 'id'
      } else {
        return filter
      }
    })
  }

  useEffect(() => { // Filtering the Table, if same column clicked, it sets the default filter value for the table.

    async function filterEmployees() {
      const response = await fetch(`http://localhost:8080/employees?filter=${filterType}`, {
        credentials: 'include'
      })
      const resData = await response.json()
      setAllEmployees(resData.employees)
    }

    filterEmployees()
  }, [filterType])

  async function deleteEmployee(employeeId) {
    try {
      const response = await fetch(`http://localhost:8080/admin/deleteEmployee/${employeeId}${filterType && `?filter=${filterType}`}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData.message)
        throw error
      }

      const resData = await response.json()
      socket.emit('employeeDeleted', 'Employee Deleted')
      toast({
        title: 'Employee deleted.',
        description: resData.message,
      })

    } catch (err) {
      toast({
        title: 'Something went wrong.',
        description: err.message,
        className: "bg-red-500 border-none text-white text-xl"

      })
    }

  }



  return (
    <Table>
      <TableCaption>Employee Table</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[100px] hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('id')}>ID <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'id' && 'rotate-180'}`}>{filterUp}</span></TableHead>
          <TableHead className="w-[100px]">AVATAR</TableHead>
          <TableHead className="hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('name')}>NAME <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'name' && 'rotate-180'}`}>{filterUp}</span></TableHead>
          <TableHead className="hover:cursor-pointer w-[150px] whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('surname')}>SURNAME <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'surname' && 'rotate-180'}`}>{filterUp}</span></TableHead>
          <TableHead className="hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('email')}>EMAIL <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'email' && 'rotate-180'}`}>{filterUp}</span></TableHead>
          <TableHead className="hover:cursor-pointer text-center w-[100px] whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('isAdmin')}>ADMIN <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'isAdmin' && 'rotate-180'}`}>{filterUp}</span></TableHead>
          <TableHead className="text-right hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('jobTitle')}>TITLE <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'jobTitle' && 'rotate-180'}`}>{filterUp}</span></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fetchedEmployees && fetchedEmployees.map((employee) =>
          <TableRow key={employee.id}>
            <TableCell className="font-medium">{employee.id}</TableCell>
            <TableCell>
              <Avatar>
                <AvatarImage src={`http://localhost:8080/${employee.profilePic}`} />
                <AvatarFallback>PP</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.surname}</TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell className="text-center">{employee.isAdmin ? <button>{isAdminTrue}</button> : <button>{isAdminFalse}</button>}</TableCell>
            <TableCell className="text-right">{employee.jobTitle}</TableCell>

            {(isLogged.isAdmin === true && isLogged.userId !== employee.id) ? <TableCell className="text-right w-[10px]"><button onClick={() => deleteEmployee(employee.id)}>{trashCan}</button></TableCell> : ''}

            <TableCell className="text-right w-[10px]"><button><Link prefetch={false} href={`/employees/${employee.id}`}>{eyeIcon}</Link></button></TableCell>

            <TableCell className="text-right w-[10px]">
              <Dialog>
                <DialogTrigger>
                  {taskIcon}
                </DialogTrigger>

                <DialogContent className="bg-gray-900 border-none max-h-[550px] overflow-scroll overflow-x-hidden">
                  <DialogHeader>
                    <DialogTitle>Employees Tasks</DialogTitle>
                  </DialogHeader>
                  <UsersTasks tasks={employee.tasks} />
                </DialogContent>
                <DialogDescription />
              </Dialog>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}