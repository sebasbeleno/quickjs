import React, { useMemo } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
} from './ui/alert-dialog';
import { useDispatch } from 'react-redux';
import { deleteFile } from '@/store/slices/filesSlice';
import { toast } from 'sonner';

export type FileDialogType = 'rename' | 'duplicate' | 'delete';

interface FileDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    type: FileDialogType;
    fileId: string;
}

const FileDialog: React.FC<FileDialogProps> = ({ isOpen, onOpenChange, type, fileId }) => {
    const dispatch = useDispatch();

    const handleDeleteFile = () => {
        dispatch(deleteFile(fileId));
        onOpenChange(false);
        toast('File deleted successfully');
    };

    const DeleteDialog = () => {
        return (
            <AlertDialogContent>
                <AlertDialogHeader>Are you absolutely sure?</AlertDialogHeader>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the file.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteFile}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        );
    };

    const renderDialogContent = useMemo(() => {
        switch (type) {
            case 'rename':
                return (
                    <>
                        <span>Rename</span>
                        <span>
                            <></>
                        </span>
                    </>
                );
            case 'duplicate':
                return (
                    <>
                        <span>Duplicate</span>
                        <span>
                            <></>
                        </span>
                    </>
                );
            case 'delete':
                return <DeleteDialog />;
        }
    }, [type, fileId]);

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            {renderDialogContent}
        </AlertDialog>
    );
};

export default FileDialog;
