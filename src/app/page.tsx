import { Header } from "@/components/layout/header";
import { TeamStats } from "@/components/dashboard/team-stats";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { ImprovementSuggester } from "@/components/dashboard/improvement-suggester";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <Header title="Dashboard" />
      <main className="grid gap-8">
        <TeamStats />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PerformanceChart />
          </div>
          <ImprovementSuggester />
        </div>
      </main>
    </div>
  );
}
