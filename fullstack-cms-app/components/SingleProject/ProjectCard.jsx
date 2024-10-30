import ProjectInfo from "./ProjectInfo"
import ProjectStatus from "../ActiveProjects/ProjectTable/ProjectStatus"
export default function ProjectCard({ fetchedProject }) {
  return (
    <div className="p-2 rounded-lg bg-slate-900">
      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <ProjectInfo title={'Name:'}>{fetchedProject.projectName}</ProjectInfo>
      </div>

      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <ProjectInfo title={'Deadline:'}>{fetchedProject.deadLine}</ProjectInfo>
      </div>

      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <ProjectInfo title={'Created At:'}>{fetchedProject.createdAt}</ProjectInfo>
      </div>

      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <ProjectInfo title={'Last Update:'}>{fetchedProject.updatedAt}</ProjectInfo>
      </div>

      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <ProjectInfo title={'Employees Assigned:'}>{fetchedProject.employees.length}</ProjectInfo>
      </div>

      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <ProjectInfo title={'Number of Tasks:'}>{fetchedProject.tasks.length}</ProjectInfo>
      </div>

      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <ProjectInfo title={'Project Status:'}><ProjectStatus status={fetchedProject.projectStatus}>{fetchedProject.projectStatus}</ProjectStatus></ProjectInfo>
      </div>

      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <ProjectInfo title={'Project ID:'}>{fetchedProject.id}</ProjectInfo>
      </div>
    </div>
  )
}