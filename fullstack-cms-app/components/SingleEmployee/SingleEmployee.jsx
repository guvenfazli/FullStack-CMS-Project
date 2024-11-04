export default function SingleEmployee({ information, children }) {
  return (
    <div className="py-3 px-1 w-full flex justify-between items-center">
      <p className="text-xl max-[425px]:text-sm">{information}</p>
      <p className="text-xl max-[425px]:text-sm">{children}</p>
    </div>
  )
}