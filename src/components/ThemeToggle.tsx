import React, { useContext } from "react";
import styled, { useTheme } from "styled-components";
import { themeContext } from "../App";
import themes from "./styles/Themes";

const ToggleBtn = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: #8B5CF6;
  border: none;
  border-radius: 8px; /* Square with slight radius as per "50px square" */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); /* Synced time with morph */
  padding: 0;
  outline: none; /* Remove focus rectangle */
  -webkit-tap-highlight-color: transparent; /* Remove mobile touch rectangle */

  &:focus {
    outline: none;
  }

  &:hover {
    box-shadow: 0 0 15px #10B981; /* Green glow */
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 24px;
    height: 24px;
    fill: none;
    stroke: none;
  }

  /* Sun beams */
  .sun-beams {
    stroke: #FCD34D;
    stroke-width: 2px;
    stroke-linecap: round;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center center;
  }

  /* Main body (Sun/Moon) */
  .sun-moon-body {
    fill: #F5F5F5;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Dark Theme State (Moon) */
  &.dark-theme .sun-beams {
    transform: rotate(45deg) scale(0.5);
    opacity: 0;
  }
`;

const ThemeToggle: React.FC = () => {
  const themeSwitcher = useContext(themeContext);
  const theme = useTheme(); // Access the ACTUAL current theme from ThemeProvider
  const isDark = theme.name === 'dark';

  const handleToggle = () => {
    const newTheme = isDark ? themes.light : themes.dark;
    themeSwitcher?.(newTheme);
    console.log(`[theme] Switched to ${newTheme.name} mode`);
  };

  return (
    <ToggleBtn
      onClick={handleToggle}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={isDark ? "dark-theme" : "light-theme"}
      aria-label="Toggle theme"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <mask id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx={isDark ? "17" : "24"} cy="10" r="6" fill="black" style={{ transition: "cx 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }} />
        </mask>

        <circle
          className="sun-moon-body"
          cx="12" cy="12" r={isDark ? "5" : "5"}
          mask="url(#moon-mask)"
          fill="currentColor"
        />

        <g className="sun-beams" stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </ToggleBtn>
  );
};

export default ThemeToggle;
