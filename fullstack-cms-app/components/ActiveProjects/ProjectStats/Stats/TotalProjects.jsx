import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "../../../ui/card"
import { totalProjects } from "@/components/Icons/Icons"

export default function TotalProjects() {
  return (
    <Card className="bg-gray-900 w-2/6 border-0 mr-5 max-lg:w-1/2 max-sm:w-full max-sm:mb-5">

      <CardHeader className="flex items-start justify-center">
        <CardTitle className="text-base text-gray-300">Total Projects </CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-start">
        <div className="p-4 mr-5 bg-sky-500 rounded-xl">
          <p>{totalProjects}</p>
        </div>
        <p className="text-5xl text-gray-300">Total Projects</p>
      </CardContent>
    </Card>
  )
}