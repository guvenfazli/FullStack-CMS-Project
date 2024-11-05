import ProjectInfo from "./ProjectInfo"
import UserTaskStatus from "../HomePage/UserTable/UserTaskStatus"
import dateFormatter from "@/utils/dateFormatter"

export default function ProjectCard({ fetchedProject }) {

  return (
    <div className="p-2 mb-10 rounded-lg bg-slate-900">
      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <ProjectInfo title={'Name:'}>{fetchedProject?.projectName}</ProjectInfo>
      </div>

      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <ProjectInfo title={'Deadline:'}>{dateFormatter(fetchedProject?.deadline)}</ProjectInfo>
      </div>

      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <ProjectInfo title={'Created At:'}>{dateFormatter(fetchedProject?.createdAt)}</ProjectInfo>
      </div>

      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <ProjectInfo title={'Last Update:'}>{dateFormatter(fetchedProject?.updatedAt)}</ProjectInfo>
      </div>

      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <ProjectInfo title={'Number of Tasks:'}>{fetchedProject?.tasks.length}</ProjectInfo>
      </div>

      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <ProjectInfo title={'Project Status:'}><UserTaskStatus status={fetchedProject?.projectStatus}>{fetchedProject?.projectStatus}</UserTaskStatus></ProjectInfo>
      </div>

      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <ProjectInfo title={'Project ID:'}>{fetchedProject?.id}</ProjectInfo>
      </div>
    </div>
  )
}