import { SidebarTrigger } from "@/components/ui/sidebar";

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex items-center gap-4">
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-3xl font-bold font-headline text-primary">{title}</h1>
    </header>
  );
}
