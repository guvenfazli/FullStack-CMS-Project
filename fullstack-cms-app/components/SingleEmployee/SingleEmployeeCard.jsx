import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mailIcon, employeeRoleIcon, dateIcon, phoneIcon } from "../Icons/Icons"
import SingleEmployee from "./SingleEmployee"
import dateFormatter from "@/utils/dateFormatter"
export default function SingleEmployeeCard({ fetchedEmployee }) {

  return (
    <div className="flex flex-col shadow-xl w-full rounded-lg bg-gray-900">
      <div className="flex flex-col justify-start items-center py-3 px-4">
        <div>
          <Avatar className="w-44 h-44 border-yellow-600 border-4">
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

        <div className="flex w-full justify-center items-center text-center">
          <p className="text-sm text-gray-500">Joined at {dateFormatter(fetchedEmployee?.createdAt)}</p>
        </div>

      </div>
    </div>
  )
}