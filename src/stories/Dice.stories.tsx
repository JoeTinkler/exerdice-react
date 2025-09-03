import type { Meta, StoryObj } from "@storybook/react";
import globalDecorator from "@stories/helpers/globalDecorator";
import { Dice} from "@components/ui/Dice";

const meta = {
  title: "Dice",
  component: Dice,
  decorators: [globalDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Dice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '1',
  },
};

export const D20: Story = {
  args: {
    $shape: 'd20',
    children: '1',
  },
};

export const D8: Story = {
  args: {
    $shape: 'd8',
    children: '1',
  },
};

export const D6: Story = {
  args: {
    $shape: 'd6',
    children: '1',
  },
};

export const D4: Story = {
  args: {
    $shape: 'd4',
    children: '1',
  },
};
