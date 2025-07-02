import { Header } from "@/components/layout/header";
import { PlayerList } from "@/components/players/player-list";
import { players } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserPlus } from "lucide-react";

export default function PlayersPage() {
  const currentUser = getCurrentUser();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Header title="Player Profiles" />
        {currentUser.role === 'manager' && (
          <Button asChild>
            <Link href="/players/new">
              <UserPlus />
              Create Player
            </Link>
          </Button>
        )}
      </div>
      <main>
        <PlayerList players={players} />
      </main>
    </div>
  );
}
