'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing team statistics and suggesting improvements.
 *
 * - suggestImprovements - An exported function that triggers the flow.
 * - SuggestImprovementsInput - The input type for the suggestImprovements function.
 * - SuggestImprovementsOutput - The return type for the suggestImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestImprovementsInputSchema = z.object({
  teamStatistics: z
    .string()
    .describe('A JSON string containing the team statistics, including wins, losses, points scored, and other relevant metrics.'),
  playerStatistics: z
    .string()
    .describe('A JSON string containing the statistics for each player, including goals, assists, and other relevant metrics.'),
});
export type SuggestImprovementsInput = z.infer<typeof SuggestImprovementsInputSchema>;

const SuggestImprovementsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('A list of suggestions for improving the team performance, based on the provided statistics.'),
});
export type SuggestImprovementsOutput = z.infer<typeof SuggestImprovementsOutputSchema>;

export async function suggestImprovements(input: SuggestImprovementsInput): Promise<SuggestImprovementsOutput> {
  return suggestImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestImprovementsPrompt',
  input: {schema: SuggestImprovementsInputSchema},
  output: {schema: SuggestImprovementsOutputSchema},
  prompt: `You are an AI assistant specialized in analyzing football team statistics and suggesting improvements.

You will be provided with team statistics and player statistics in JSON format. Analyze these statistics and provide a list of suggestions for improving team performance. Focus on strategy adjustments, player position changes, and any other data-driven recommendations to enhance the team's overall effectiveness.

Team Statistics: {{{teamStatistics}}}
Player Statistics: {{{playerStatistics}}}

Provide your suggestions in a clear and concise manner.
`,
});

const suggestImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestImprovementsFlow',
    inputSchema: SuggestImprovementsInputSchema,
    outputSchema: SuggestImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
