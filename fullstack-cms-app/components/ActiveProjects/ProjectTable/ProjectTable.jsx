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

import { filterUp, trashCan, eyeIcon, taskIcon } from "@/components/Icons/Icons"
import ProjectStatus from "./ProjectStatus"
import CreateTask from "./CreateTask"
import { useEffect, useState } from "react"
import Link from "next/link"


export default function ProjectTable({ isLogged, fetchedProjects, }) {

  const [filterType, setFilterType] = useState()

  function fixDate(date) { // Fixing the date.
    const fixedDate = new Date(date)
    const formatedDate = fixedDate.toLocaleDateString()
    const replacedDate = formatedDate.replaceAll('.', '-')
    return replacedDate
  }

  async function deleteProject(projectId) {
    const response = await fetch(`http://localhost:8080/admin/deleteProject/${projectId}`, {
      method: 'DELETE',
      credentials: 'include'
    })
  }


  return (
    <Table>
      <TableCaption>Project Table</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[100px] hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('id')}>ID <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'id' && 'rotate-180'}`}>{filterUp}</span></TableHead>

          <TableHead className="w-[300px]">TITLE</TableHead>

          <TableHead className="hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75 w-[200px]" onClick={() => filterTable('name')}>CREATED AT <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'name' && 'rotate-180'}`}>{filterUp}</span></TableHead>
          <TableHead className="hover:cursor-pointer w-[200px] whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('surname')}>DEADLINE <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'surname' && 'rotate-180'}`}>{filterUp}</span></TableHead>

          <TableHead className="hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75 w-[200px]" onClick={() => filterTable('email')}>STATUS <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'email' && 'rotate-180'}`}>{filterUp}</span></TableHead>

          <TableHead className="hover:cursor-pointer text-center w-[100px] whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('isAdmin')}>NUMBER OF TASKS <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'isAdmin' && 'rotate-180'}`}>{filterUp}</span></TableHead>

        </TableRow>
      </TableHeader>

      <TableBody>
        {fetchedProjects?.map((project) => {
          return (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.id}</TableCell>
              <TableCell>{project.projectName}</TableCell>
              <TableCell>{fixDate(project.createdAt)}</TableCell>
              <TableCell>{fixDate(project.deadLine)}</TableCell>
              <TableCell><ProjectStatus status={project.projectStatus}>{project.projectStatus}</ProjectStatus></TableCell>
              <TableCell className="text-center">{project.tasks.length}</TableCell>
              {isLogged?.isAdmin === true && <TableCell className="text-center w-[10px]"><button onClick={() => deleteProject(project.id)}>{trashCan}</button></TableCell>}
              <TableCell className="text-center w-[10px]"><button><Link href={`/projects/${project.id}`}>{eyeIcon}</Link></button></TableCell>
              <TableCell className="text-center w-[10px]">

                <Dialog>
                  <DialogTrigger>{taskIcon}</DialogTrigger>
                  <DialogContent className="bg-gray-900 border-none">
                    <DialogHeader>
                      <DialogTitle>Create Task</DialogTitle>
                    </DialogHeader>
                    <CreateTask projectId={project.id} />
                  </DialogContent>
                </Dialog>

              </TableCell>

            </TableRow>
          )
        })}

      </TableBody>
    </Table >
  )
}