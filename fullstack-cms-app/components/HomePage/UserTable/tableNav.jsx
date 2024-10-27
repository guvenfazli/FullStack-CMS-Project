import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import RegisterForm from "@/components/Authentication/RegisterForm"

export default function TableNav({ isLogged }) {

  return (
    <div className="flex flex-row w-full justify-between items-center mb-7 max-[375px]:flex-col">
      <input name="searchEmployee" id="searchEmployee" placeholder="Search Employees" className="px-4 py-1 bg-gray-700 text-white w-96 rounded-2xl  max-[570px]:w-64 max-[450px]:w-48 max-[375px]:w-full max-[375px]:mb-5"></input>

      {isLogged && isLogged.isAdmin &&
        <Dialog>
          <DialogTrigger className="p-2 bg-sky-500 duration-75 text-gray-800 font-bold rounded-lg hover:bg-sky-300 active:bg-sky-700">Create Employee</DialogTrigger>
          <DialogContent className="bg-gray-900 border-none">
            <DialogHeader>
              <DialogTitle>Add a New Employee</DialogTitle>
            </DialogHeader>
            <RegisterForm newUserCreation={true} />
          </DialogContent>
        </Dialog>
      }

    </div >
  )
}