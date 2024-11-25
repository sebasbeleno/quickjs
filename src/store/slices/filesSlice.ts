import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getRandomFileId } from '@/lib/utils';

export interface File {
    id: string;
    name: string;
    content: string;
}

const filesAdapter = createEntityAdapter<File>({});

const initialState = filesAdapter.getInitialState({
    ids: ['1'],
    currentFile: { id: '1', codeExecutionResult: 'Hello, world!' },
    isLoading: false,
    entities: {
        '1': {
            id: '1',
            name: 'index.js',
            content: 'console.log("Hello, world!")',
        },
    },
});

export const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        addFile: filesAdapter.addOne,
        updateFile: filesAdapter.updateOne,
        removeFile: filesAdapter.removeOne,

        setCurrentFileId(state, action: PayloadAction<string>) {
            state.currentFile.id = action.payload;
        },

        updateFileContent(state, action: PayloadAction<{ id: string; content: string }>) {
            const { id, content } = action.payload;
            const file = state.entities[id];
            if (file) {
                file.content = content;
            }
        },

        updateCodeExecutionResult(state, action: PayloadAction<string>) {
            state.currentFile.codeExecutionResult = action.payload;
        },

        updateFileName(state, action: PayloadAction<{ id: string; name: string }>) {
            const { id, name } = action.payload;
            const file = state.entities[id];
            if (file) {
                file.name = name;
            }
        },

        duplicateFile(state, action: PayloadAction<string>) {
            const file = state.entities[action.payload];
            if (file) {
                const id = getRandomFileId();
                const name = `copy_of_${file.name}`;

                filesAdapter.addOne(state, { ...file, id, name });
            }
        },

        deleteFile(state, action: PayloadAction<string>) {
            filesAdapter.removeOne(state, action.payload);
        },
    },
});

export const {
    addFile,
    updateFile,
    setCurrentFileId,
    updateFileContent,
    updateCodeExecutionResult,
    updateFileName,
    duplicateFile,
    deleteFile,
} = filesSlice.actions;

export const {
    selectIds: selectFileIds,
    selectById: selectFileById,
    selectAll: selectAllFiles,
} = filesAdapter.getSelectors((state: RootState) => state.files);

export const selectCurrentFile = createSelector(
    (state: RootState) => state,
    (state: RootState) => state.files.currentFile.id,
    (state, fileId) => selectFileById(state, fileId),
);

export const selectNumberOfFiles = createSelector(selectFileIds, (ids) => ids.length);

export default filesSlice.reducer;
