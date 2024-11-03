import SingleEmployee from "./SingleEmployee"
import ProjectStatus from "../ActiveProjects/ProjectTable/ProjectStatus"

export default function SingleEmployeeCard() {
  return (
    <div className="p-2 mb-10 rounded-lg bg-slate-900">
      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <SingleEmployee title={'Name:'}>{fetchedProject?.projectName}</SingleEmployee>
      </div>

      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <SingleEmployee title={'Deadline:'}>{dateFormatter(fetchedProject?.deadLine)}</SingleEmployee>
      </div>

      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <SingleEmployee title={'Created At:'}>{dateFormatter(fetchedProject?.createdAt)}</SingleEmployee>
      </div>

      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <SingleEmployee title={'Last Update:'}>{dateFormatter(fetchedProject?.updatedAt)}</SingleEmployee>
      </div>

      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <SingleEmployee title={'Number of Tasks:'}>{fetchedProject?.tasks.length}</SingleEmployee>
      </div>

      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <SingleEmployee title={'Project Status:'}><ProjectStatus status={fetchedProject?.projectStatus}>{fetchedProject?.projectStatus}</ProjectStatus></SingleEmployee>
      </div>

      <div className="flex w-full border-b border-b-gray-500 mb-4">
        <SingleEmployee title={'Project ID:'}>{fetchedProject?.id}</SingleEmployee>
      </div>
    </div>
  )
}