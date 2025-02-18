import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card"
import { completedProjects } from "@/components/Icons/Icons"

export default function CompletedProjects({ projectStats }) {

  const countedData = projectStats?.find(project => project.projectStatus === 'Completed')

  return (
    <Card className="bg-gray-900 w-full border-0 mr-5  max-sm:w-full max-sm:mb-5 justify-center flex flex-col">

      <CardHeader className="flex items-start justify-center">
        <CardTitle className="text-base text-gray-300">Completed Projects</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-start">
        <div className="p-4 mr-5 bg-green-700 rounded-xl">
          <p>{completedProjects}</p>
        </div>
        <p className="text-5xl text-gray-300">{countedData?.counted || 0}</p>
      </CardContent>
    </Card>
  )
}