export default function UserTaskStatus({ status, children }) {
  if (status === 'Active') {
    return (
      <button className={`py-1 px-4 duration-75 bg-blue-400 rounded-lg text-blue-800 font-bold hover:bg-blue-200`}>{children}</button>
    )
  } else if (status === 'Pending') {
    return (
      <button className="py-1 px-4 duration-75 bg-yellow-400 rounded-lg text-yellow-800 font-bold hover:bg-yellow-200">{children}</button>
    )
  } else if (status === 'Completed') {
    return (
      <button className="py-1 px-4 duration-75 bg-green-400 rounded-lg text-green-800 font-bold hover:bg-green-200">{children}</button>
    )
  } else if (status === 'Cancelled') {
    return (
      <button className="py-1 px-4 duration-75 bg-red-400 rounded-lg text-red-800 font-bold hover:bg-red-200">{children}</button>
    )
  }
}