import { Header } from "@/components/layout/header";
import { TeamCard } from "@/components/teams/team-card";
import { smallTeams, players } from "@/lib/data";

export default function TeamsPage() {
  return (
    <div className="flex flex-col gap-8">
      <Header title="Join a Squad" />
      <main>
        <p className="mb-6 text-muted-foreground">
            Teams are forming for 8v8 practice matches. Join a squad to get in on the action.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {smallTeams.map((team) => (
                <TeamCard key={team.id} team={team} players={players} />
            ))}
        </div>
      </main>
    </div>
  );
}
