'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from '@/lib/auth';

type Player = {
  id: number;
  name: string;
  avatar: string;
  role?: 'manager' | 'player';
};

type Comment = {
    id: number;
    authorId: number;
    text: string;
}

type Topic = {
  id: number;
  title: string;
  description: string;
  authorId: number;
  comments: Comment[];
};

type StrategyBoardProps = {
  topics: Topic[];
  players: Player[];
};

export function StrategyBoard({ topics, players }: StrategyBoardProps) {
    const { toast } = useToast();
    const currentUser = getCurrentUser();
    const [newComments, setNewComments] = useState<Record<number, string>>({});

    const getPlayerById = (id: number) => players.find(p => p.id === id);

    const handleCommentSubmit = (topicId: number) => {
        const commentText = newComments[topicId];
        if (!commentText?.trim()) return;
        
        toast({
            title: "Comment Posted!",
            description: `Your comment has been posted (simulated).`
        });
        setNewComments(prev => ({ ...prev, [topicId]: "" }));
    }
  
    return (
        <Accordion type="single" collapsible className="w-full">
            {topics.map(topic => {
                const author = getPlayerById(topic.authorId);
                return (
                    <AccordionItem value={`item-${topic.id}`} key={topic.id} className="border-b-0 mb-4 rounded-lg overflow-hidden bg-card shadow-sm border">
                        <AccordionTrigger className="p-6 hover:no-underline data-[state=open]:border-b">
                            <div className="flex-1 text-left">
                                <h3 className="font-headline text-lg">{topic.title}</h3>
                                {author && <p className="text-sm text-muted-foreground mt-1">
                                    Proposed by {author.name}
                                </p>}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-6 pt-4">
                            <p className="mb-6">{topic.description}</p>
                            
                            <h4 className="font-semibold mb-4 text-base">Discussion</h4>
                            <div className="space-y-6 mb-6">
                                {topic.comments.map(comment => {
                                    const commentAuthor = getPlayerById(comment.authorId);
                                    return (
                                        <div key={comment.id} className="flex items-start gap-4">
                                            <Avatar className="h-10 w-10 border" data-ai-hint="player portrait">
                                                <AvatarImage src={commentAuthor?.avatar} />
                                                <AvatarFallback>{commentAuthor?.name.charAt(0) ?? '?'}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <p className="font-semibold text-sm">{commentAuthor?.name}</p>
                                                <p className="text-sm text-muted-foreground">{comment.text}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                                {topic.comments.length === 0 && <p className="text-sm text-muted-foreground">No comments yet. Start the discussion!</p>}
                            </div>

                            <div className="flex items-start gap-4 pt-6 border-t">
                                <Avatar className="h-10 w-10 border" data-ai-hint="user portrait">
                                    <AvatarImage src={getPlayerById(currentUser.id)?.avatar} />
                                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-2">
                                    <Textarea 
                                        placeholder="Add your thoughts..."
                                        value={newComments[topic.id] || ""}
                                        onChange={(e) => setNewComments(prev => ({...prev, [topic.id]: e.target.value}))}
                                        rows={2}
                                    />
                                    <Button onClick={() => handleCommentSubmit(topic.id)}>Post Comment</Button>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )
            })}
        </Accordion>
    );
}
