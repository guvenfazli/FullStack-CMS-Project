export default function EditLabel({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="mb-3">{children}</label>
  )
}