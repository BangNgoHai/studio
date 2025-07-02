import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const statKeys = Array.from(new Set(players.flatMap(p => Object.keys(p.stats))));

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Player</TableHead>
              <TableHead>Position</TableHead>
              {statKeys.map(key => (
                <TableHead key={key} className="text-right">{key}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player) => (
              <TableRow key={player.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar data-ai-hint="player portrait">
                      <AvatarImage src={player.avatar} alt={player.name} />
                      <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{player.name}</span>
                  </div>
                </TableCell>
                <TableCell>{player.position}</TableCell>
                {statKeys.map(key => (
                  <TableCell key={key} className="text-right font-mono">
                    {player.stats[key] ?? 'N/A'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
