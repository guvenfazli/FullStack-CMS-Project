import PieChart from "./PieChart"

export default function TaskStatus({projectStats}) {

  return (
    <PieChart projectStats={projectStats} />
  )
}