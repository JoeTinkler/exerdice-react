import type { Meta, StoryObj } from "@storybook/react";
import globalDecorator from "@stories/helpers/globalDecorator";
import { Calendar } from "@components/Calendar";

const meta = {
  title: "Calendar",
  component: Calendar,
  decorators: [globalDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    day: new Date().getDate(),
    onSelect: () => console.info('Selected')
  },
};
