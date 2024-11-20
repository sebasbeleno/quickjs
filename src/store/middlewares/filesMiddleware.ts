import { createListenerMiddleware, isAnyOf, TypedStartListening } from '@reduxjs/toolkit';
import {
    addFile,
    File,
    selectAllFiles,
    setCurrentFileId,
    updateCodeExecutionResult,
    updateFileContent,
} from '../slices/filesSlice';
import { AppDispatch, RootState } from '..';
import { runJavaScript } from '@/runners';
import * as idb from '@/lib/indexDB';

export const fileListenerMiddleware = createListenerMiddleware();

type AppStartListening = TypedStartListening<RootState, AppDispatch>;

const startAppListening = fileListenerMiddleware.startListening as AppStartListening;

// This middleware listens for changes to the file content and the current file ID and runs the JavaScript code when the content changes or the current file ID changes.
startAppListening({
    matcher: isAnyOf(updateFileContent, setCurrentFileId, addFile),
    effect: async (action, listenerApi) => {
        // code runner
        if (updateFileContent.match(action)) {
            const result = await runJavaScript(action.payload.content);

            const resultString = result.join('\n');
            listenerApi.dispatch(updateCodeExecutionResult(resultString));
        } else if (setCurrentFileId.match(action)) {
            const currentFileId = action.payload;
            const fileContent = listenerApi.getState().files.entities[currentFileId]?.content;

            if (fileContent) {
                const result = await runJavaScript(fileContent);

                const resultString = result.join('\n');
                listenerApi.dispatch(updateCodeExecutionResult(resultString));
            }
        }

        // indexdb
        // const files: File[] = selectAllFiles(listenerApi.getState());
        // await idb.set('files', files);
    },
});
