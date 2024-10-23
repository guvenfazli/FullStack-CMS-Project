export default function AuthError({ errorState }) {
  return (
    <div className="mt-5 flex justify-center items-center">
      <p className="text-xl text-red-500">{errorState}</p>
    </div>
  )
}