import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mailIcon, employeeRoleIcon, dateIcon, phoneIcon, profileTaskIcon, completedTask, editProfileIcon, activityPointsIcon, productivityPointsIcon } from "../Icons/Icons"
import { useAppContext } from "@/context"
import EditProfile from "./EditProfile"
import SingleEmployee from "./SingleEmployee"
import dateFormatter from "@/utils/dateFormatter"

export default function SingleEmployeeCard({ fetchedEmployee }) {

  const { isLogged } = useAppContext()

  const pendingTasks = fetchedEmployee?.tasks.filter((task) => task.taskStatus !== 'Completed')

  return (
    <div className={`flex flex-col rotate-0 shadow-md shadow-zinc-900 duration-200 w-full rounded-lg bg-gray-900`}>
      {
        isLogged?.userId === fetchedEmployee?.id &&

        <div className="flex w-full pt-4 pr-4 items-center justify-end">
          <Dialog>
            <DialogTrigger>{editProfileIcon}</DialogTrigger>
            <DialogContent className="bg-gray-900 border-none">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <EditProfile employee={fetchedEmployee} />
            </DialogContent>
          </Dialog>
        </div>
      }

      <div className={`flex flex-col relative justify-start items-center py-3 overflow-hidden px-4`}>

        <div>
          <Avatar className="w-40 h-40 border-yellow-600 border-4">
            <AvatarImage src={`http://localhost:8080/${fetchedEmployee?.profilePic}`} />
            <AvatarFallback>PP</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col text-center p-3">
          <SingleEmployee>{fetchedEmployee?.name + ' ' + fetchedEmployee?.surname}</SingleEmployee>
          <p className="text-base text-gray-500">{fetchedEmployee?.jobTitle}</p>
        </div>

        <div className="flex w-full items-center gap-5 p-3 justify-start">
          <p>{mailIcon}</p>
          <SingleEmployee>{fetchedEmployee?.email}</SingleEmployee>
        </div>

        <div className="flex w-full items-center gap-5 p-3 justify-start">
          <p>{phoneIcon}</p>
          <SingleEmployee>{fetchedEmployee?.phoneNumber}</SingleEmployee>
        </div>

        <div className="flex w-full items-center gap-5 p-3 justify-start">
          <p>{employeeRoleIcon}</p>
          <SingleEmployee>{fetchedEmployee?.isAdmin ? 'Admin' : 'Employee'}</SingleEmployee>
        </div>

        <div className="flex w-full items-center gap-5 p-3 justify-start">
          <p>{dateIcon}</p>
          <SingleEmployee>{dateFormatter(fetchedEmployee?.birthDate)}</SingleEmployee>
        </div>


        <div className="flex w-full items-center gap-5 p-3 justify-between">
          <div className="flex items-center gap-2">
            <p>{profileTaskIcon}</p>
            <SingleEmployee>{pendingTasks?.length}</SingleEmployee>
          </div>

          <div className="flex items-center gap-2">
            <p>{completedTask}</p>
            <SingleEmployee>{fetchedEmployee?.completedTasks}</SingleEmployee>
          </div>
        </div>

        <div className="flex flex-col w-full items-start gap-5 p-3 justify-start">
          <div className="flex items-center gap-2">
            <p>{activityPointsIcon}</p>
            <SingleEmployee>{fetchedEmployee?.activityPoints + ' '} <span className=" text-xs text-gray-500">Activity Points</span></SingleEmployee>
          </div>

          <div className="flex items-center gap-2">
            <p>{productivityPointsIcon}</p>
            <SingleEmployee>{fetchedEmployee?.productivityPoints  + ' '} <span className=" text-xs text-gray-500">Productivity Points</span></SingleEmployee>
          </div>
        </div>

        <div className="flex w-full justify-center items-center text-center">
          <p className="text-sm text-gray-500">Joined at {dateFormatter(fetchedEmployee?.createdAt)}</p>
        </div>

      </div>
    </div>
  )
}