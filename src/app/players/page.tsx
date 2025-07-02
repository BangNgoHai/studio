import { Header } from "@/components/layout/header";
import { PlayerList } from "@/components/players/player-list";
import { players } from "@/lib/data";

export default function PlayersPage() {
  return (
    <div className="flex flex-col gap-8">
      <Header title="Player Profiles" />
      <main>
        <PlayerList players={players} />
      </main>
    </div>
  );
}
