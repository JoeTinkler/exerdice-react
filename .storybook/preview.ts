import type { Preview } from '@storybook/react';
import ThemeDecorator from '../src/stories/helpers/themeDecorator';

const preview: Preview  = {
  decorators: [ThemeDecorator],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        // The label to show for this toolbar item
        title: 'Theme',
        icon: 'circlehollow',
        // Array of plain string values or MenuItem shape (see below)
        items: ['dark', 'light'],
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
       expanded: true ,
    },
  },
  loaders: [],
};

export default preview;
