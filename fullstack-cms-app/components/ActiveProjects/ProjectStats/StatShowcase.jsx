import CompletedProjects from "./Stats/CompletedProjects"
import TotalProjects from "./Stats/TotalProjects"
import TaskStatus from "./Stats/TaskStatus"
export default function StatShowcase() {
  return (
    <div className="flex justify-around">
      <TotalProjects />
      <CompletedProjects />
      <TaskStatus />
    </div>
  )
}