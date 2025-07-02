"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { performanceData } from "@/lib/data";
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig
} from "@/components/ui/chart";

const chartConfig = {
  pointsFor: {
    label: "Points For",
    color: "hsl(var(--primary))",
  },
  pointsAgainst: {
    label: "Points Against",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;


export function PerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Game Performance</CardTitle>
        <CardDescription>Points scored vs. points conceded over the last 7 games.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
              <XAxis dataKey="game" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <ChartTooltip
                cursor={{ fill: 'hsl(var(--accent) / 0.1)' }}
                content={<ChartTooltipContent />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="pointsFor" fill="var(--color-pointsFor)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pointsAgainst" fill="var(--color-pointsAgainst)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
