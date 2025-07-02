"use client";

import { MainSidebar } from "@/components/layout/main-sidebar";
import { Sidebar, SidebarInset } from "@/components/ui/sidebar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar side="left" collapsible="icon">
        <MainSidebar />
      </Sidebar>
      <SidebarInset className="p-4 md:p-8">{children}</SidebarInset>
    </>
  );
}
