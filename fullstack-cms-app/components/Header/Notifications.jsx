import { useEffect, useState } from "react"
import Link from "next/link"
import { notificationIcon, pendingNotificationIcon } from "../Icons/Icons"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Notifications({ isLogged, socket }) {

  const [notifications, setNotifications] = useState([])


  useEffect(() => {
    async function getNotifications() {
      try {
        const response = await fetch('http://localhost:8080/notifications', {
          credentials: 'include'
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error(resData.message)
          throw error
        }

        const resData = await response.json()
        const notificationArray = resData.fetchedNotifications
        setNotifications(notificationArray)
      } catch (err) {
        console.log(err.message)
      }
    }

    getNotifications()


    socket.emit('createNotificationRoom', isLogged.userId)
    socket.on('sendNotif', (emp) => {
      getNotifications()
    })

    return () => {
      socket.disconnect()
    }


  }, [isLogged])


  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{notifications.length > 0 ? pendingNotificationIcon : notificationIcon}</DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-700 text-white z-10">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length <= 0 ? <p>Seems quite...</p> : notifications.map((notify) => {
          return (
            <DropdownMenuItem className="p-1" key={notify.id}>
              <Link href={`/projects/${notify.projectId}`}>{notify.notificationMessage}</Link>
            </DropdownMenuItem>
          )
        })}
        <DropdownMenuSeparator />
        <div className="flex w-full justify-center items-center">
          <DropdownMenuItem className="text-xs hover:cursor-pointer">Mark All as Read</DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}