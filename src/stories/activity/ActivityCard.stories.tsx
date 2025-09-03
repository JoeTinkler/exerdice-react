import type { Meta, StoryObj } from "@storybook/react";
import globalDecorator from "@stories/helpers/globalDecorator";
import contextDecorator from "@stories/helpers/contextDecorator";
import { Activity } from "@db/schema";
import { ActivityCard } from "@components/activity/ActivityCard";
import { SQLocalContext } from "@providers/sqLocal";

const meta = {
  title: "Activity/Activity Card",
  component: ActivityCard,
  decorators: [globalDecorator, contextDecorator(SQLocalContext, { initialized: true })],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ActivityCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const activity: Activity = {
  id: 1,
  timestamp: new Date().getTime(),
  type: 1,
  minutes: 10,
  intensity: 3,
  calories: 400,
  distance: 4.5,
  notes: 'Activity notes'
};

export const Default: Story = {
  args: {
    activity,
  },
};
