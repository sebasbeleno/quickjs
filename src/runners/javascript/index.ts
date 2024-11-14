import { transform } from "sucrase";

type evaluationResult = (string | undefined)[];

function transformJavaScript(code: string): string {
  try {
    return transform(code, {
      transforms: ["typescript"],
    }).code;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return `Error: ${error.message}`;
    } else {
      return "Unknown error";
    }
  }
}

async function runJavaScript(code: string | undefined): Promise<evaluationResult> {
  if (!code) {
    return [];
  }

  const transformedCode = transformJavaScript(code);
  const lines = transformedCode.split("\n");
  const results: evaluationResult = new Array(lines.length).fill(undefined);
  const promises = []; // Array to store promises from async calls

  // Wrap each console.log with a line number
  const wrappedCodeCustomLog = lines
    .map((line, index) =>
      line.replace(/console\.log\((.*)\)/g, `customLog(${index}, $1)`)
    )
    .join("\n");


  const customLog = (lineIndex: number, ...args: never[]) => {
    const formattedValue = args
      .map((arg) =>
        typeof arg === "object" ? JSON.stringify(arg) : String(arg)
      )
      .join(" ");

    if (results[lineIndex] === undefined) {
      results[lineIndex] = formattedValue + " ";
    } else {
      results[lineIndex] += formattedValue + " ";
    }
  };

  try {
    const executionPromise = new Function(
      "customLog",
      `return (async () => { ${wrappedCodeCustomLog} })()`
    )(customLog);

    promises.push(executionPromise);

    // Wait for all promises to resolve, including async calls within the code
    await Promise.all(promises);
  } catch (error) {
    if (error instanceof Error) {
      results[results.length - 1] = `Error: ${error.message}`;
    } else {
      results[results.length - 1] = "Unknown error";
    }
  }

  return results;

}

export default runJavaScript;
