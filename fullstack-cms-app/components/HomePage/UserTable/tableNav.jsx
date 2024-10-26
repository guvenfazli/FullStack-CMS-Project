export default function TableNav() {
  return (
    <div className="flex flex-row w-full justify-between items-center mb-7">
      <input name="searchEmployee" id="searchEmployee" placeholder="Search Employees" className="px-4 py-1 bg-gray-700 text-white w-96 rounded-2xl  max-[470px]:w-64 max-[350px]:w-48"></input>

      <button className="p-2 bg-sky-500 duration-75 text-gray-800 font-bold rounded-lg hover:bg-sky-300 active:bg-sky-700">Create Employee</button>
    </div >
  )
}