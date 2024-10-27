export default function Dashboard({ isOpen }) {
  return (
    <div className={`flex flex-col justify-start duration-100 items-start overflow-hidden ${isOpen ? "max-h-28 mt-5 max-sm:mt-2" : "max-h-0"}`}>
      <button className="mb-3 duration-100 hover:text-gray-500">Main</button>
      <button className="mb-3 duration-100 hover:text-gray-500 text-left">User Insights</button>
    </div>
  )
}

