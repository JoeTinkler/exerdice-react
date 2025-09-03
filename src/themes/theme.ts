import dark from './dark.json';
import light from './light.json';

export type ThemeName = 'dark' | 'light';
export const Themes: Record<Theme, ThemeOptions> = {
  dark,
  light
};