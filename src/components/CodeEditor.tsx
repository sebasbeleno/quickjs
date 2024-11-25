import { EditorTheme } from '@/config/themeOptions';
import { getLanguageFromFilename } from '@/lib/utils';
import { selectCurrentFile, updateFileContent } from '@/store/slices/filesSlice';
import Editor from '@monaco-editor/react';
import { useDispatch, useSelector } from 'react-redux';

interface CodeEditorProps {
    readOnly?: boolean;
    theme: EditorTheme;
}

function CodeEditor({ readOnly, theme }: CodeEditorProps) {
    const currentFile = useSelector(selectCurrentFile);
    const dispatch = useDispatch();

    return (
        <Editor
            value={currentFile ? currentFile.content : ''}
            onChange={(value) => {
                if (value) {
                    dispatch(updateFileContent({ id: currentFile.id, content: value }));
                }
            }}
            width="100%"
            height="100%"
            language={getLanguageFromFilename(currentFile ? currentFile.name : '')}
            theme={theme}
            options={{
                readOnly: readOnly,
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

export default CodeEditor;
