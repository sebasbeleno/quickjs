import { AppSidebar } from "./appSidebar";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";

interface LayoutProps {
  children: React.ReactNode;
  currentFile: string;
  setCurrentFile: (file: string) => void;
}

export default function Layout({
  children,
  currentFile,
  setCurrentFile,
}: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar currentFile={currentFile} setCurrentFile={setCurrentFile} />
      <main className="flex flex-col h-full w-full overflow-hidden">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
