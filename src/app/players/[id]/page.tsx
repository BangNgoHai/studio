import { players } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayerDetails } from "@/components/players/player-details";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";

type PlayerPageProps = {
  params: {
    id: string;
  };
};

export default function PlayerPage({ params }: PlayerPageProps) {
  const player = players.find((p) => p.id.toString() === params.id);

  if (!player) {
    notFound();
  }

  const statKeys = Object.keys(player.stats);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Header title="Player Profile" />
        <Button asChild variant="outline">
            <Link href="/players">
                <ArrowLeft />
                Back to Players
            </Link>
        </Button>
      </div>
      <main className="space-y-8">
        <Card>
          <CardContent className="flex flex-col items-center gap-6 p-6 md:flex-row">
            <Image
              src={player.avatar.replace('40x40', '128x128')}
              alt={player.name}
              width={128}
              height={128}
              className="rounded-full border-4 border-primary shadow-lg"
              data-ai-hint="player portrait"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold font-headline text-primary">
                {player.name}
              </h1>
              <Badge variant="default" className="mt-2 text-lg">
                {player.position}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <PlayerDetails name={player.name} position={player.position} />

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Career Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {statKeys.map((key) => (
                    <TableHead key={key}>{key}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  {statKeys.map((key) => (
                    <TableCell key={key} className="text-2xl font-mono font-bold text-primary">
                      {player.stats[key]}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
