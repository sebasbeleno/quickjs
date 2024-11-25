import React from 'react';
import { File as FileIcon, MoreHorizontal } from 'lucide-react';
import { SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
import { File, selectNumberOfFiles, setCurrentFileId } from '@/store/slices/filesSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
} from './ui/dropdown-menu';
import { FileDialogType } from './FileDialog';

interface FileListProps {
    files: File[];
    currentFileId: string;
    openDialog: (fileId: string, type: FileDialogType) => void;
}

const FileList: React.FC<FileListProps> = ({ files, currentFileId, openDialog }) => {
    const numberOfFiles = useSelector(selectNumberOfFiles);
    const dispatch = useDispatch();

    return (
        <SidebarMenu>
            {files.map(({ id, name }) => {
                const isActive = id === currentFileId;

                return (
                    <SidebarMenuItem key={id}>
                        <SidebarMenuButton
                            asChild
                            onClick={() => {
                                dispatch(setCurrentFileId(id));
                            }}
                            isActive={isActive}
                            className="cursor-pointer"
                        >
                            <div>
                                <FileIcon />
                                <span>{name}</span>
                            </div>
                        </SidebarMenuButton>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuAction>
                                    <MoreHorizontal />
                                </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>File actions</DropdownMenuLabel>
                                <DropdownMenuItem disabled>
                                    <div className="flex w-full items-center justify-between">
                                        <span>Share</span>
                                        <span className="rounded-md bg-yellow-200 px-2 text-[10px] text-yellow-950">
                                            Soon
                                        </span>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => {
                                        openDialog(id, 'edit');
                                    }}
                                >
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => {
                                        openDialog(id, 'duplicate');
                                    }}
                                >
                                    <span>Duplicate</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => {
                                        openDialog(id, 'delete');
                                    }}
                                    disabled={numberOfFiles === 1}
                                >
                                    <span className="text-red-500">Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                );
            })}
        </SidebarMenu>
    );
};

export default FileList;
