import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


export default function StatusChart({ projectStats }) {

  const pendingData = projectStats?.projectStatusData.map((stat) => {
    if (stat.projectStatus === 'Pending') {
      const update = { ...stat }
      update.fill = '#FACC15'
      return update
    } else if (stat.projectStatus === 'Active') {
      const update = { ...stat }
      update.fill = '#60A5FA'
      return update
    } else if (stat.projectStatus === 'Completed') {
      const update = { ...stat }
      update.fill = '#34D399'
      return update
    } else if (stat.projectStatus === 'Cancelled') {
      const update = { ...stat }
      update.fill = '#F87171'
      return update
    }
  })

  console.log(pendingData)

  const chartConfig = {
    Pending: {
      label: "Pending",
      color: "#FACC15", 
    },
    Active: {
      label: "Active",
      color: "#60A5FA", 
    },
    Completed: {
      label: "Completed",
      color: "#34D399", 
    },
    Cancelled: {
      label: "Cancelled",
      color: "#F87171", 
    },
  };

  console.log(projectStats?.projectStatusData)


  return (
    <Card className="flex flex-col bg-gray-900 border-none">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-base text-white">Current Stats of the Projects</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pendingData}
              dataKey="counted"
              nameKey="projectStatus"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}