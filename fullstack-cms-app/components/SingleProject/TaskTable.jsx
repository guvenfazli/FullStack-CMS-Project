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

import { trashCan, filterUp, editIcon, profileIcon } from "@/components/Icons/Icons"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import ProjectStatus from "../ActiveProjects/ProjectTable/ProjectStatus"
import EditTask from "./EditTask"
import AssignEmployees from "../AssignEmployees/AssignEmployees"
import dateFormatter from "@/utils/dateFormatter"


export default function TaskTable({ fetchedTasks, isLogged, socket }) {

  const [filterType, setFilterType] = useState()
  const { toast } = useToast()

  async function editTaskStatus(status, task) {
    const data = task
    data.taskStatus = status

    try {
      const response = await fetch(`http://localhost:8080/tasks/${task.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }

      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData.message)
        throw error
      }
      const resData = await response.json()
      socket.emit('taskStatusChanged', `${2}`)
      toast({
        title: 'Success!',
        description: resData.message,
      })
    } catch (err) {
      toast({
        title: 'Something went wrong.',
        description: err.message,
      })
    }


  }

  async function deleteTask(taskId) {
    try {
      const response = await fetch(`http://localhost:8080/admin/deleteTask/${taskId}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData.message)
        throw error
      }
      const resData = await response.json()
      socket.emit('taskDeleted', 'Task Successfully Deleted!')
      toast({
        title: 'Success!',
        description: resData.message,
      })
    } catch (err) {
      toast({
        title: 'Something went wrong.',
        description: err.message,
      })
    }
  }

  return (
    <Table>
      <TableCaption>Employee Table</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[100px] hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('id')}>
            ID <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'id' && 'rotate-180'}`}>{filterUp}</span>
          </TableHead>

          <TableHead className="hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('name')}>
            TASK TITLE <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'name' && 'rotate-180'}`}>{filterUp}</span>
          </TableHead>

          <TableHead className="hover:cursor-pointer w-[150px] whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('surname')}>
            CREATED AT <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'surname' && 'rotate-180'}`}>{filterUp}</span>
          </TableHead>

          <TableHead className="hover:cursor-pointer w-[150px] whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('email')}>
            DEADLINE <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'email' && 'rotate-180'}`}>{filterUp}</span>
          </TableHead>

          <TableHead className="hover:cursor-pointer text-center w-[100px] whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('isAdmin')}>
            LAST UPDATE <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'isAdmin' && 'rotate-180'}`}>{filterUp}</span>
          </TableHead>

          <TableHead className="hover:cursor-pointer w-[300px] text-center whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('isAdmin')}>
            EMPLOYEES ASSIGNED <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'isAdmin' && 'rotate-180'}`}>{filterUp}</span>
          </TableHead>


          <TableHead className="text-center hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('job_title')}>
            TASK STATUS <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'job_title' && 'rotate-180'}`}>{filterUp}</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fetchedTasks && fetchedTasks.map((task) =>
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.id}</TableCell>
            <TableCell>{task.taskName}</TableCell>
            <TableCell>{dateFormatter(task.createdAt)}</TableCell>
            <TableCell>{dateFormatter(task.taskDeadline)}</TableCell>
            <TableCell className="text-center">{dateFormatter(task.updatedAt)}</TableCell>
            <TableCell className="text-center">{task.employees.length}</TableCell>

            <TableCell className="text-center">
              <HoverCard>
                <HoverCardTrigger><ProjectStatus status={task.taskStatus}>{task.taskStatus}</ProjectStatus></HoverCardTrigger>
                <HoverCardContent className="flex flex-col justify-start items-start bg-gray-900 border-none gap-2 w-[135px]">
                  <ProjectStatus editTaskStatus={editTaskStatus} task={task} status='Active'>Active</ProjectStatus>
                  <ProjectStatus editTaskStatus={editTaskStatus} task={task} status='Pending'>Pending</ProjectStatus>
                  <ProjectStatus editTaskStatus={editTaskStatus} task={task} status='Completed'>Completed</ProjectStatus>
                  <ProjectStatus editTaskStatus={editTaskStatus} task={task} status='Cancelled'>Cancelled</ProjectStatus>
                </HoverCardContent>
              </HoverCard>
            </TableCell>

            {isLogged.isAdmin && <TableCell className="text-right w-[10px]"><button onClick={() => deleteTask(task.id)}>{trashCan}</button></TableCell>}

            {isLogged.isAdmin &&
              <TableCell className="text-right w-[10px]">

                <Dialog>
                  <DialogTrigger>{profileIcon}</DialogTrigger>
                  <DialogContent className="bg-gray-900 border-none">
                    <DialogHeader>
                      <DialogTitle>Assigned Employees</DialogTitle>
                    </DialogHeader>
                    <AssignEmployees task={task} isLogged={isLogged} />
                  </DialogContent>
                </Dialog>

              </TableCell>
            }


            {isLogged.isAdmin &&
              <TableCell className="text-right w-[10px]">

                <Dialog>
                  <DialogTrigger>{editIcon}</DialogTrigger>
                  <DialogContent className="bg-gray-900 border-none">
                    <DialogHeader>
                      <DialogTitle>Edit Task</DialogTitle>
                    </DialogHeader>
                    <EditTask task={task} socket={socket} />
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