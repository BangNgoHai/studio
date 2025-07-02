'use client';

import { usePathname } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return (
      <main className="flex min-h-svh w-full flex-col items-center justify-center bg-secondary/20 p-4">
        {children}
      </main>
    );
  }

  return <AppLayout>{children}</AppLayout>;
}
