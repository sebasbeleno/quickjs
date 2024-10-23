import { ChevronUp, File, Plus, Sun, Trash } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useLocalStorage from "@/hooks/use-local-storage";
import { useState } from "react";
import { toast } from "sonner";

interface AppSidebarProps {
  currentFile: string;
  setCurrentFile: (file: string) => void;
}

export function AppSidebar({ currentFile, setCurrentFile }: AppSidebarProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [fileName, setFileName] = useState("");

  const { createFile, files, deleteFile } = useLocalStorage("files");

  const handleCreateFile = () => {
    createFile(fileName.replace(/\s/g, "-"));
    setFileName("");
    toast("File created successfully 🎉");
    setIsDialogOpen(false);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel asChild>Projects</SidebarGroupLabel>
          <SidebarGroupAction title="Add Project">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Plus />
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>File Name</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <label htmlFor="link" className="sr-only">
                      Link
                    </label>
                    <Input
                      id="link"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleCreateFile}>
                    Create
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </SidebarGroupAction>
          <SidebarGroupContent />
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Your files</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Object.keys(files).map((file) => (
                <SidebarMenuItem key={file}>
                  <SidebarMenuButton
                    asChild
                    onClick={() => setCurrentFile(file)}
                    isActive={currentFile === file}
                    className="cursor-pointer"
                  >
                    <div>
                      <File />
                      <span>{file}</span>
                    </div>
                  </SidebarMenuButton>
                  {currentFile !== file && (
                    <SidebarMenuAction title="Delete File" className="border">
                      <a
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete this file?"
                            )
                          ) {
                            deleteFile(file);
                            toast("File deleted successfully");
                            setCurrentFile(Object.keys(files)[0]);
                          }
                        }}
                      >
                        <Trash size={15} />
                      </a>
                    </SidebarMenuAction>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Sun /> <span>Theme</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Dark</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
