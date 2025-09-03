import type { Meta, StoryObj } from "@storybook/react";
import globalDecorator from "@stories/helpers/globalDecorator";
import { Today } from "@components/Today";

const meta = {
  title: "Today",
  component: Today,
  decorators: [globalDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Today>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  },
};
