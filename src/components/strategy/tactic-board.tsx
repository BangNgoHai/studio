'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import { DndContext, useSensor, useSensors, PointerSensor, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Hand, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Player = {
  id: number;
  name: string;
  avatar: string;
  initialX: number;
  initialY: number;
};

type DraggablePlayerProps = {
  player: Player & { x: number; y: number };
  mode: 'drag' | 'draw';
};

function DraggablePlayer({ player, mode }: DraggablePlayerProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: player.id,
    disabled: mode === 'draw',
  });

  const style = {
    top: `${player.y}%`,
    left: `${player.x}%`,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group cursor-grab",
        mode === 'draw' && 'cursor-not-allowed'
      )}
    >
      <Avatar className="w-12 h-12 border-2 border-primary bg-background shadow-lg group-active:scale-110 transition-transform">
        <AvatarImage src={player.avatar} alt={player.name} data-ai-hint="player portrait" />
        <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <span className="mt-1 px-2 py-0.5 text-xs font-semibold bg-background/80 text-foreground rounded-full shadow">
        {player.name.split(' ')[0]}
      </span>
    </div>
  );
}

type TacticBoardProps = {
  players: Player[];
};

export function TacticBoard({ players: initialPlayers }: TacticBoardProps) {
  const [players, setPlayers] = useState(
    initialPlayers.map(p => ({ ...p, x: p.initialX, y: p.initialY }))
  );
  const [mode, setMode] = useState<'drag' | 'draw'>('drag');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !boardRef.current) return;
    
    const resizeCanvas = () => {
        canvas.width = boardRef.current!.offsetWidth;
        canvas.height = boardRef.current!.offsetHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.strokeStyle = '#FBBF24'; // accent color
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
        }
    }
    
    // Resize observer is better than window resize for element-specific resizing
    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    resizeObserver.observe(boardRef.current);

    resizeCanvas();

    return () => resizeObserver.disconnect();
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    setPlayers(currentPlayers =>
      currentPlayers.map(p => {
        if (p.id === active.id) {
          const boardWidth = boardRef.current?.offsetWidth ?? 0;
          const boardHeight = boardRef.current?.offsetHeight ?? 0;
          if (!boardWidth || !boardHeight) return p;

          const newX = p.x + (delta.x / boardWidth) * 100;
          const newY = p.y + (delta.y / boardHeight) * 100;

          // Clamp position within the board
          const clampedX = Math.max(5, Math.min(95, newX));
          const clampedY = Math.max(5, Math.min(95, newY));

          return { ...p, x: clampedX, y: clampedY };
        }
        return p;
      })
    );
  };
  
  const getCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (mode !== 'draw') return;
    const { x, y } = getCoords(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || mode !== 'draw') return;
    const { x, y } = getCoords(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.closePath();
    setIsDrawing(false);
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-4">
            <Label htmlFor="mode-switch" className="flex items-center gap-2 font-semibold">
                Mode:
            </Label>
            <div className="flex items-center space-x-2">
                <Hand className={cn("h-5 w-5", mode === 'drag' ? 'text-primary' : 'text-muted-foreground')} />
                <Switch
                    id="mode-switch"
                    checked={mode === 'draw'}
                    onCheckedChange={(checked) => setMode(checked ? 'draw' : 'drag')}
                />
                <Pencil className={cn("h-5 w-5", mode === 'draw' ? 'text-primary' : 'text-muted-foreground')} />
            </div>
        </div>
        <Button variant="outline" size="sm" onClick={clearCanvas}>
          <Trash2 className="mr-2 h-4 w-4" />
          Clear Drawing
        </Button>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <div ref={boardRef} className="relative w-full aspect-[4/3] bg-green-700 rounded-lg overflow-hidden border-4 border-white/30">
          {/* Pitch Markings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25%] aspect-square border-2 border-white/30 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/30 rounded-full" />
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-white/30" />
          <div className="absolute inset-y-0 left-0 w-[18%] border-r-2 border-white/30">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 h-[40%] w-full border-y-2 border-white/30"></div>
          </div>
          <div className="absolute inset-y-0 right-0 w-[18%] border-l-2 border-white/30">
             <div className="absolute top-1/2 -translate-y-1/2 right-0 h-[40%] w-full border-y-2 border-white/30"></div>
          </div>
          
          {/* Canvas for Drawing */}
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className={cn("absolute inset-0 z-10", mode === 'draw' ? 'cursor-crosshair' : 'pointer-events-none')}
          />
          
          {/* Players */}
          {players.map(player => (
            <DraggablePlayer key={player.id} player={player} mode={mode} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
