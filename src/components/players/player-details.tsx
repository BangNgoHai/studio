"use client";

import { useEffect, useState } from "react";
import { handleGeneratePlayerDetails } from "@/app/actions";
import type { GeneratePlayerDetailsOutput } from "@/ai/flows/generate-player-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { List, CheckCircle, Star } from "lucide-react";

type PlayerDetailsProps = {
  name: string;
  position: string;
};

export function PlayerDetails({ name, position }: PlayerDetailsProps) {
  const [details, setDetails] = useState<GeneratePlayerDetailsOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await handleGeneratePlayerDetails({ name, position });
        if (result.error) {
          throw new Error(result.error);
        }
        setDetails(result as GeneratePlayerDetailsOutput);
      } catch (e: any) {
        setError("Failed to generate player details. Please try again later.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [name, position]);

  if (loading) {
    return <PlayerDetailsSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!details) {
    return null;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <List className="text-primary" />
            AI Introduction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-muted-foreground">{details.introduction}</p>
        </CardContent>
      </Card>
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Star className="text-primary" />
              Key Characteristics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {details.characteristics.map((char, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span className="text-muted-foreground">{char}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Star className="text-primary" />
              Core Abilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {details.abilities.map((ability, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span className="text-muted-foreground">{ability}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PlayerDetailsSkeleton() {
    return (
        <div className="grid gap-8 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <Skeleton className="w-1/2 h-8" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-3/4 h-4" />
                </CardContent>
            </Card>
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                         <Skeleton className="w-1/2 h-8" />
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded-full" />
                            <Skeleton className="w-4/5 h-4" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded-full" />
                            <Skeleton className="w-4/5 h-4" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded-full" />
                            <Skeleton className="w-4/5 h-4" />
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                         <Skeleton className="w-1/2 h-8" />
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded-full" />
                            <Skeleton className="w-4/5 h-4" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded-full" />
                            <Skeleton className="w-4/5 h-4" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded-full" />
                            <Skeleton className="w-4/5 h-4" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
