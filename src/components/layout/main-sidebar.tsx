'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Users, Vote, LogOut } from 'lucide-react';
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { getCurrentUser } from '@/lib/auth';

export const FootballIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-football">
      <path d="M12.43 12.43 18.5 6.36c.86-.86.73-2.28-.3-3.3s-2.44-.86-3.3.3L8.57 9.71"/>
      <path d="m5.5 18.5 6.07-6.07"/>
      <path d="M12.43 12.43c.86-.86 2.28-.73 3.3.3s.86 2.44-.3 3.3l-6.07 6.07c-.86.86-2.28.73-3.3-.3s-.86-2.44.3-3.3Z"/>
      <path d="M9.71 8.57c-.86.86-.73 2.28.3 3.3s2.44.86 3.3-.3L19.7 5.21c.86-.86.73-2.28-.3-3.3s-2.44-.86-3.3.3Z"/>
    </svg>
  );

export function MainSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (path: string) => pathname === path || (path === '/players' && pathname.startsWith('/players/'));
  const user = getCurrentUser();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <FootballIcon />
            <span className="text-lg font-headline font-semibold">Gridiron Manager</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/')}
              tooltip={{ children: 'Dashboard' }}
            >
              <Link href="/">
                <Home />
                Dashboard
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/players')}
              tooltip={{ children: 'Players' }}
            >
              <Link href="/players">
                <Users />
                Player Profiles
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/polls')}
              tooltip={{ children: 'Polls' }}
            >
              <Link href="/polls">
                <Vote />
                Team Polls
                <Badge variant="secondary" className="ml-auto">2 Active</Badge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="h-auto py-2 w-full">
                  <Avatar className="size-8">
                    <AvatarImage src="https://placehold.co/40x40.png" alt={user.name} data-ai-hint="user portrait" />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start overflow-hidden">
                    <span className="font-semibold truncate">{user.name}</span>
                    <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-[calc(var(--sidebar-width)_-_1rem)] mb-2 ml-2">
                <DropdownMenuItem onClick={() => router.push('/login')} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
