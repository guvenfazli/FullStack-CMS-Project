import ProjectInfo from "./ProjectInfo"
import UserTaskStatus from "../HomePage/UserTable/UserTaskStatus"
import RecentActivities from "./RecentActivities"
import EmployeesWorking from "./EmployeesWorking"
import dateFormatter from "@/utils/dateFormatter"

export default function ProjectCard({ fetchedProject, assignedEmployees, projectActivities }) {

  return (
    <div className="flex flex-row justify-between gap-5 mb-10 ">
      <div className="p-2 rounded-lg bg-slate-900 w-1/2 border self-start">
        <div className="flex w-full border-b border-b-yellow-600 mb-4">
          <ProjectInfo title={'Name:'}>{fetchedProject?.projectName}</ProjectInfo>
        </div>

        <div className="flex w-full border-b border-b-yellow-600 mb-4">
          <ProjectInfo title={'Deadline:'}>{dateFormatter(fetchedProject?.deadline)}</ProjectInfo>
        </div>

        <div className="flex w-full border-b border-b-yellow-600 mb-4">
          <ProjectInfo title={'Created At:'}>{dateFormatter(fetchedProject?.createdAt)}</ProjectInfo>
        </div>

        <div className="flex w-full border-b border-b-yellow-600 mb-4">
          <ProjectInfo title={'Last Update:'}>{dateFormatter(fetchedProject?.updatedAt)}</ProjectInfo>
        </div>

        <div className="flex w-full border-b border-b-yellow-600 mb-4">
          <ProjectInfo title={'Number of Tasks:'}>{fetchedProject?.tasks.length}</ProjectInfo>
        </div>

        <div className="flex w-full border-b border-b-yellow-600 mb-4">
          <ProjectInfo title={'Project Status:'}><UserTaskStatus status={fetchedProject?.projectStatus}>{fetchedProject?.projectStatus}</UserTaskStatus></ProjectInfo>
        </div>

        <div className="flex w-full border-b border-b-yellow-600">
          <ProjectInfo title={'Project ID:'}>{fetchedProject?.id}</ProjectInfo>
        </div>
      </div>

      <div className="p-2 rounded-lg bg-slate-900 w-1/2">
        <RecentActivities projectActivities={projectActivities} />
        <EmployeesWorking assignedEmployees={assignedEmployees} />
      </div>
    </div>
  )
}