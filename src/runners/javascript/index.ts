import { store } from '@/store';
import { updateCodeExecutionResult } from '@/store/slices/filesSlice';
import { transform } from 'sucrase';
const worker = new Worker(new URL('./worker', import.meta.url));

function transformJavaScript(code: string): string {
  try {
    return transform(code, {
      transforms: ['typescript'],
    }).code;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return `Error: ${error.message}`;
    } else {
      return 'Unknown error';
    }
  }
}

function runJavaScript(code: string | undefined): void {
  if (!code) {
    return;
  }

  const transformedCode = transformJavaScript(code);

  worker.postMessage(transformedCode);

  worker.onmessage = function (oEvent) {
    const result = oEvent.data;

    store.dispatch(updateCodeExecutionResult(result));
  };
}

export default runJavaScript;
