export default function AuthLabel({ customFor, children }) {
  return (
    <label htmlFor={customFor} className="mb-3">{children}</label>

  )
}