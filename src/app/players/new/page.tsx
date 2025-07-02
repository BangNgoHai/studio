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
import { useToast } from '@/hooks/use-toast';
import { handleCreatePlayerProfile } from '@/app/actions';
import { Save } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  position: z.string().min(2, { message: 'Position must be at least 2 characters.' }),
});

export default function NewPlayerPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      position: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await handleCreatePlayerProfile(values);
    if (!result.success) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to create profile.' });
    } else {
      toast({ title: 'Success', description: 'New player profile created (simulated).' });
      router.push(`/players`);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <Header title="Create New Player" />
      <main>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>New Player Information</CardTitle>
            <CardDescription>Enter the details for the new player.</CardDescription>
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
                        <Input placeholder="e.g. Alex Ray" {...field} />
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
                        <Input placeholder="e.g. Kicker" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" asChild>
                    <Link href="/players">Cancel</Link>
                  </Button>
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" /> Create Profile
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
