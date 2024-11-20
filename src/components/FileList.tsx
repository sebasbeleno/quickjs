import React from 'react';
import { File as FileIcon } from 'lucide-react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
import { File, setCurrentFileId } from '@/store/slices/filesSlice';
import { useDispatch } from 'react-redux';

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
                    </SidebarMenuItem>
                );
            })}
        </SidebarMenu>
    );
};

export default FileList;
