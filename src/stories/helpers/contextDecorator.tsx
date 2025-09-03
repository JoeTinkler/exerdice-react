import { PartialStoryFn } from 'storybook/internal/csf';
import { ReactRenderer } from '@storybook/react';
import { Context } from 'react';

export default <T,>(context: Context<T>, data: T) => {
  return (Story: PartialStoryFn<ReactRenderer, any>) => {
    return (
      <context.Provider value={data}>
        <Story />
      </context.Provider>
    );
  }
}