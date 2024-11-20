import { EditorTheme } from '@/config/themeOptions';
import { RootState } from '@/store';
import Editor from '@monaco-editor/react';
import { useSelector } from 'react-redux';

interface CodeEditorProps {
    theme: EditorTheme;
}

function ExecutionResult({ theme }: CodeEditorProps) {
    const currentFileExecutionResult = useSelector(
        (state: RootState) => state.files.currentFile.codeExecutionResult,
    );

    return (
        <Editor
            value={currentFileExecutionResult ? currentFileExecutionResult : ''}
            width="100%"
            height="100%"
            defaultLanguage="javascript"
            theme={theme}
            options={{
                readOnly: true,
                smoothScrolling: true,
                minimap: {
                    enabled: false,
                },
                contextmenu: false,
                scrollbar: {
                    vertical: 'hidden',
                    horizontal: 'hidden',
                },
                guides: {
                    indentation: false,
                },
            }}
        />
    );
}

export default ExecutionResult;
