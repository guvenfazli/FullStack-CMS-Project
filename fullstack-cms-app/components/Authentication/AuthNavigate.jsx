import Link from "next/link"

export default function AuthNavigate({ authType, navHref, isLoading, newUserCreation }) {
  return (
    <div className={`flex text-xl w-full items-center justify-between max-xl:flex-col max-xl:text-center max-lg:text-base max-lg:flex-col max-lg:text-center max-sm:text-sm large-screen:flex-col ${newUserCreation && 'flex-col'}`}>

      {newUserCreation ?
        <button className="font-bold border border-gray-800 px-5 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-500 duration-150 max-xl:mb-5 max-lg:mb-5" >
          {isLoading ? 'Logging..' : 'Create Employee'}
        </button>
        :
        <button className="font-bold border border-gray-800 px-5 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-500 duration-150 max-xl:mb-5 max-lg:mb-5" >
          {isLoading ? 'Logging..' : authType}
        </button>
      }

      {!newUserCreation && <Link className="text-gray-400 hover:text-gray-300 duration-100" href={navHref}>Don't You Have an Account? <span className="font-bold">Create One!</span></Link>}

    </div >
  )
}