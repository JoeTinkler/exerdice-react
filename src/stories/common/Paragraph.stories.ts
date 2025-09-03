import type { Meta, StoryObj } from "@storybook/react";
import globalDecorator from "@stories/helpers/globalDecorator";
import { Paragraph } from "@components/ui/common/Text";

const meta = {
  title: "Common/Paragraph",
  component: Paragraph,
  decorators: [globalDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Paragraph",
  },
};
