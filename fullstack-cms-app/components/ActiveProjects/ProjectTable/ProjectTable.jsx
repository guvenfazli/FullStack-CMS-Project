import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { filterUp, trashCan, eyeIcon, taskIcon } from "@/components/Icons/Icons"
import deadLineChecker from "@/utils/deadLineChecker"
import ProjectStatus from "./ProjectStatus"
import CreateTask from "./CreateTask"
import dateFormatter from "@/utils/dateFormatter"
import Link from "next/link"

export default function ProjectTable({ isLogged, fetchedProjects, setFetchedProjects, setFilterType, filterType, socket }) {

  const { toast } = useToast() // Toast hook for feedbacks and notifications

  function filterTable(filter) { // If a filter already set, this returns to a default value.
    setFilterType(prev => {
      if (prev === filter) {
        return 'id'
      } else {
        return filter
      }
    })
  }

  useEffect(() => { // Filtering the Table, if same column clicked, it resets the table.

    async function filterProjects() {
      const response = await fetch(`http://localhost:8080/projects?filterParam=${filterType}`, {
        credentials: 'include'
      })
      const resData = await response.json()
      setFetchedProjects(resData.projects)
    }

    filterProjects()

    socket.on('refreshProjects', (emp) => {
      filterProjects()
    })

  }, [filterType])



  async function changeProjectStatus(status, project) {
    const data = project
    data.projectStatus = status

    try {
      const response = await fetch(`http://localhost:8080/admin/editProject/${project.id}`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(project),
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        const responseData = await response.json()
        throw new Error(responseData.message)
      }

      const responseData = await response.json()
      socket.emit('projectStatusChanged', 'Status Changed')
      toast({
        title: 'Success!',
        description: responseData.message,
      })

    } catch (err) {
      toast({
        title: 'Something went wrong.',
        description: err.message,
        className: "bg-red-500 border-none text-white text-xl"
      })
    }
  }

  async function deleteProject(projectId, empList, projectName) {
    try {
      const response = await fetch(`http://localhost:8080/admin/deleteProject/${projectId}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!response.ok) {
        const responseData = await response.json()
        throw new Error(responseData.message)
      }

      const responseData = await response.json()
      socket.emit('projectDeleted', empList, projectName)
      toast({
        title: 'Success!',
        description: responseData.message,
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
      <TableCaption>Project Table</TableCaption>

      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[100px] hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('id')}>
            ID <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'id' && 'rotate-180'}`}>{filterUp}</span>
          </TableHead>

          <TableHead className="w-[300px] hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('projectName')}>
            TITLE <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'projectName' && 'rotate-180'}`}>{filterUp}</span>
          </TableHead>

          <TableHead className="hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75 w-[200px]" onClick={() => filterTable('createdAt')}>
            CREATED AT <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'createdAt' && 'rotate-180'}`}>{filterUp}</span>
          </TableHead>

          <TableHead className="hover:cursor-pointer w-[200px] whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('deadline')}>
            DEADLINE <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'deadline' && 'rotate-180'}`}>{filterUp}</span>
          </TableHead>

          <TableHead className="hover:cursor-pointer whitespace-nowrap hover:text-gray-300 duration-75 w-[200px]" onClick={() => filterTable('projectStatus')}>
            STATUS <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'projectStatus' && 'rotate-180'}`}>{filterUp}</span>
          </TableHead>

          <TableHead className="hover:cursor-pointer text-center w-[100px] whitespace-nowrap hover:text-gray-300 duration-75" onClick={() => filterTable('isAdmin')}>
            NUMBER OF TASKS <span className={`inline-block duration-75 rotate-0 ml-1 items-center ${filterType === 'isAdmin' && 'rotate-180'}`}>{filterUp}</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {fetchedProjects?.map((project) => {
          return (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.id}</TableCell>
              <TableCell>{project.projectName}</TableCell>
              <TableCell>{dateFormatter(project.createdAt)}</TableCell>
              <TableCell>{deadLineChecker(project.deadline)}</TableCell>

              <TableCell>
                <HoverCard>
                  <HoverCardTrigger><ProjectStatus status={project.projectStatus}>{project.projectStatus}</ProjectStatus></HoverCardTrigger>
                  <HoverCardContent className="flex flex-col justify-start items-start bg-gray-900 border-none gap-2 w-[135px]">
                    <ProjectStatus editTaskStatus={changeProjectStatus} task={project} status='Active'>Active</ProjectStatus>
                    <ProjectStatus editTaskStatus={changeProjectStatus} task={project} status='Pending'>Pending</ProjectStatus>
                    <ProjectStatus editTaskStatus={changeProjectStatus} task={project} status='Completed'>Completed</ProjectStatus>
                    <ProjectStatus editTaskStatus={changeProjectStatus} task={project} status='Cancelled'>Cancelled</ProjectStatus>
                  </HoverCardContent>
                </HoverCard>
              </TableCell>



              <TableCell className="text-center">{project.tasks.length}</TableCell>

              {isLogged?.isAdmin === true &&
                <TableCell className="text-center w-[10px]">
                  <button onClick={() => deleteProject(project.id, project.tasks[0]?.employees, project.projectName)}>{trashCan}</button>
                </TableCell>
              }

              <TableCell className="text-center w-[10px]"><button><Link href={`/projects/${project.id}`}>{eyeIcon}</Link></button></TableCell>

              <TableCell className="text-center w-[10px]">
                <Dialog>
                  <DialogTrigger>{taskIcon}</DialogTrigger>
                  <DialogContent className="bg-gray-900 border-none">
                    <DialogHeader>
                      <DialogTitle>Create Task</DialogTitle>
                    </DialogHeader>
                    <CreateTask projectId={project.id} socket={socket} />
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