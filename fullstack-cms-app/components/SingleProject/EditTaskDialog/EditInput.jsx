export default function EditInput({ name, id, defValue, children }) {
  return (
    <input name={name} id={id} defaultValue={defValue} placeholder={children} className="text-gray-800 px-1 py-2 mb-3 rounded-md pl-2"></input>
  )
}