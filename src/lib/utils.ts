import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const languageToExtension: Record<string, string> = {
  javascript: "js",
  typescript: "ts",
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFilenameWithExtension(filename: string, language: string) {
  const extension = languageToExtension[language] || "txt";
  return `${filename}.${extension}`;
}

export function getLanguageFromFilename(filename: string) {
  const extension = filename.split(".").pop();
  return (
    Object.entries(languageToExtension).find(
      ([, ext]) => ext === extension
    )?.[0] || "plaintext"
  );
}

export function getFilenameWithoutExtension(filename: string) {
  return filename.split(".").slice(0, -1).join(".");
}

export function getRandomFileId() {
  return crypto.randomUUID();
}