import type { Meta, StoryObj } from "@storybook/react";
import globalDecorator from "../helpers/globalDecorator";
import { Modal } from "@components/Modal";

const meta = {
  title: "Common/Modal",
  component: Modal,
  decorators: [globalDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => { console.info("close") },
    children: "Modal content",
  },
};
