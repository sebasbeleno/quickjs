import { EditorTheme } from '@/config/themeOptions';
import { selectCurrentFile } from '@/store/slices/filesSlice';
import Editor from '@monaco-editor/react';
import { useSelector } from 'react-redux';

interface CodeEditorProps {
    theme: EditorTheme;
}

function ExecutionResult({ theme }: CodeEditorProps) {
    const currentFile = useSelector(selectCurrentFile);

    return (
        <Editor
            value={currentFile ? currentFile.content : ''}
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
