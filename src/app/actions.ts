"use server";

import { suggestImprovements, SuggestImprovementsInput } from "@/ai/flows/suggest-improvements";

export async function handleSuggestImprovements(input: SuggestImprovementsInput) {
  try {
    const result = await suggestImprovements(input);
    return result;
  } catch (error: any) {
    console.error("Error in suggestImprovements flow:", error);
    return { error: error.message || "An unknown error occurred." };
  }
}
