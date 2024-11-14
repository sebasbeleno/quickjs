import { EditorTheme } from "@/config/themeOptions";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string | undefined;
  onChange?: (code: string | undefined) => void;
  readOnly?: boolean;
  theme: EditorTheme;
}

function CodeEditor({ code, onChange, readOnly, theme }: CodeEditorProps) {

  return (
    <Editor
      value={code}
      onChange={onChange}
      width="100%"
      height="100%"
      defaultLanguage="javascript"
      theme={theme}
      options={{
        readOnly: readOnly,
        smoothScrolling: true,
        minimap: {
          enabled: false,
        },
        contextmenu: false,
        scrollbar: {
          vertical: "hidden",
          horizontal: "hidden",
        },
        guides: {
          indentation: false,
        }
      }}
    />
  );
}

export default CodeEditor;
