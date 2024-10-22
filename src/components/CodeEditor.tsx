import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string | undefined;
  onChange?: (code: string | undefined) => void;
  readOnly?: boolean;
}

function CodeEditor({ code, onChange, readOnly }: CodeEditorProps) {
  return (
    <Editor
      value={code}
      onChange={onChange}
      width="100%"
      height="100%"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      theme="vs-dark"
      options={{
        readOnly: readOnly,
      }}
    />
  );
}

export default CodeEditor;
