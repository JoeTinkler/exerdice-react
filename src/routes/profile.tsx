import { Avatar } from "@components/Avatar";
import { Header } from "@components/ui/common/Header";
import { Card, CardTitle } from "@components/ui/Card";
import { Input, Select, Slider } from "@components/ui/Form";
import { Row } from "@components/ui/common/Layout";
import { Label, Paragraph } from "@components/ui/common/Text";
import { ProfileContext } from "@providers/profile";
import React, { useContext, useState } from "react";
import { AvatarUrlDialog } from "@components/AvatarUrlDialog";
import { ThemeContext } from "@providers/theme";
import { ActivityTypes } from "@components/activity/ActivityTypes";
import { SQLocalFileCard } from "@components/SQLocalFileCard";
import { Modal } from "@components/Modal";
import { SliderContainer, ProfilePicWrapper, ChangePhoto, WarningIcon } from "@components/ui/routes/Profile";
import { Toggle } from "@components/form/Toggle";

const DICE_SIZES = [2,4,6,8,10,12,20];

const timeToOffset = (time: string) => {
  if(!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)) {
    return 0;
  }
  const hours = parseInt(time.substring(0, 2));
  const minutes = parseInt(time.substring(3, 5));
  return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
}

const offsetToTime = (offset?: number) => {
  if (!offset) {
    return '00:00';
  }
  const hours = Math.floor(offset / (60 * 60 * 1000));
  const minutes = Math.floor((offset % (60 * 60 * 1000)) / (60 * 1000));
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

export const ProfileRoute: React.FC = () => {
  const { profile, updateProfile } = useContext(ProfileContext);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const { colour, setColour, theme, setTheme } = useContext(ThemeContext);
  const [isWarningOpen, setIsWarningOpen] = useState(false);

  return (
    <>
      <Row>
        <Header>Profile Settings</Header>
      </Row>

      <Card>
        <CardTitle>Personal Information</CardTitle>
        <Label>Full Name</Label>
        <Input value={profile.name} placeholder="Sam Jogsalot" onChange={(e) => updateProfile({ name: e.target.value })} />

        <Label>Email Address</Label>
        <Input value={profile.email} placeholder="s.jogsalot@exerdice.app" onChange={(e) => updateProfile({ email: e.target.value })} />

        <Label>Profile Picture</Label>
        <ProfilePicWrapper onClick={() => setIsAvatarDialogOpen(true)}>
          <Avatar />
          <ChangePhoto>Change Photo</ChangePhoto>
        </ProfilePicWrapper>
      </Card>

      <Card>
        <CardTitle>Dice Settings</CardTitle>
        <Label>Modifier Dice Size</Label>
        <Select
          value={profile.modifierDiceSize}
          onChange={(e) => updateProfile({ modifierDiceSize: parseInt(e.target.value) })}
        >
          {DICE_SIZES.map((size) => (<option value={size}>{size}</option>))}
        </Select>

        <Label>Activity Dice Size</Label>
        <Select
          value={profile.exerciseDiceSize}
          onChange={(e) => updateProfile({ exerciseDiceSize: parseInt(e.target.value) })}
        >
          {DICE_SIZES.map((size) => (<option value={size}>{size}</option>))}
        </Select>

        <Label>3D Dice</Label>
        <Toggle checked={profile.show3dDice} onChange={(checked) => updateProfile({ show3dDice: checked})} />
      </Card>

      <Card>
        <CardTitle>Activity Goals</CardTitle>
        <Label>Weekly Rest Days ({profile.weeklyRestDays})</Label>
        <SliderContainer>
          <Slider
            type="range"
            min="0"
            max="7"
            value={profile.weeklyRestDays}
            onChange={(e) => updateProfile({ weeklyRestDays: parseInt(e.target.value) })}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Advanced</span>
            <span>Beginner</span>
          </div>
        </SliderContainer>

        <Label onClick={() => setIsWarningOpen(true)}>Start of Day <WarningIcon /></Label>
        <Input type="time" value={offsetToTime(profile.startOfDayOffset)} onChange={(e) => updateProfile({ startOfDayOffset: timeToOffset(e.target.value)})} />
      </Card>

      <ActivityTypes />

      <Card>
        <CardTitle>Theme Options</CardTitle>
        <Label>Theme</Label>
        <Select value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </Select>

        <Label>Colour</Label>
        <Input type="color" value={colour} onChange={(e) => setColour(e.target.value)} />
      </Card>

      <SQLocalFileCard />

      <AvatarUrlDialog isOpen={isAvatarDialogOpen} onClose={() => setIsAvatarDialogOpen(false)} />
      <Modal isOpen={isWarningOpen} onClose={() => setIsWarningOpen(false)}>
        <Paragraph>Warning! Changing start of day could move some rolls and exercises to different days. It is not recommended to change if you already have a lot of logs</Paragraph>
      </Modal>
    </>
  );
}