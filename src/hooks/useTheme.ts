import { useEffect, useState } from "react";
import themes from "../components/styles/Themes";
import { setToLS, getFromLS } from "../utils/storage";
import { DefaultTheme } from "styled-components";

export const useTheme = () => {
  const [theme, setTheme] = useState<DefaultTheme>(themes.dark);
  const [themeLoaded, setThemeLoaded] = useState(false);

  const setMode = (mode: DefaultTheme) => {
    setToLS("tsn-theme", mode.name);
    setTheme(mode);
  };

  useEffect(() => {
    const localThemeName = getFromLS("tsn-theme");
    // Check if localThemeName exists AND if it is a valid key in our current themes object
    if (localThemeName && themes[localThemeName]) {
      setTheme(themes[localThemeName]);
    } else {
      // Fallback to dark if storage has invalid/old theme
      setTheme(themes.dark);
    }
    setThemeLoaded(true);
  }, []);

  return { theme, themeLoaded, setMode };
};
