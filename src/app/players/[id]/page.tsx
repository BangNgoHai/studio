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
import { ArrowLeft, Edit } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

type PlayerPageProps = {
  params: {
    id: string;
  };
};

export default function PlayerPage({ params }: PlayerPageProps) {
  const player = players.find((p) => p.id.toString() === params.id);
  const currentUser = getCurrentUser();

  if (!player) {
    notFound();
  }

  const statKeys = Object.keys(player.stats);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Header title="Player Profile" />
        <div className="flex items-center gap-2">
            {currentUser.role === 'manager' && (
                <Button asChild>
                    <Link href={`/players/${params.id}/edit`}>
                        <Edit />
                        Edit Profile
                    </Link>
                </Button>
            )}
            <Button asChild variant="outline">
                <Link href="/players">
                    <ArrowLeft />
                    Back to Players
                </Link>
            </Button>
        </div>
      </div>
      <main className="space-y-8">
        <Card className="overflow-hidden">
            <div className="relative h-48 w-full">
                <Image
                    src="https://placehold.co/1200x480.png"
                    alt={`${player.name} action shot`}
                    fill
                    className="object-cover"
                    data-ai-hint="football action"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
            </div>
            <CardContent className="relative -mt-20 flex flex-col items-center gap-4 p-6 text-center md:flex-row md:text-left">
                <Image
                    src={player.avatar.replace('40x40', '128x128')}
                    alt={player.name}
                    width={128}
                    height={128}
                    className="rounded-full border-4 border-background bg-background shadow-lg"
                    data-ai-hint="player portrait"
                />
                <div className="flex-1">
                    <h1 className="text-4xl font-bold font-headline text-white">
                        {player.name}
                    </h1>
                    <Badge variant="secondary" className="mt-2 text-base">
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
                    <TableHead key={key} className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</TableHead>
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
