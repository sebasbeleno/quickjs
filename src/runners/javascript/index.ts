import { transform } from "sucrase";

type evaluationResult = (string | undefined)[];

function transformJavaScript(code: string): string {
  try {
    return transform(code, {
      transforms: ["typescript"],
    }).code;
  } catch (error) {
    console.error(error);
    return `Error: ${error.message}`;
  }
}

function runJavaScript(code: string | undefined): evaluationResult {
  if (!code) {
    return [];
  }

  const transformedCode = transformJavaScript(code);
  const lines = transformedCode.split("\n");
  const results: evaluationResult = new Array(lines.length).fill(undefined);

  // Wrap each console.log with a line number
  const wrappedCode = lines
    .map((line, index) =>
      line.replace(/console\.log\((.*)\)/g, `customLog(${index}, $1)`)
    )
    .join("\n");

  const customLog = (lineIndex: number, ...args: never[]) => {
    results[lineIndex] = args
      .map((arg) =>
        typeof arg === "object" ? JSON.stringify(arg) : String(arg)
      )
      .join(" ");
  };

  try {
    new Function("customLog", wrappedCode)(customLog);
  } catch (error: unknown) {
    if (error instanceof Error) {
      results[results.length - 1] = `Error: ${error.message}`;
    } else {
      results[results.length - 1] = "Unknown error";
    }
  }

  return results;

}

export default runJavaScript;