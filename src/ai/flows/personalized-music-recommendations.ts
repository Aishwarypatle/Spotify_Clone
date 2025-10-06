'use server';
/**
 * @fileOverview A personalized music recommendation AI agent.
 *
 * - getMusicRecommendations - A function that handles the music recommendation process.
 * - MusicRecommendationInput - The input type for the getMusicRecommendations function.
 * - MusicRecommendationOutput - The return type for the getMusicRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MusicRecommendationInputSchema = z.object({
  listeningHistory: z
    .string()
    .describe(
      'A description of the user listening history and music preferences.'
    ),
});
export type MusicRecommendationInput = z.infer<typeof MusicRecommendationInputSchema>;

const MusicRecommendationOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of music recommendations based on the user listening history and preferences.'),
});
export type MusicRecommendationOutput = z.infer<typeof MusicRecommendationOutputSchema>;

export async function getMusicRecommendations(input: MusicRecommendationInput): Promise<MusicRecommendationOutput> {
  return musicRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'musicRecommendationPrompt',
  input: {schema: MusicRecommendationInputSchema},
  output: {schema: MusicRecommendationOutputSchema},
  prompt: `You are a music expert. Given the following listening history and preferences, recommend a list of songs the user might enjoy.

Listening History and Preferences: {{{listeningHistory}}}

Output a list of song recommendations.`,
});

const musicRecommendationFlow = ai.defineFlow(
  {
    name: 'musicRecommendationFlow',
    inputSchema: MusicRecommendationInputSchema,
    outputSchema: MusicRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
