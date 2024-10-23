export default function AuthSuccess({ isSuccess }) {
  return (
    <div className="mt-5 flex justify-center items-center">
      <p className="text-xl text-green-500">{isSuccess}</p>
    </div>
  )

}