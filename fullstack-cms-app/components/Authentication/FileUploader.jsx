export default function FileUploader({ customPlace, customName, isError, inputType, setFileState }) {

  return (
    <input type={inputType} id={customName} onChange={(e) => setFileState(e)} placeholder={customPlace} name={customName}
      className={` text-gray-300 px-1 py-2 mb-3 rounded-md pl-2 file:bg-gray-500 file:border-none file:p-2 file:rounded-lg file:hover:bg-gray-300 file:duration-75 file:text-base file:cursor-pointer ${isError && "border-2 border-red-500 duration-100"}`}>
    </input>
  )
}