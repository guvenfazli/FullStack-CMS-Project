export default function AuthInput({ customPlace, customName, setErrorState, isError, inputType, setFileState }) {

  return (
    <input type={inputType} id={customName} onChange={() => setErrorState(false)} placeholder={customPlace} name={customName} 
    className={`text-gray-800 px-1 py-2 mb-3 rounded-md pl-2 ${isError && "border-2 border-red-500 duration-100"}`}></input>
  )
}