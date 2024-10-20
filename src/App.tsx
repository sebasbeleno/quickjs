import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import Editor from "@monaco-editor/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen w-screen">
      <div>
        <Editor
          width="50%"
          height="100vh"
          defaultLanguage="javascript"
          defaultValue="// some comment"
        />
      </div>
    </div>
  );
}

export default App;
