export default function ProjectStatus({ status, editTaskStatus, children }) {
  if (status === 'Active') {
    return (
      <button onClick={() => editTaskStatus('Active')} className="py-1 px-4 bg-blue-400 rounded-lg text-blue-800 font-bold">{children}</button>
    )
  } else if (status === 'Pending') {
    return (
      <button onClick={() => editTaskStatus('Pending')} className="py-1 px-4 bg-yellow-400 rounded-lg text-yellow-800 font-bold">{children}</button>
    )
  } else if (status === 'Completed') {
    return (
      <button onClick={() => editTaskStatus('Completed')} className="py-1 px-4 bg-green-400 rounded-lg text-green-800 font-bold">{children}</button>
    )
  } else if (status === 'Cancelled') {
    return (
      <button onClick={() => editTaskStatus('Cancelled')} className="py-1 px-4 bg-red-400 rounded-lg text-red-800 font-bold">{children}</button>
    )
  }
}