import { Header } from "@/components/layout/header";
import { StrategyBoard } from "@/components/strategy/strategy-board";
import { players, strategyTopics } from "@/lib/data";

export default function StrategyPage() {
    return (
        <div className="flex flex-col gap-8">
            <Header title="Strategy Board" />
            <main>
                <p className="mb-6 text-muted-foreground">
                    Discuss tactics and game plans for the upcoming 8v8 matches.
                </p>
                <StrategyBoard topics={strategyTopics} players={players} />
            </main>
        </div>
    )
}
