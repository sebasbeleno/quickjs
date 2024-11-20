import { AppSidebar } from './appSidebar';
import { SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { Toaster } from '@/components/ui/sonner';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <SidebarProvider className="bg-[#1a1b26] text-white">
            <AppSidebar />
            <main className="flex h-full w-full flex-col overflow-hidden">
                <SidebarTrigger />
                {children}
                <Toaster />
            </main>
        </SidebarProvider>
    );
}
