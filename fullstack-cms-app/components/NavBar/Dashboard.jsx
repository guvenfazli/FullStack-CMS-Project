export default function Dashboard({ isOpen }) {
  return (
    <div className={`flex flex-col justify-start duration-100 items-start overflow-hidden ${isOpen ? "max-h-28" : "max-h-0"}`}>
      <button className="mb-3">Main</button>
      <button className="mb-3">User Insights</button>
    </div>
  )
}

