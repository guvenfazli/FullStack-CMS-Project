import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "../../../ui/card"
import { completedProjects } from "@/components/Icons/Icons"

export default function CompletedProjects({ projectStats }) {

  const countedData = projectStats?.find(project => project.projectStatus === 'Completed')

  return (
    <Card className="bg-gray-900 w-2/6 border-0 mr-5 max-lg:w-1/2 max-sm:w-full max-sm:mb-5">

      <CardHeader className="flex items-start justify-center">
        <CardTitle className="text-base text-gray-300">Completed Projects</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-start">
        <div className="p-4 mr-5 bg-sky-500 rounded-xl">
          <p>{completedProjects}</p>
        </div>
        <p className="text-5xl text-gray-300">{countedData?.counted || 0}</p>
      </CardContent>
    </Card>
  )
}