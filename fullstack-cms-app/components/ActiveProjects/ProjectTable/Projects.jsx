"use client"

import { useAppContext } from "@/context"
import TableNav from "@/components/HomePage/UserTable/tableNav"
import ProjectTable from "./ProjectTable"
import CreateProjectForm from "./CreateProject"
export default function Projects() {

  const { isLogged } = useAppContext()

  return (
    <div>
      <div>
        <p className="text-2xl mb-5">Projects</p>
      </div>

      <TableNav isLogged={isLogged} inputPlaceHolder="Search Projects" buttonText="Create Project" FormComponent={CreateProjectForm} dialogTitle='Create Project' />
      <ProjectTable isLogged={isLogged} />
    </div>
  )
}