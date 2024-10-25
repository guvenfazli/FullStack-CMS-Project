export default function Resources({ isOpen }) {
  return (
    <div className={`flex flex-col justify-start duration-100 items-start overflow-hidden ${isOpen ? "max-h-56 " : "max-h-0"}`}>
      <button className="mb-3">Users</button>
      <button className="mb-3">Admins</button>
      <button className="mb-3">Active Projects</button>
      <button className="mb-3">Completed Projects</button>
    </div>
  )
}

