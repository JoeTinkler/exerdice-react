import type { Meta, StoryObj } from "@storybook/react";
import globalDecorator from "@stories/helpers/globalDecorator";
import { Label } from "@components/ui/common/Text";

const meta = {
  title: "Common/Label",
  component: Label,
  decorators: [globalDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Label",
  },
};
