import type { Meta, StoryObj } from "@storybook/react";
import globalDecorator from "@stories/helpers/globalDecorator";
import { DaySummary } from "@components/DaySummary";
import { Activity } from "@db/schema";
import { DayRollState } from "@hooks/useTodaysRoll";

const meta = {
  title: "Activity/Day Summary",
  component: DaySummary,
  decorators: [globalDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DaySummary>;

export default meta;
type Story = StoryObj<typeof meta>;

const activities: Activity[] = [
  {
    id: 1,
    timestamp: new Date().getTime(),
    type: 1,
    minutes: 10,
    intensity: 3,
    calories: 400,
    distance: 4.5,
    notes: 'Activity notes'
  },
  {
    id: 2,
    timestamp: new Date().getTime(),
    type: 2,
    minutes: 10,
    intensity: 3,
    calories: 400,
    distance: 4.5,
    notes: 'Activity notes'
  }
];

const roll: DayRollState = {
  timestamp: new Date().getTime(),
  modifierRoll: {
    value: 4,
    max: 4
  },
  activityRolls: [
    { value: 1, max: 20 },
    { value: 2, max: 20 },
    { value: 3, max: 20 },
    { value: 4, max: 20 }
  ]
};

export const Default: Story = {
  args: {
    date: new Date().toLocaleDateString(),
    activities,
    roll
  },
};
