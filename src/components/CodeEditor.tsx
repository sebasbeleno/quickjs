import { EditorTheme } from "@/config/themeOptions";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string | undefined;
  onChange?: (code: string | undefined) => void;
  readOnly?: boolean;
  theme: EditorTheme;
}

function CodeEditor({ code, onChange, readOnly }: CodeEditorProps) {

  return (
    <Editor
      value={code}
      onChange={onChange}
      width="100%"
      height="100%"
      defaultLanguage="javascript"
      theme="vs-dark"
      options={{
        readOnly: readOnly,
        smoothScrolling: true,
      }}
    />
  );
}

export default CodeEditor;
