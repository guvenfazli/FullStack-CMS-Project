import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "../../../ui/card"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart } from "recharts"

import { ChartContainer } from "@/components/ui/chart"


export default function TaskStatus() {

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 809, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    }
  }

  return (
    <Card className="bg-gray-900 w-2/6 border-0 mr-5 max-lg:w-1/2 max-sm:w-full max-sm:mb-5">

      <CardHeader className="flex items-start justify-center">
        <CardTitle className="text-base text-gray-300">Task Status</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-start">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}