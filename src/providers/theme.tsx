import { PropsWithChildren, useState } from "react";
import { createContext } from 'react';
import { Themes } from "@themes/theme";
import { ThemeProvider as ComponentsThemeProvider } from 'styled-components';

type ThemeContextData = {
  theme: Theme;
  colour: string,
  setTheme: (theme: Theme) => void;
  setColour: (colour: string) => void;
}

export const ThemeContext = createContext<ThemeContextData>({
  theme: 'light',
  colour: '',
  setTheme: () => {},
  setColour: () => {},
});

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const storedTheme = localStorage.getItem('theme') as Theme | null;
  const storedColour = localStorage.getItem('themeColour');
  const [theme, setTheme] = useState<Theme>(storedTheme ?? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  const [colour, setColour] = useState(storedColour ?? '#ff5733')
  const handleSetTheme = (theme: Theme) => {
    setTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };
  const handleSetColour = (colour: string) => {
    setColour(colour);
    localStorage.setItem('themeColour', colour);
  }

  const options: ThemeOptions = Themes[theme];
  if (colour) {
    options.highlightColour = colour;
  }

  //set the web manifest theme colour
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', (options.background ?? '#1a1a1a') as string);

  return (
  <ThemeContext.Provider value={{ theme, colour, setTheme: handleSetTheme, setColour: handleSetColour }}>
    <ComponentsThemeProvider theme={options}>
      {children}
    </ComponentsThemeProvider>
  </ThemeContext.Provider>
  );
}