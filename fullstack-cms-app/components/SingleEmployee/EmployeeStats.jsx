import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  date: {
    label: "Date",
    color: "#34D399",
  },
}
import dateFormatter from "@/utils/dateFormatter"


export default function EmployeeStats({ employeeStats }) {
  return (
    <Card className="bg-gray-900 border-none">
      <CardHeader>
        <CardTitle className="text-white">Completed Task Numbers</CardTitle>
        <CardDescription>Daily</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-80">
          <BarChart
            accessibilityLayer
            data={employeeStats}
            margin={{
              top: 20,
            }}
          
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => dateFormatter(value)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="counted"  fill="#34D399" radius={8} barSize={50}>
              <LabelList
                position="top"
                offset={5}
                className="fill-white font-bold text-lg"
                fontSize={12}
                formatter={(value) => value}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex font-medium leading-none text-white">
          Daily Completed Task Numbers
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total completed tasks this week.
        </div>
      </CardFooter>
    </Card>
  )
}