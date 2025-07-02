'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from '@/lib/auth';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TacticBoard } from './tactic-board';
import { Map } from 'lucide-react';

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

    const formationPlayers = players.slice(0, 8).map((p, index) => {
        const positions = [
            { x: 8, y: 50 },   // GK
            { x: 25, y: 30 },  // DEF
            { x: 25, y: 70 },  // DEF
            { x: 45, y: 50 },  // MID
            { x: 65, y: 30 },  // MID
            { x: 65, y: 70 },  // MID
            { x: 85, y: 40 },  // FWD
            { x: 85, y: 60 },  // FWD
        ];
        return { ...p, initialX: positions[index]?.x ?? 50, initialY: positions[index]?.y ?? 50 };
    });
  
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
                        <AccordionContent className="p-6 pt-0">
                             <div className="border-b pb-6 mb-6">
                                <p className="mb-4">{topic.description}</p>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">
                                            <Map className="mr-2 h-4 w-4" />
                                            View Tactic Board
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl">
                                        <DialogHeader>
                                            <DialogTitle className="font-headline">{topic.title}</DialogTitle>
                                            <DialogDescription>
                                                Drag players to adjust positions and draw on the board to illustrate tactics.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <TacticBoard players={formationPlayers} />
                                    </DialogContent>
                                </Dialog>
                            </div>
                            
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
