import EditForm from "./EditTaskDialog/EditForm"
export default function EditTask({ task, socket }) {
  return (
    <div className="flex flex-col items-center w-full max-lg:w-full max-sm:w-full">
      <EditForm task={task} socket={socket} />
    </div>
  )
}