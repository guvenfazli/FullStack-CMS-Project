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

import { trashCan, editIcon, profileIcon } from "@/components/Icons/Icons"
import { useToast } from "@/hooks/use-toast"
import ProjectStatus from "../ActiveProjects/ProjectTable/ProjectStatus"
import EditTask from "./EditTask"
import AssignEmployees from "../AssignEmployees/AssignEmployees"
import dateFormatter from "@/utils/dateFormatter"
import { useEffect, useState } from "react"


export default function TaskTable({ isLogged, socket, projectId, fetchedTasks }) {

  const { toast } = useToast()
  const [tasks, setTasks] = useState([])
  const [filterType, setFilterType] = useState('id')

  function filterTable(filter) {
    setFilterType(prev => {
      if (prev === filter) {
        return 'id'
      } else {
        return filter
      }
    })
  }

  useEffect(() => {
    async function fetchProjectTasks() {
      try {
        const response = await fetch(`http://localhost:8080/tasks/${projectId}?filter=${filterType}`, {
          credentials: 'include'
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()

        setTasks(resData.tasks)
      } catch (err) {
        console.log(err.message)
      }
    }

    fetchProjectTasks()

    socket.on('refreshTasks', (emp) => {
      fetchProjectTasks()
    })

  }, [filterType])

  useEffect(() => {
    if (fetchedTasks) {
      setTasks(fetchedTasks)
    }
  }, [fetchedTasks])


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
      socket.emit('taskStatusChanged', `${projectId}`)
      toast({
        title: 'Success!',
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


  async function deleteTask(taskId, empList, projectId, taskName) {
    try {
      const response = await fetch(`http://localhost:8080/admin/deleteTask/${taskId}/${projectId}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData.message)
        throw error
      }
      const resData = await response.json()
      socket.emit('taskDeleted', `${projectId}`, empList, taskName)
      toast({
        title: 'Success!',
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

  console.log(tasks)

  return (
    <Table>
      <TableCaption>Task Table</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead onClick={() => filterTable('id')} className="w-[100px] hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75">
            ID
          </TableHead>

          <TableHead onClick={() => filterTable('taskName')} className="hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75">
            TASK TITLE
          </TableHead>

          <TableHead onClick={() => filterTable('createdAt')} className="hover:cursor-pointer w-[150px] whitespace-nowrap hover:text-gray-300 duration-75">
            CREATED AT
          </TableHead>

          <TableHead onClick={() => filterTable('taskDeadline')} className="hover:cursor-pointer w-[150px] whitespace-nowrap hover:text-gray-300 duration-75" >
            DEADLINE
          </TableHead>

          <TableHead onClick={() => filterTable('updatedAt')} className="hover:cursor-pointer text-center w-[100px] whitespace-nowrap hover:text-gray-300 duration-75">
            LAST UPDATE
          </TableHead>

          <TableHead className="hover:cursor-pointer w-[300px] text-center whitespace-nowrap hover:text-gray-300 duration-75">
            EMPLOYEES ASSIGNED
          </TableHead>


          <TableHead onClick={() => filterTable('taskStatus')} className="text-center hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75">
            TASK STATUS
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {tasks && tasks.map((task) =>

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

            {isLogged.isAdmin && <TableCell className="text-right w-[10px]"><button onClick={() => deleteTask(task.id, task.employees, projectId, task.taskName)}>{trashCan}</button></TableCell>}

            {isLogged.isAdmin &&
              <TableCell className="text-right w-[10px]">

                <Dialog>
                  <DialogTrigger>{profileIcon}</DialogTrigger>
                  <DialogContent className="bg-gray-900 border-none">
                    <DialogHeader>
                      <DialogTitle>Assigned Employees</DialogTitle>
                    </DialogHeader>
                    <AssignEmployees task={task} isLogged={isLogged} socket={socket} projectId={projectId} />
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
                    <EditTask task={task} socket={socket} projectId={projectId} />
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