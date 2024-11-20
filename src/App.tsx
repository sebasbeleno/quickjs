import { useEffect } from 'react';
import CodeEditor from './components/CodeEditor';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable';
import Layout from './components/layout';
import { useMonaco } from '@monaco-editor/react';
import { tokyoNightTheme } from './themes/tokio';
import { EditorTheme } from './config/themeOptions';
import { Provider } from 'react-redux';
import { store } from './store';
import ExecutionResult from './components/ExecutionResult';

function App() {
    const monaco = useMonaco();

    const theme: EditorTheme = 'tokio-night';

    // set the theme for the code editor.
    useEffect(() => {
        if (monaco) {
            monaco.editor.defineTheme('tokio-night', tokyoNightTheme);
            monaco.editor.setTheme('tokio-night');
        }
    }, [monaco]);

    return (
        <Provider store={store}>
            <Layout>
                <div className="w-auto">
                    <ResizablePanelGroup direction="horizontal">
                        <ResizablePanel defaultSize={50} minSize={50} maxSize={80}>
                            <div className="flex h-screen">
                                <CodeEditor theme={theme} />
                            </div>
                        </ResizablePanel>
                        <ResizableHandle />

                        <ResizablePanel defaultSize={50}>
                            <div className="flex h-full">
                                <ExecutionResult theme={theme} />
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>
            </Layout>
        </Provider>
    );
}

export default App;
