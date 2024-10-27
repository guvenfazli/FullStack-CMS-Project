import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { trashCan, eyeIcon, taskIcon } from "@/components/Icons/Icons"
import { useEffect, useState } from "react"

import { filterUp } from "@/components/Icons/Icons"

export default function EmployeeTable({ fetchedEmployees, isLogged, setAllEmployees }) {

  const [filterType, setFilterType] = useState()


  async function filterTable(filter) {
    setFilterType(prev => {
      if (prev === filter) {
        return undefined
      } else {
        return filter
      }
    })
  }

  useEffect(() => { // Filtering the Table, if same column clicked, it resets the table.
    
    async function filterEmployees() {
      if (filterType) {
        const response = await fetch(`http://localhost:8080/employees/filtering?filter=${filterType}`, {
          method: 'GET',
          credentials: 'include'
        })
        const resData = await response.json()
        setAllEmployees(resData.employees)
      } else {
        const response = await fetch('http://localhost:8080/employees', {
          method: 'GET',
          credentials: 'include'
        })
        const resData = await response.json()
        setAllEmployees(resData.employees)
      }
    }

    filterEmployees()
  }, [filterType])



  return (
    <Table>
      <TableCaption>Employee Table</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[100px] hover:cursor-pointer" onClick={() => filterTable('id')}>ID <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'id' && 'rotate-180'}`}>{filterUp}</span></TableHead>
          <TableHead className="w-[100px]">AVATAR</TableHead>
          <TableHead className="hover:cursor-pointer " onClick={() => filterTable('name')}>NAME <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'name' && 'rotate-180'}`}>{filterUp}</span></TableHead>
          <TableHead className="hover:cursor-pointer" onClick={() => filterTable('surname')}>SURNAME <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'surname' && 'rotate-180'}`}>{filterUp}</span></TableHead>
          <TableHead className="hover:cursor-pointer" onClick={() => filterTable('email')}>EMAIL <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'email' && 'rotate-180'}`}>{filterUp}</span></TableHead>
          <TableHead className="hover:cursor-pointer" onClick={() => filterTable('isAdmin')}>ADMIN <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'isAdmin' && 'rotate-180'}`}>{filterUp}</span></TableHead>
          <TableHead className="text-right hover:cursor-pointer" onClick={() => filterTable('job_title')}>TITLE <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'job_title' && 'rotate-180'}`}>{filterUp}</span></TableHead>
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
            <TableCell>{employee.isAdmin ? 'Yes' : 'No'}</TableCell>
            <TableCell className="text-right">{employee.job_title}</TableCell>
            {(isLogged.isAdmin === true && isLogged.userId !== employee.id) ? <TableCell className="text-right w-[10px]"><button>{trashCan}</button></TableCell> : ''}
            <TableCell className="text-right w-[10px]"><button>{eyeIcon}</button></TableCell>
            <TableCell className="text-right w-[10px]"><button>{taskIcon}</button></TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}