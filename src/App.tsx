import { useEffect, useState } from "react";
import CodeEditor from "./components/CodeEditor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import { runJavaScript } from "./runners";
import Layout from "./components/layout";
import useLocalStorage from "./hooks/use-local-storage";
import { useMonaco } from "@monaco-editor/react";
import { tokyoNightTheme } from "./themes/tokio";
import { EditorTheme } from "./config/themeOptions";

const DEFAULT_FILES = {
  index: `console.log("Hello, World!")`,
};

function App() {
  const monaco = useMonaco();

  const { editFile, files } = useLocalStorage("files", DEFAULT_FILES);
  const [currentFile, setCurrentFile] = useState("index");
  const [code, setCode] = useState<string | undefined>(files[currentFile]);
  const [result, setResult] = useState<string | undefined>();
  const theme: EditorTheme = "tokio-night";

  useEffect(() => {
    if (!code) {
      return;
    }

    const result = runJavaScript(code)
      .map((result) => (result !== undefined ? result : ""))
      .join("\n");

    setResult(result);
    editFile(currentFile, code || "");
  }, [code]);

  // set the code when the current file changes.
  useEffect(() => {
    setCode(files[currentFile]);
  }, [currentFile, files]);

  // set the theme for the code editor.
  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("tokio-night", tokyoNightTheme);
      monaco.editor.setTheme("tokio-night");
    }
  }, [monaco]);

  return (
    <Layout currentFile={currentFile} setCurrentFile={setCurrentFile}>
      <div className="w-auto">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} minSize={50} maxSize={80}>
            <div className="flex h-screen">
              <CodeEditor
                code={code}
                onChange={setCode}
                readOnly={false}
                theme={theme}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle />

          <ResizablePanel defaultSize={50}>
            <div className="flex h-full">
              <CodeEditor code={result} readOnly={true} theme={theme} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Layout>
  );
}

export default App;
