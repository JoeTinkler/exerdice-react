import type { Meta, StoryObj } from "@storybook/react";
import globalDecorator from "@stories/helpers/globalDecorator";
import { Card, CardTitle } from "@components/ui/Card";
import { Paragraph } from "@components/ui/common/Text";

const meta = {
  title: "Card",
  component: Card,
  decorators: [globalDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (<>
      <CardTitle>Card Title</CardTitle>
      <Paragraph>Card Content</Paragraph>
    </>),
  },
};
