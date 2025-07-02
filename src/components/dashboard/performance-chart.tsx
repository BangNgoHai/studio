"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { performanceData } from "@/lib/data";
import { ChartTooltipContent } from "@/components/ui/chart";

export function PerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Game Performance</CardTitle>
        <CardDescription>Points scored vs. points conceded over the last 7 games.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
              <XAxis dataKey="game" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: 'hsl(var(--accent) / 0.1)' }}
                content={<ChartTooltipContent />}
              />
              <Legend iconSize={10} />
              <Bar dataKey="pointsFor" name="Points For" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pointsAgainst" name="Points Against" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
