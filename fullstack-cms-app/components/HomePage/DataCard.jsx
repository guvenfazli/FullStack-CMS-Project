import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "../ui/card"
import { signalBars } from "../Icons/Icons"
import { Progress } from "../ui/progress"

export default function DataCard({ cardTitle, dataType }) {

  if (dataType === "Current") {
    return (
      <Card className="bg-gray-900 w-2/6 border-0 mr-5 max-lg:w-1/2 max-sm:w-full max-sm:mb-5">

        <CardHeader className="flex items-start justify-center">
          <CardTitle className="text-base text-gray-300">{cardTitle}</CardTitle>
        </CardHeader>

        <CardContent className="flex items-center justify-start">
          <div className="p-4 mr-5 bg-sky-500 rounded-xl">
            <p>{signalBars}</p>
          </div>
          <p className="text-5xl text-gray-300">1</p>
        </CardContent>
      </Card>
    )
  } else if (dataType === "Goal") {
    return (
      <Card className="bg-gray-900 w-2/6 border-0 mr-5 max-lg:w-1/2 max-sm:w-full">

        <CardHeader className="flex flex-row justify-between items-start">
          <CardTitle className="text-base text-gray-300">{cardTitle}</CardTitle>
        </CardHeader>

        <CardContent className="flex items-center justify-around">
          <p className="text-gray-300 text-5xl mr-5">1%</p>
          <Progress value={1} />
        </CardContent>

      </Card>
    )
  }




}
