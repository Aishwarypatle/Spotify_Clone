"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getMusicRecommendations } from "@/ai/flows/personalized-music-recommendations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";

const formSchema = z.object({
  listeningHistory: z
    .string()
    .min(10, "Please describe your music taste in at least 10 characters."),
});

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      listeningHistory: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const result = await getMusicRecommendations(values);
        setRecommendations(result.recommendations);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Failed to get music recommendations. Please try again.",
        });
      }
    });
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold font-headline mb-2 flex items-center gap-2">
        <Sparkles className="w-8 h-8 text-primary" />
        Discover New Music
      </h1>
      <p className="text-muted-foreground mb-8">
        Let our AI craft a personalized playlist just for you.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Tell Us What You Like</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="listeningHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Music Taste</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'I love 80s synth-pop, dreamy indie rock like Beach House, and old-school hip hop like A Tribe Called Quest.'"
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Describe your favorite genres, artists, and songs. The
                        more detail, the better!
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Get Recommendations"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="font-headline">Your New Jams</CardTitle>
          </CardHeader>
          <CardContent>
            {isPending ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : recommendations.length > 0 ? (
              <ul className="space-y-3">
                {recommendations.map((rec, index) => (
                  <li
                    key={index}
                    className="p-3 bg-background/50 rounded-md border text-sm"
                  >
                    {rec}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full p-8">
                <Sparkles className="w-12 h-12 mb-4" />
                <p>Your personalized recommendations will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
