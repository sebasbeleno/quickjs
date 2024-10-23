import { useCallback, useDeferredValue, useEffect, useState } from "react";
import CodeEditor from "./components/CodeEditor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import { runJavaScript } from "./runners";
import Layout from "./components/layout";
import useLocalStorage from "./hooks/use-local-storage";

const DEFAULT_FILES = {
  index: `console.log("Hello, World!")`,
};

function App() {
  const { createFile, editFile, setValue, storedValue, files } =
    useLocalStorage("files", DEFAULT_FILES);

  const [currentFile, setCurrentFile] = useState("index");

  const [code, setCode] = useState<string | undefined>(files[currentFile]);

  const [result, setResult] = useState();
  const deferredCode = useDeferredValue(code);

  const handleRunCode = useCallback(() => {
    const result = runJavaScript(code)
      .map((result) => (result !== undefined ? result : ""))
      .join("\n");

    setResult(result);
    editFile(currentFile, code);
  }, [code]);

  useEffect(() => {
    if (deferredCode !== undefined) {
      handleRunCode();
    }
  }, [deferredCode, handleRunCode]);

  useEffect(() => {
    setCode(files[currentFile]);
  }, [currentFile]);

  return (
    <Layout currentFile={currentFile} setCurrentFile={setCurrentFile}>
      <div className="w-auto">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} minSize={25} maxSize={80}>
            <div className="flex h-screen">
              <CodeEditor code={code} onChange={setCode} readOnly={false} />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          {/* <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={10} maxSize={15} minSize={10}>
            <div className="flex h-full items-center justify-center p-6">
              <ActionBar runCode={handleRunCode} />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={90}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Code output</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel> */}
          <ResizablePanel defaultSize={90}>
            <div className="flex h-full">
              <CodeEditor code={result} readOnly={true} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Layout>
  );
}

export default App;
