"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Loader2, Sparkles } from "lucide-react";
import { teamStats, players } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { handleSuggestImprovements } from "@/app/actions";

export function ImprovementSuggester() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState("");
  const { toast } = useToast();

  const onSuggest = async () => {
    setLoading(true);
    setSuggestions("");
    try {
      const result = await handleSuggestImprovements({
        teamStatistics: JSON.stringify(teamStats),
        playerStatistics: JSON.stringify(players.map(p => ({ name: p.name, position: p.position, stats: p.stats }))),
      });

      if (result.error) {
        throw new Error(result.error);
      }
      
      if (result.suggestions) {
        setSuggestions(result.suggestions);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate suggestions. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="text-primary" />
          <CardTitle className="font-headline">AI Performance Coach</CardTitle>
        </div>
        <CardDescription>Get AI-driven suggestions to boost your team's performance.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {suggestions && !loading && (
          <div className="prose prose-sm max-w-none text-foreground animate-in fade-in">
            <ul className="space-y-2">
              {suggestions.split('\n').filter(s => s.trim().length > 0).map((suggestion, index) => (
                <li key={index} className="flex gap-2 items-start">
                  <Sparkles className="h-4 w-4 mt-1 text-accent flex-shrink-0" />
                  <span>{suggestion.replace(/^- /, '')}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onSuggest} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Generate Suggestions"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
