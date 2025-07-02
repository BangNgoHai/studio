"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

type Poll = {
  id: number;
  question: string;
  options: { id: string; text: string }[];
  votes: Record<string, number>;
  isActive: boolean;
};

type PollListProps = {
  title: string;
  polls: Poll[];
};

export function PollList({ title, polls }: PollListProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold font-headline">{title}</h2>
      <div className="space-y-4">
        {polls.map((poll) => (
          <Card key={poll.id}>
            <CardHeader>
              <CardTitle className="text-lg">{poll.question}</CardTitle>
            </CardHeader>
            <CardContent>
              {poll.isActive ? (
                <RadioGroup>
                  {poll.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={`${poll.id}-${option.id}`} />
                      <Label htmlFor={`${poll.id}-${option.id}`}>{option.text}</Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <PollResults poll={poll} />
              )}
            </CardContent>
            {poll.isActive && (
              <CardFooter>
                <Button>Submit Vote</Button>
              </CardFooter>
            )}
          </Card>
        ))}
        {polls.length === 0 && <p className="text-muted-foreground">No polls here.</p>}
      </div>
    </section>
  );
}

function PollResults({ poll }: { poll: Poll }) {
  const totalVotes = Object.values(poll.votes).reduce((sum, count) => sum + count, 0);

  return (
    <div className="space-y-3">
      {poll.options.map(option => {
        const voteCount = poll.votes[option.id] || 0;
        const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
        return (
          <div key={option.id} className="space-y-1">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">{option.text}</span>
              <span className="text-muted-foreground">{voteCount} votes</span>
            </div>
            <Progress value={percentage} />
          </div>
        )
      })}
    </div>
  )
}
