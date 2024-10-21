import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string | undefined;
  onChange?: (code: string | undefined) => void;
}

function CodeEditor({ code, onChange }: CodeEditorProps) {
  return (
    <Editor
      value={code}
      onChange={onChange}
      width="100%"
      height="100%"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      theme="vs-dark"
    />
  );
}

export default CodeEditor;
