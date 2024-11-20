import { ChevronUp, Plus, Sun } from 'lucide-react';
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
    SidebarMenuButton,
    SidebarMenuItem,
} from './ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { addFile, File, selectAllFiles, setCurrentFileId } from '@/store/slices/filesSlice';
import { useDispatch, useSelector } from 'react-redux';
import FileList from './FileList';
import { RootState } from '@/store';
import { getFilenameWithExtension, getRandomFileId } from '@/lib/utils';

// TODO: Make files list component
export function AppSidebar() {
    const files: File[] | null = useSelector(selectAllFiles);
    const currentFileId = useSelector((state: RootState) => state.files.currentFile.id);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [fileName, setFileName] = useState('');
    const [fileLang, setFileLang] = useState('javascript');

    const dispatch = useDispatch();

    const handleCreateFile = (e: FormEvent) => {
        e.preventDefault();

        if (fileName.trim() === '') {
            toast('File name cannot be empty');
            return;
        }

        const parsedFileName = getFilenameWithExtension(fileName, fileLang);

        //todo: Check if file already exists
        const id = getRandomFileId();
        dispatch(
            addFile({
                content: 'console.log("Hello, World!")',
                id,
                name: parsedFileName,
            }),
        );
        dispatch(setCurrentFileId(id));
        setFileName('');
        toast('File created successfully 🎉');
        setIsDialogOpen(false);
    };

    return (
        <Sidebar variant="floating" collapsible="offcanvas" className="bg-[#1a1b26]">
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
                        <FileList files={files} currentFileId={currentFileId} />
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
