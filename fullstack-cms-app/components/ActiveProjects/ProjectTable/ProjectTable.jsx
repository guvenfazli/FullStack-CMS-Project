import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { filterUp, trashCan, eyeIcon, taskIcon } from "@/components/Icons/Icons"

import { useEffect, useState } from "react"
import Link from "next/link"


export default function ProjectTable({ isLogged }) {

  const [filterType, setFilterType] = useState()


  return (
    <Table>
      <TableCaption>Employee Table</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[100px] hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('id')}>ID <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'id' && 'rotate-180'}`}>{filterUp}</span></TableHead>

          <TableHead className="w-[300px]">TITLE</TableHead>

          <TableHead className="hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75 w-[200px]" onClick={() => filterTable('name')}>CREATED AT <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'name' && 'rotate-180'}`}>{filterUp}</span></TableHead>
          <TableHead className="hover:cursor-pointer w-[200px] whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('surname')}>DEADLINE <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'surname' && 'rotate-180'}`}>{filterUp}</span></TableHead>

          <TableHead className="hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75 w-[200px]" onClick={() => filterTable('email')}>STATUS <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'email' && 'rotate-180'}`}>{filterUp}</span></TableHead>

          <TableHead className="hover:cursor-pointer text-center w-[100px] whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('isAdmin')}>NUMBER OF EMPLOYEES <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'isAdmin' && 'rotate-180'}`}>{filterUp}</span></TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>

        <TableRow>
          <TableCell className="font-medium">Project Id</TableCell>
          <TableCell>Project Title</TableCell>
          <TableCell>Project Status</TableCell>
          <TableCell>Number of Emp</TableCell>
          <TableCell>Time Remaining</TableCell>
          <TableCell className="text-center">8</TableCell>
          {isLogged?.isAdmin === true && <TableCell className="text-center w-[10px]"><button>{trashCan}</button></TableCell>}
          <TableCell className="text-center w-[10px]"><Link href={`/projects/projectId`}>{eyeIcon}</Link></TableCell>
          <TableCell className="text-center w-[10px]"><button>{taskIcon}</button></TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-medium">Project Id</TableCell>
          <TableCell>Project Title</TableCell>
          <TableCell>Project Status</TableCell>
          <TableCell>Number of Emp</TableCell>
          <TableCell>Time Remaining</TableCell>
          <TableCell className="text-center">8</TableCell>
          {isLogged?.isAdmin === true && <TableCell className="text-center w-[10px]"><button>{trashCan}</button></TableCell>}
          <TableCell className="text-center w-[10px]"><Link href={`/projects/projectId`}>{eyeIcon}</Link></TableCell>
          <TableCell className="text-center w-[10px]"><button>{taskIcon}</button></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}