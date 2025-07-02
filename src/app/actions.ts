"use server";

import { suggestImprovements, SuggestImprovementsInput } from "@/ai/flows/suggest-improvements";
import { generatePlayerDetails, GeneratePlayerDetailsInput } from "@/ai/flows/generate-player-details";

export async function handleSuggestImprovements(input: SuggestImprovementsInput) {
  try {
    const result = await suggestImprovements(input);
    return result;
  } catch (error: any) {
    console.error("Error in suggestImprovements flow:", error);
    return { error: error.message || "An unknown error occurred." };
  }
}

export async function handleGeneratePlayerDetails(input: GeneratePlayerDetailsInput) {
    try {
      const result = await generatePlayerDetails(input);
      return result;
    } catch (error: any) {
      console.error("Error in generatePlayerDetails flow:", error);
      return { error: error.message || "An unknown error occurred." };
    }
}
