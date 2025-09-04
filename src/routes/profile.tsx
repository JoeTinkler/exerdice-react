import { Avatar } from "@components/Avatar";
import { GlobalStyle } from "@components/Global";
import { NavBar } from "@components/NavBar";
import { Header } from "@components/ui/common/Header";
import { Card, CardTitle } from "@components/ui/Card";
import { Input, Select, Slider } from "@components/ui/Form";
import { Row } from "@components/ui/common/Layout";
import { RouteWrapper } from "@components/ui/common/Route";
import { Label } from "@components/ui/common/Text";
import { ProfileContext } from "@providers/profile";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AvatarUrlDialog } from "@components/AvatarUrlDialog";
import { ThemeContext } from "@providers/theme";
import { ActivityTypes } from "@components/activity/ActivityTypes";
import { SQLocalFileCard } from "@components/SQLocalFileCard";

const ProfilePicWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ChangePhoto = styled.button`
  background: #333;
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    background: #444;
  }
`;

const SliderContainer = styled.div`
  margin: 15px 0;
`;

export const ProfileRoute: React.FC = () => {
  const { profile, updateProfile } = useContext(ProfileContext);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const { colour, setColour, theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <GlobalStyle />
      <RouteWrapper>
        <Row>
          <Header>Profile Settings</Header>
        </Row>

        <Card>
          <CardTitle>Personal Information</CardTitle>
          <Label>Full Name</Label>
          <Input value={profile.name} placeholder="Sam Jogsalot" />

          <Label>Email Address</Label>
          <Input value={profile.email} placeholder="s.jogsalot@exerdice.app" />

          <Label>Profile Picture</Label>
          <ProfilePicWrapper onClick={() => setIsAvatarDialogOpen(true)}>
            <Avatar />
            <ChangePhoto>Change Photo</ChangePhoto>
          </ProfilePicWrapper>
        </Card>

        <Card>
          <CardTitle>Dice Settings</CardTitle>
          <Label>Modifier Dice Size</Label>
          <Input type="number" value={profile.modifierDiceSize} onChange={(e) => updateProfile({ modifierDiceSize: parseInt(e.target.value) })} />

          <Label>Activity Dice Size</Label>
          <Input type="number" value={profile.exerciseDiceSize} onChange={(e) => updateProfile({ exerciseDiceSize: parseInt(e.target.value) })} />
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

      </RouteWrapper>
      <AvatarUrlDialog isOpen={isAvatarDialogOpen} onClose={() => setIsAvatarDialogOpen(false)} />
      <NavBar />
    </>
  );
}