export default function ProjectInfo({ title, children }) {
  return (
    <div className="py-3 px-1 w-2/3 flex justify-between items-center">
      <p className="text-xl">{title}</p>
      <p className="text-xl">{children}</p>
    </div>
  )
}