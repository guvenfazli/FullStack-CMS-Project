import dateFormatter from "@/utils/dateFormatter"

export default function Activity({ projectActivities }) {
  return (
    <div className="flex flex-col gap-2 justify-start items-start overflow-scroll overflow-x-hidden ">
      {projectActivities?.map((activity) =>
        <div key={activity.id} className="flex w-full justify-between max-sm:text-sm">
          <p>{activity.activity}</p>
          <p>{dateFormatter(activity.createdAt)}</p>
        </div>
      )}
    </div>
  )
}