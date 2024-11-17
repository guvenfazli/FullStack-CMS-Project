export default function ProjectInfo({ title, children }) {
  return (
    <div className="py-3 px-1 w-full flex justify-between items-center">
      <p className="text-xl max-sm:text-sm">{title}</p>
      <p className="text-xl max-sm:text-sm">{children}</p>
    </div>
  )
}