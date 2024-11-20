import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface File {
    id: string;
    name: string;
    content: string;
}

const filesAdapter = createEntityAdapter<File>({});

const initialState = filesAdapter.getInitialState({
    ids: ['1'],
    currentFileId: '1',
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
            state.currentFileId = action.payload;
        },

        updateFileContent(state, action: PayloadAction<{ id: string; content: string }>) {
            const { id, content } = action.payload;
            const file = state.entities[id];
            if (file) {
                file.content = content;
            }
        },
    },
});

export const { addFile, removeFile, updateFile, setCurrentFileId, updateFileContent } =
    filesSlice.actions;

export const {
    selectIds: selectFileIds,
    selectById: selectFileById,
    selectAll: selectAllFiles,
} = filesAdapter.getSelectors((state: RootState) => state.files);

export const selectCurrentFile = createSelector(
    (state: RootState) => state,
    (state: RootState) => state.files.currentFileId,
    (state, fileId) => selectFileById(state, fileId),
);
export default filesSlice.reducer;
