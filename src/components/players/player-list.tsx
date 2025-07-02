import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';

type Player = {
  id: number;
  name: string;
  position: string;
  stats: Record<string, number | string>;
  avatar: string;
};

type PlayerListProps = {
  players: Player[];
};

export function PlayerList({ players }: PlayerListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {players.map((player) => (
        <Link href={`/players/${player.id}`} key={player.id} className="group">
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary">
            <CardHeader className="flex flex-row items-center gap-4 p-4">
              <Avatar className="w-16 h-16 border-2 border-primary/50 group-hover:border-primary" data-ai-hint="player portrait">
                <AvatarImage src={player.avatar.replace('40x40', '80x80')} alt={player.name} />
                <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <CardTitle className="text-lg truncate font-headline">{player.name}</CardTitle>
                <Badge variant="secondary" className="mt-1">{player.position}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
               <p>Click to view full player profile and AI analysis.</p>
               <div className="mt-2 font-semibold text-right text-primary group-hover:underline">View Profile &rarr;</div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
