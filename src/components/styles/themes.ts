import { DefaultTheme } from "styled-components";

export type Themes = {
  [key: string]: DefaultTheme;
};

const theme: Themes = {
  dark: {
    id: "T_001",
    name: "dark",
    colors: {
      body: "#1b1b1b", // Deep refined dark grey ( Dashboard Bg)
      scrollHandle: "#2b2b2b",
      scrollHandleHover: "#3b3b3b",
      primary: "#3b82f6", // Vivid Dashboard Blue
      secondary: "#05CE91", // Keep green for success/secondary
      text: {
        100: "#ffffff", // Pure white for headings
        200: "#e5e7eb", // Light grey for body
        300: "#9ca3af", // Muted grey
      },
    },
  },
  light: {
    id: "T_002",
    name: "light",
    colors: {
      body: "#ffffff",
      scrollHandle: "#19252E",
      scrollHandleHover: "#162028",
      primary: "#2e05ce", // Deep Blue for primary command text
      secondary: "#ce0542", // Deep Red for secondary highlight
      text: {
        100: "#000000", // Pure black for main text
        200: "#333333", // Dark grey for subtext
        300: "#555555",
      },
    },
  },
};

export default theme;
