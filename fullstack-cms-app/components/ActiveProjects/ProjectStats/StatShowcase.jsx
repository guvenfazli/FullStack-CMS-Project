import CompletedProjects from "./Stats/CompletedProjects"
import TotalProjects from "./Stats/TotalProjects"
import TaskStatus from "./Stats/TaskStatus"
export default function StatShowcase() {
  return (
    <div className="flex justify-around mb-10">
      <TotalProjects />
      <CompletedProjects />
      <TaskStatus />
    </div>
  )
}