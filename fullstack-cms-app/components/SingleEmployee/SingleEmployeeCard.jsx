import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SingleEmployee from "./SingleEmployee"
import dateFormatter from "@/utils/dateFormatter"
export default function SingleEmployeeCard({ fetchedEmployee }) {

  return (
    <div className="w-full mb-10 rounded-lg bg-slate-900">
      <div className="flex w-full justify-center items-start border-b border-b-gray-500 py-3">
        <Avatar className="w-24 h-24">
          <AvatarImage src={`http://localhost:8080/${fetchedEmployee?.profilePic}`} />
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>
      </div>


      <div className="flex w-full border-b border-b-gray-500">
        <SingleEmployee information={'Name:'}>{fetchedEmployee?.name}</SingleEmployee>
      </div>

      <div className="flex w-full border-b border-b-gray-500 ">
        <SingleEmployee information={'Surname:'}>{fetchedEmployee?.surname}</SingleEmployee>
      </div>

      <div className="flex w-full border-b border-b-gray-500 ">
        <SingleEmployee information={'Email:'}>{fetchedEmployee?.email}</SingleEmployee>
      </div>

      <div className="flex w-full border-b border-b-gray-500 ">
        <SingleEmployee information={'Role:'}>{fetchedEmployee?.isAdmin ? 'Admin' : 'Employee'}</SingleEmployee>
      </div>

      <div className="flex w-full border-b border-b-gray-500 ">
        <SingleEmployee information={'Job Title:'}>{fetchedEmployee?.job_title}</SingleEmployee>
      </div>

      <div className="flex w-full border-b border-b-gray-500">
        <SingleEmployee information={'Created At:'}>{dateFormatter(fetchedEmployee?.createdAt)}</SingleEmployee>
      </div>
    </div>
  )
}