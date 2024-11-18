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

  console.log(projectStats)

  const chartConfig = {
    counted: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  }


  return (
    <Card className="flex flex-col bg-gray-900 border-none">
    <CardHeader className="items-center pb-0">
      <CardTitle className="text-base text-white">Current Stats of Projects</CardTitle>
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
            innerRadius={50}
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
                        Stats
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
  </Card>
  )
}