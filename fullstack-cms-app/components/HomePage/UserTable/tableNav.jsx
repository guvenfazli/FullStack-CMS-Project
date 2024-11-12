import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import RegisterForm from "@/components/Authentication/RegisterForm"
import { useRef } from "react"


export default function TableNav({ isLogged, inputPlaceHolder, buttonText, FormComponent, dialogTitle, projectId, searchFn, isError, socket }) {

  const lastChange = useRef()

  function searchBarFunction(e) {

    if (lastChange.current) {
      clearTimeout(lastChange.current)
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = null
      searchFn(e.target.value)
    }, 700)

  }

  return (
    <div className="flex flex-row w-full justify-between items-center mb-7 max-[375px]:flex-col">
      <input ref={lastChange} onChange={(e) => searchBarFunction(e)} name="searchEmployee" id="searchEmployee" placeholder={inputPlaceHolder} className="px-4 py-1 bg-gray-700 text-white w-96 rounded-2xl  max-[570px]:w-64 max-[450px]:w-48 max-[375px]:w-full max-[375px]:mb-5"></input>

      {isLogged && isLogged.isAdmin &&
        <Dialog>
          <DialogTrigger className="p-2 bg-sky-500 duration-75 text-gray-800 font-bold rounded-lg hover:bg-sky-300 active:bg-sky-700">{buttonText}</DialogTrigger>
          <DialogContent className="bg-gray-900 border-none">
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
            </DialogHeader>
            <FormComponent newUserCreation={true} projectId={projectId} socket={socket} />
          </DialogContent>
        </Dialog>
      }

    </div >
  )
}