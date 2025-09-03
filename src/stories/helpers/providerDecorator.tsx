import { PartialStoryFn } from 'storybook/internal/csf';
import { ReactRenderer } from '@storybook/react';
import { PropsWithChildren } from 'react';

export default (Provider: React.FC<PropsWithChildren>) => {
  return (Story: PartialStoryFn<ReactRenderer, any>) => {
    return (
      <Provider>
        <Story />
      </Provider>
    );
  }
}