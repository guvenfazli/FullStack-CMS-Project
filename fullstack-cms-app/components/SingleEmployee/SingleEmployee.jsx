export default function SingleEmployee({ information, children }) {
  return (
    <div className="py-3 px-1 w-2/3 flex justify-between items-center">
      <p className="text-xl">{information}</p>
      <p className="text-xl">{children}</p>
    </div>
  )
}