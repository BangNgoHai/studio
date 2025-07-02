import { Header } from "@/components/layout/header";
import { TeamStats } from "@/components/dashboard/team-stats";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { ImprovementSuggester } from "@/components/dashboard/improvement-suggester";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <Header title="Dashboard" />
      <main className="grid gap-8">
        <Card className="relative flex flex-col justify-end h-64 overflow-hidden rounded-xl">
          <Image
            src="https://placehold.co/1200x400.png"
            alt="Team banner"
            fill
            className="z-0 object-cover"
            data-ai-hint="football stadium evening"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="relative z-10 p-6">
            <h2 className="text-4xl font-bold text-white font-headline">Welcome to Gridiron Manager</h2>
            <p className="max-w-xl mt-2 text-lg text-white/90">
              Your central hub for team stats, player performance, and AI-driven insights.
            </p>
          </div>
        </Card>
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
