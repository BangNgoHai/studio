import { Header } from "@/components/layout/header";
import { CreatePoll } from "@/components/polls/create-poll";
import { PollList } from "@/components/polls/poll-list";
import { polls } from "@/lib/data";

export default function PollsPage() {
  const activePolls = polls.filter(p => p.isActive);
  const pastPolls = polls.filter(p => !p.isActive);

  return (
    <div className="flex flex-col gap-8">
      <Header title="Team Polls" />
      <main className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <PollList title="Active Polls" polls={activePolls} />
          <PollList title="Past Polls" polls={pastPolls} />
        </div>
        <div className="md:col-span-1">
          <CreatePoll />
        </div>
      </main>
    </div>
  );
}
