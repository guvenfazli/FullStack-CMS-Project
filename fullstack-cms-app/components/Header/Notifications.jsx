import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useEffect, useState } from "react"
import { notificationIcon, pendingNotificationIcon } from "../Icons/Icons"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import timeFormatter from "@/utils/timeFormatter" // Formats the time that the notification arrives.
import notificationDateFormatter from "@/utils/notificationDateFormatter"

export default function Notifications({ isLogged, socket }) {

  const [notifications, setNotifications] = useState([])
  const [isRead, setIsRead] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function getNotifications() { // Fetches the notifications that user have.
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
        setIsRead(prev => {
          const notRead = notificationArray.some((notification) => notification.isRead === false)
          if (notRead) {
            return !prev
          }
        })
        setNotifications(notificationArray)
      } catch (err) {
        console.log(err.message)
      }
    }

    getNotifications()

    socket.emit('createNotificationRoom', isLogged.userId) // Creates the user spesific notification room.
    socket.on('sendNotif', (emp, projectId) => { // Gets the notification
      getNotifications()
      toast({
        title: 'New Notification!',
        description: <Link href={`/projects/${projectId}`}>{emp}</Link>,
        className: "bg-sky-500 border-none text-black text-lg"
      })
    })
    socket.on('activityNotif', (emp) => {
      toast({
        title: 'New Notification!',
        description: emp,
        className: "bg-yellow-500 border-none text-black text-lg"
      })
    })



    socket.on('markRead', (emp) => { // When user opens the notification section, notifications being as read auto
      getNotifications()
    })

    return () => { // User disconnects from the sockets and rooms
      socket.off('disconnect')
      socket.disconnect()

    }

  }, [isLogged])

  async function markAsRead() {
    await fetch('http://localhost:8080/markasread', {
      method: 'PATCH',
      credentials: 'include'
    })
    socket.emit('markAsRead', isLogged.userId)
  }


  return (
    <DropdownMenu >
      <DropdownMenuTrigger className="rounded-full p-2 hover:bg-slate-700 duration-75" onPointerDown={() => markAsRead()}>{!isRead ? notificationIcon : pendingNotificationIcon}</DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-700 text-white z-10">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length <= 0 ? <p>Seems quite...</p> : notifications.map((notify) => {
          return (
            <DropdownMenuItem className="p-1 flex w-full justify-between" key={notify.id}>
              <Link href={`/projects/${notify.projectId}`}>{notify.notificationMessage}</Link>
              <p className="text-slate-300 text-xs">{timeFormatter(notify.createdAt) + ' ' + notificationDateFormatter(notify.createdAt)}</p>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}