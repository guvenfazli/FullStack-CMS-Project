export default function SingleEmployee({ information, children }) {
  return (
    <div>
      <p className="text-xl max-[425px]:text-sm">{children}</p>
    </div>
  )
}