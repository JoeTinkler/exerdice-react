import { ReactRenderer } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { ThemeName, Themes } from '@themes/theme';
import { PartialStoryFn } from 'storybook/internal/csf';

const getTheme = (themeName: ThemeName) => {
  return Themes[themeName];
};

export default (Story: PartialStoryFn<ReactRenderer, any>, context: any) => (
  <ThemeProvider theme={getTheme(context.globals.theme)}>
    <Story />
  </ThemeProvider>
)