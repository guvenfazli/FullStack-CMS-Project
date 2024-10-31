import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "../../../ui/card"

export default function TaskStatus() {
  return (
    <Card className="bg-gray-900 w-2/6 border-0 mr-5 max-lg:w-1/2 max-sm:w-full max-sm:mb-5">

      <CardHeader className="flex items-start justify-center">
        <CardTitle className="text-base text-gray-300">Task Status</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-start">
        <p className="text-white">Will be task chart here.</p>
        {/* <p className="text-5xl text-gray-300">Total Projects</p> */}
      </CardContent>
    </Card>
  )
}