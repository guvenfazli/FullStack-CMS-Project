export default function Dashboard({ isOpen }) {
  return (
    <div className={`flex flex-col justify-start duration-75 items-start overflow-hidden ${isOpen ? "h-24" : "h-0"}`}>
      <button className="mb-3">Main</button>
      <button className="mb-3">User Insights</button>
    </div>
  )
}

