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
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface AppSidebarProps {
  currentFile: string;
  setCurrentFile: (file: string) => void;
}

export function AppSidebar({ currentFile, setCurrentFile }: AppSidebarProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileLang, setFileLang] = useState("javascript");

  const { createFile, files, deleteFile } = useLocalStorage("files");

  const handleCreateFile = (e: FormEvent) => {
    e.preventDefault();

    if (fileName.trim() === "") {
      toast("File name cannot be empty");
      return;
    }

    const parsedFileName = fileName.replace(/\s/g, "-").toLocaleLowerCase();

    if (files[parsedFileName]) {
      toast("File already exists");
      return;
    }

    setCurrentFile(fileName);
    createFile(parsedFileName);
    setFileName("");
    toast("File created successfully 🎉");
    setIsDialogOpen(false);
  };

  return (
    <Sidebar
      variant="floating"
      collapsible="offcanvas"
      className="bg-[#1a1b26]"
    >
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel asChild>Projects</SidebarGroupLabel>
          <SidebarGroupAction asChild title="Add Project">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger className="">
                <Plus className=" " />
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>New File</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateFile}>
                  <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                      <div>
                        <label>File Name</label>
                        <Input
                          value={fileName}
                          onChange={(e) => setFileName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label>Language</label>
                        <Select
                          onValueChange={setFileLang}
                          defaultValue={fileLang}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="javascript">
                              JavaScript
                            </SelectItem>
                            <SelectItem value="typescript">
                              TypeScript
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </form>
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
