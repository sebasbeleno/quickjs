import { tokyoNightTheme } from "../themes/tokio";

export const themes = {
  "tokio-night": {
    name: "Tokio Night",
    config: tokyoNightTheme,
  },
} as const;

export const themeOptions = Object.entries(themes).map(([key, theme]) => ({
  value: key,
  label: theme.name,
}));

export type EditorTheme = keyof typeof themes;
