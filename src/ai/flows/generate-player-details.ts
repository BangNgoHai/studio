'use server';
/**
 * @fileOverview A Genkit flow for generating detailed football player profiles.
 *
 * - generatePlayerDetails - An exported function that triggers the flow.
 * - GeneratePlayerDetailsInput - The input type for the generatePlayerDetails function.
 * - GeneratePlayerDetailsOutput - The return type for the generatePlayerDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GeneratePlayerDetailsInputSchema = z.object({
  name: z.string().describe('The name of the football player.'),
  position: z.string().describe('The position the player plays.'),
});
export type GeneratePlayerDetailsInput = z.infer<typeof GeneratePlayerDetailsInputSchema>;

const GeneratePlayerDetailsOutputSchema = z.object({
  introduction: z.string().describe("A short, engaging introduction for the player, as if written by a sports journalist."),
  characteristics: z.array(z.string()).describe("A list of 3 key characteristics or traits of the player's personality or play style."),
  abilities: z.array(z.string()).describe("A list of 3 key on-field abilities or skills the player is known for."),
});
export type GeneratePlayerDetailsOutput = z.infer<typeof GeneratePlayerDetailsOutputSchema>;

export async function generatePlayerDetails(input: GeneratePlayerDetailsInput): Promise<GeneratePlayerDetailsOutput> {
  return generatePlayerDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePlayerDetailsPrompt',
  input: {schema: GeneratePlayerDetailsInputSchema},
  output: {schema: GeneratePlayerDetailsOutputSchema},
  prompt: `You are an expert sports journalist creating a profile for a football player.
  Player Name: {{{name}}}
  Position: {{{position}}}

  Based on their name and position, generate a compelling player profile.
  - The introduction should be a short paragraph (2-3 sentences).
  - Provide exactly 3 key characteristics.
  - Provide exactly 3 key abilities.
  
  Your response must be in the structured JSON format requested. Do not add any extra commentary.`,
});

const generatePlayerDetailsFlow = ai.defineFlow(
  {
    name: 'generatePlayerDetailsFlow',
    inputSchema: GeneratePlayerDetailsInputSchema,
    outputSchema: GeneratePlayerDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
