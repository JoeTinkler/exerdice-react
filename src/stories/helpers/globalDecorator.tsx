import { PartialStoryFn } from 'storybook/internal/csf';
import { ReactRenderer } from '@storybook/react';
import { GlobalStyle } from '@components/Global';

export default (Story: PartialStoryFn<ReactRenderer, any>) => (
  <>
    <GlobalStyle />
    <Story />
  </>
)