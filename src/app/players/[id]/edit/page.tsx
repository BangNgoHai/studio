'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { players } from '@/lib/data';
import { notFound } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { handleUpdatePlayerProfile } from '@/app/actions';
import { Save } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  position: z.string().min(2, { message: 'Position must be at least 2 characters.' }),
});

export default function EditPlayerPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const player = players.find((p) => p.id.toString() === params.id);

  if (!player) {
    notFound();
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: player.name,
      position: player.position,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await handleUpdatePlayerProfile({ playerId: player.id, ...values });
    if (!result.success) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to update profile.' });
    } else {
      toast({ title: 'Success', description: 'Player profile updated (simulated).' });
      router.push(`/players/${player.id}`);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <Header title={`Edit ${player.name}`} />
      <main>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Player Information</CardTitle>
            <CardDescription>Update the player's details below.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Player Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Leo Martinez" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Quarterback" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" asChild>
                    <Link href={`/players/${player.id}`}>Cancel</Link>
                  </Button>
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
