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

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { trashCan, filterUp, editIcon } from "@/components/Icons/Icons"
import { useEffect, useState } from "react"
import ProjectStatus from "../ActiveProjects/ProjectTable/ProjectStatus"
import EditTask from "./EditTask"
import dateFormatter from "@/utils/dateFormatter"


export default function TaskTable({ fetchedTasks, isLogged }) {

  const [filterType, setFilterType] = useState()

  function editTaskStatus(status) {
    console.log(status)
  }

  return (
    <Table>
      <TableCaption>Employee Table</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[100px] hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('id')}>ID <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'id' && 'rotate-180'}`}>{filterUp}</span></TableHead>

          <TableHead className="hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('name')}>TASK TITLE <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'name' && 'rotate-180'}`}>{filterUp}</span></TableHead>

          <TableHead className="hover:cursor-pointer w-[150px] whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('surname')}>CREATED AT <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'surname' && 'rotate-180'}`}>{filterUp}</span></TableHead>

          <TableHead className="hover:cursor-pointer w-[150px] whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('email')}>DEADLINE <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'email' && 'rotate-180'}`}>{filterUp}</span></TableHead>

          <TableHead className="hover:cursor-pointer text-center w-[100px] whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('isAdmin')}>LAST UPDATE <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'isAdmin' && 'rotate-180'}`}>{filterUp}</span></TableHead>

          <TableHead className="text-right hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('job_title')}>TASK STATUS <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'job_title' && 'rotate-180'}`}>{filterUp}</span></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fetchedTasks && fetchedTasks.map((task) =>
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.id}</TableCell>
            <TableCell>{task.taskName}</TableCell>
            <TableCell>{dateFormatter(task.createdAt)}</TableCell>
            <TableCell>{dateFormatter(task.taskDeadline)}</TableCell>
            <TableCell className="text-right">{dateFormatter(task.updatedAt)}</TableCell>
            <TableCell className="text-right">
              <HoverCard>
                <HoverCardTrigger><ProjectStatus status={task.taskStatus}>{task.taskStatus}</ProjectStatus></HoverCardTrigger>
                <HoverCardContent className="flex flex-col justify-start items-start bg-gray-900 border-none gap-2 w-[135px]">
                  <ProjectStatus editTaskStatus={editTaskStatus} status='Active'>Active</ProjectStatus>
                  <ProjectStatus editTaskStatus={editTaskStatus} status='Pending'>Pending</ProjectStatus>
                  <ProjectStatus editTaskStatus={editTaskStatus} status='Completed'>Completed</ProjectStatus>
                  <ProjectStatus editTaskStatus={editTaskStatus} status='Cancelled'>Cancelled</ProjectStatus>
                </HoverCardContent>
              </HoverCard>



            </TableCell>
            {isLogged.isAdmin === true && <TableCell className="text-right w-[10px]"><button>{trashCan}</button></TableCell>}

            {isLogged.isAdmin === true &&
              <TableCell className="text-right w-[10px]">

                <Dialog>
                  <DialogTrigger>{editIcon}</DialogTrigger>
                  <DialogContent className="bg-gray-900 border-none">
                    <DialogHeader>
                      <DialogTitle>Edit Task</DialogTitle>
                    </DialogHeader>
                    <EditTask task={task} />
                  </DialogContent>
                </Dialog>

              </TableCell>
            }
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}