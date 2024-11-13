import Notification from "./Notification"

export default function Notifications() {
  return (
    <div className="flex flex-col justify-start items-start absolute border w-80 z-10 -left-60 bg-gray-700 p-2">
      <Notification />
      <Notification />
      <Notification />
    </div>
  )
}