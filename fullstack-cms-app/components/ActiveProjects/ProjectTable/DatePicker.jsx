export default function DatePicker({ customFor, defaultValue }) {
  return (
    <input type="date" name={customFor} defaultValue={defaultValue} className="text-gray-800 px-1 py-2 mb-3 rounded-md pl-2" />
  )
}