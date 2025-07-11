"use server";

import { suggestImprovements, SuggestImprovementsInput } from "@/ai/flows/suggest-improvements";
import { generatePlayerDetails, GeneratePlayerDetailsInput } from "@/ai/flows/generate-player-details";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export async function handleSuggestImprovements(input: SuggestImprovementsInput) {
  try {
    const result = await suggestImprovements(input);
    return { success: true, ...result };
  } catch (error: any) {
    console.error("Error in suggestImprovements flow:", error);
    return { success: false, error: error.message || "An unknown error occurred." };
  }
}

export async function handleGeneratePlayerDetails(input: GeneratePlayerDetailsInput) {
    try {
      const result = await generatePlayerDetails(input);
      return { success: true, ...result };
    } catch (error: any) {
      console.error("Error in generatePlayerDetails flow:", error);
      return { success: false, error: error.message || "An unknown error occurred." };
    }
}

export type UpdatePlayerProfileInput = {
    playerId: number;
    name: string;
    position: string;
}

export async function handleUpdatePlayerProfile(input: UpdatePlayerProfileInput) {
    console.log("Simulating player profile update:", input);
    // In a real application, you would update your database here.
    // For this prototype, we'll just log the data and return success.
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: 'Player profile updated successfully.' };
}

export type CreatePlayerProfileInput = {
    name: string;
    position: string;
}

export async function handleCreatePlayerProfile(input: CreatePlayerProfileInput) {
    console.log("Simulating player profile creation:", input);
    // In a real application, you would create a new player in your database here.
    // For this prototype, we'll just log the data and return a new player ID.
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newPlayerId = Math.floor(Math.random() * 1000) + 10;
    return { success: true, message: 'Player created successfully.', newPlayerId };
}

// Registration action
export async function handleRegister(values: any) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;
        return { success: true, user: { id: user.uid, email: user.email, name: values.name } };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Login action
export async function handleLogin(values: any) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;
        return { success: true, user: { id: user.uid, email: user.email, name: "Team Captain" } };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
