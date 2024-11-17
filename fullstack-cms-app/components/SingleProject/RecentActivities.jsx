import Activity from "./Activity"

export default function RecentActivities({ projectActivities }) {

  return (
    <div className="flex p-2 flex-col gap-2 h-1/2 justify-start">
      <div className="w-full py-2 border-t border-b border-yellow-600 flex justify-center items-center">
        <p className="text-xl max-sm:text-base">Recent Activities</p>
      </div>

      {projectActivities && <Activity projectActivities={projectActivities} />}
    </div>
  )
}