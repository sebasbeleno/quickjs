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
import FileDialog, { FileDialogType } from './FileDialog';

// TODO: Make files list component
export function AppSidebar() {
    const files: File[] | null = useSelector(selectAllFiles);
    const currentFileId = useSelector((state: RootState) => state.files.currentFile.id);

    const [isNewFileDialogOpen, setIsNewFileDialogOpen] = useState(false);
    const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
    const [fileDialogType, setFileDialogType] = useState<FileDialogType>('delete');
    const [fileDialogFileId, setFileDialogFileId] = useState('');

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
        setIsNewFileDialogOpen(false);
    };

    const openFileDialog = (fileId: string, type: FileDialogType) => {
        setFileDialogType(type);
        setFileDialogFileId(fileId);
        setIsFileDialogOpen(true);
    };

    return (
        <Sidebar variant="floating" collapsible="offcanvas" className="bg-[#1a1b26]">
            <SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupLabel asChild>Projects</SidebarGroupLabel>
                    <SidebarGroupAction asChild title="Add Project">
                        <Dialog open={isNewFileDialogOpen} onOpenChange={setIsNewFileDialogOpen}>
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
                        <FileList files={files} currentFileId={currentFileId} openDialog={openFileDialog} />
                        <FileDialog
                            type={fileDialogType}
                            isOpen={isFileDialogOpen}
                            onOpenChange={setIsFileDialogOpen}
                            fileId={fileDialogFileId}
                        />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <span className='text-sm text-neutral-500'>
                    Early Version - v0.1.0 web
                </span>
            </SidebarFooter>
        </Sidebar>
    );
}
