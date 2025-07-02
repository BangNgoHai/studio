import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { teamStats } from "@/lib/data";
import { Trophy, ShieldAlert, ArrowDown, ArrowUp } from "lucide-react";

export function TeamStats() {
  const stats = [
    { title: "Wins", value: teamStats.wins, icon: <Trophy className="text-green-500" /> },
    { title: "Losses", value: teamStats.losses, icon: <ShieldAlert className="text-red-500" /> },
    { title: "Points Scored", value: teamStats.pointsScored, icon: <ArrowUp className="text-blue-500" /> },
    { title: "Points Conceded", value: teamStats.pointsConceded, icon: <ArrowDown className="text-orange-500" /> },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-headline text-primary">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
