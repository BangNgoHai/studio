'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Users } from "lucide-react";

type Player = {
  id: number;
  name: string;
  avatar: string;
};

type Team = {
  id: number;
  name: string;
  members: number[];
};

type TeamCardProps = {
  team: Team;
  players: Player[];
};

export function TeamCard({ team, players }: TeamCardProps) {
    const { toast } = useToast();
    const teamMembers = players.filter(p => team.members.includes(p.id));

    const onJoin = () => {
        toast({
            title: "Squad Joined!",
            description: `You have joined ${team.name} (simulated).`
        });
    }

  return (
    <Card className="flex flex-col">
        <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <Users className="text-primary" />
                {team.name}
            </CardTitle>
            <CardDescription>{team.members.length} / 8 players</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
            {teamMembers.length > 0 ? (
                <div className="flex -space-x-2 overflow-hidden">
                    {teamMembers.map(member => (
                         <Avatar key={member.id} className="inline-block h-10 w-10 rounded-full ring-2 ring-background" data-ai-hint="player portrait">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-muted-foreground">No players have joined this squad yet.</p>
            )}
        </CardContent>
        <CardFooter>
            <Button className="w-full" onClick={onJoin} disabled={team.members.length >= 8}>
                {team.members.length >= 8 ? "Squad Full" : "Join Squad"}
            </Button>
        </CardFooter>
    </Card>
  );
}
