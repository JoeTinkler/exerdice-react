import React, { useContext, useState } from "react";
import ChartIcon from "@assets/icons/bar-chart.svg?react";
import MedalIcon from "@assets/icons/trophy.svg?react";
import DiceIcon from "@assets/icons/d20.svg?react";
import { Action, BottomBar, Content, CTA, ExerdiceHero, HeroCard, Subtitle, Title, ActionIcon, Caption } from "@components/ui/routes/Landing";
import { ProfileContext } from "@providers/profile";
import { ToastContext } from "@components/toast/provider";
import styled from "styled-components";

const Combo = styled.div`
  position: fixed;
  top: 2px;
  right: 2px;
  font-size: 5px;
  z-index: 999;
  color: ${({ theme }) => theme.secondaryColour};
`;

export const LandingRoute: React.FC = () => {
  const [combo, setCombo] = useState('');
  const { updateProfile, profile } = useContext(ProfileContext);
  const { addToast } = useContext(ToastContext);

  const onCombo = (action: 'h' | 'l' | 'c' | 'r' | 's') => {
    setCombo(combo + action);
    if (combo + action === 'hhhhhcclrlrs' && !profile.developer) {
      updateProfile({ developer: true });
      addToast('You are now a developer', 'success');
    }
  }

  return (
    <>
      <Combo>{combo}</Combo>
      <HeroCard onClick={() => onCombo('h')}>
        <ExerdiceHero $animate={combo.startsWith('hhhhh')} />
      </HeroCard>

      <Content>
        <Title>Exercise Time Tracker</Title>
        <Subtitle>
          Let the dice decide your exercise time and log your progress all in one place. Start your journey now!
        </Subtitle>
        <CTA onClick={() => onCombo('s')} to="/dashboard">Get Started</CTA>
      </Content>

      <BottomBar>
        <Action onClick={() => onCombo('l')}>
          <ActionIcon><ChartIcon /></ActionIcon>
          <Caption>Track Progress</Caption>
        </Action>
        <Action onClick={() => onCombo('c')}>
          <ActionIcon><DiceIcon /></ActionIcon>
          <Caption>Roll Dice</Caption>
        </Action>
        <Action onClick={() => onCombo('r')}>
          <ActionIcon><MedalIcon /></ActionIcon>
          <Caption>Set Goals</Caption>
        </Action>
      </BottomBar>
    </>
  );
}
