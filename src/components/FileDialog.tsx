import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from './ui/alert-dialog';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFile, selectFileById, updateFile } from '@/store/slices/filesSlice';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RootState } from '@/store';
import {
    getFilenameWithExtension,
    getFilenameWithoutExtension,
    getLanguageFromFilename,
} from '@/lib/utils';

export type FileDialogType = 'edit' | 'duplicate' | 'delete';

interface FileDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    type: FileDialogType;
    fileId: string;
}

const FileDialog: React.FC<FileDialogProps> = ({ isOpen, onOpenChange, type, fileId }) => {
    const dispatch = useDispatch();
    const file = useSelector((state: RootState) => selectFileById(state, fileId));
    const [newFileName, setNewFileName] = useState(getFilenameWithoutExtension(file?.name || ''));
    const [newFileLanguage, setNewFileLanguage] = useState(
        getLanguageFromFilename(file?.name || ''),
    );

    useEffect(() => {
        setNewFileName(getFilenameWithoutExtension(file?.name || ''));
        setNewFileLanguage(getLanguageFromFilename(file?.name || ''));
    }, [file]);

    const handleEditFile = (e: FormEvent) => {
        e.preventDefault();
        dispatch(
            updateFile({
                id: fileId,
                changes: {
                    name: getFilenameWithExtension(newFileName, newFileLanguage),
                },
            }),
        );
        onOpenChange(false);
    };

    const DeleteDialog = useMemo(() => {
        const handleDeleteFile = () => {
            dispatch(deleteFile(fileId));
            onOpenChange(false);
            toast('File deleted successfully');
        };

        return (
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    <span>
                        This action cannot be undone. This will permanently delete the file.
                    </span>
                    <p>{JSON.stringify(file)}</p>
                    {fileId}
                    <p></p>
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteFile}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        );
    }, [fileId]);

    const EditFileDialog = useMemo(() => {
        // note: how we can simplify the condition. Too many conditions can be hard to read.
        const disabledActionButton =
            (newFileName.trim() === '' ||
                newFileName === '' ||
                newFileName.trim().toLowerCase() ===
                    getFilenameWithoutExtension(file?.name || '')
                        .trim()
                        .toLowerCase()) &&
            newFileLanguage === getLanguageFromFilename(file?.name || '');

        return (
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit File</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    <form onSubmit={handleEditFile}>
                        <div className="flex items-center space-x-2">
                            <div className="grap-2 grid flex-1">
                                <div>
                                    <label>New File Name</label>
                                    <Input
                                        value={newFileName}
                                        onChange={(e) => setNewFileName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>Language</label>
                                    <Select
                                        onValueChange={setNewFileLanguage}
                                        defaultValue={newFileLanguage}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="select new file language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="javascript">JavaScript</SelectItem>
                                            <SelectItem value="typescript">TypeScript</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </form>
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleEditFile} disabled={disabledActionButton}>
                        Save
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        );
    }, [file, newFileLanguage, newFileName]);

    const renderDialogContent = useMemo(() => {
        switch (type) {
            case 'edit':
                return EditFileDialog;
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
                return DeleteDialog;
        }
    }, [type, EditFileDialog, DeleteDialog]);

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            {renderDialogContent}
        </AlertDialog>
    );
};

export default FileDialog;
