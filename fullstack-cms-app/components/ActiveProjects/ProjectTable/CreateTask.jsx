import CreateProjectForm from "./CreateProject"

export default function CreateTask({ projectId, socket }) {

  return (
    <CreateProjectForm projectId={projectId} socket={socket} />
  )
}