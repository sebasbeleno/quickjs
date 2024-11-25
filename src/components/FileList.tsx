import React from 'react';
import { File as FileIcon, MoreHorizontal } from 'lucide-react';
import { SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
import { File, setCurrentFileId } from '@/store/slices/filesSlice';
import { useDispatch } from 'react-redux';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
} from './ui/dropdown-menu';

interface FileListProps {
    files: File[];
    currentFileId: string;
}

const FileList: React.FC<FileListProps> = ({ files, currentFileId }) => {
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
                                <DropdownMenuLabel>
                                    File actions
                                </DropdownMenuLabel>
                                <DropdownMenuItem disabled>
                                    <div className='flex justify-between w-full items-center'>
                                        <span>Share</span>
                                        <span className='text-[10px] bg-yellow-200 rounded-md px-2 text-yellow-950'>Soon</span>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='cursor-pointer'>
                                    <span>
                                        Rename
                                    </span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='cursor-pointer'>
                                    <span>
                                        Duplicate
                                    </span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='cursor-pointer'>
                                    <span className='text-red-500'>
                                        Delete
                                    </span>
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
