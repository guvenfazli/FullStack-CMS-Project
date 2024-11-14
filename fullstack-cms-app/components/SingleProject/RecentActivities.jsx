import dateFormatter from "@/utils/dateFormatter"
export default function RecentActivities({ projectActivities }) {
  console.log(projectActivities)

  return (
    <div className="flex p-2 flex-col gap-2 h-1/2">
      <div className="w-full py-2 border-t border-b border-yellow-600 flex justify-center items-center">
        <p className="text-xl">Recent Activities</p>
      </div>

      <div className="flex flex-col gap-2 justify-start items-start">
        {projectActivities?.map((activity) =>
          <div key={activity.id} className="flex w-full justify-between">
            <p>{activity.activity}</p>
            <p>{dateFormatter(activity.createdAt)}</p>
          </div>
        )}
      </div>
    </div>
  )
}