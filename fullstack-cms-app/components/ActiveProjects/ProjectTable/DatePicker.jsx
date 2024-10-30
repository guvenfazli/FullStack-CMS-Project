export default function DatePicker({ customFor, defValue }) {
  return (
    <input type="date" name={customFor} defaultValue={defValue} className="text-gray-800 px-1 py-2 mb-3 rounded-md pl-2" />
  )
}