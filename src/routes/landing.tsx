import React, { useContext, useState } from "react";
import ChartIcon from "@assets/icons/bar-chart.svg?react";
import MedalIcon from "@assets/icons/trophy.svg?react";
import DiceIcon from "@assets/icons/d20.svg?react";
import { Action, BottomBar, Content, CTA, ExerdiceHero, HeroCard, Subtitle, Title, ActionIcon, Caption, Combo, TipsWrapper } from "@components/ui/routes/Landing";
import { ProfileContext } from "@providers/profile";
import { ToastContext } from "@components/toast/provider";
import { Tip, TipList, TipListItem } from "@components/Tip";

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

      <TipsWrapper>
        <Tip title={'How does it work?'} icon={'d20'}>
          <TipList>
            <TipListItem>Roll dice every day to determine how many minutes of exercise you do each day</TipListItem>
            <TipListItem>Your modifier dice roll determines how many activity dice you roll</TipListItem>
            <TipListItem>The total of your activity dice is the number of minutes for your daily goal</TipListItem>
            <TipListItem>Track your rest days and configure your weekly allowance</TipListItem>
            <TipListItem>Build an exercise streak by completing your goal every day (rest days included)</TipListItem>
          </TipList>
        </Tip>
        <Tip title={'Completely Offline'} text={'All data stored on your device'} icon={'d20'} />
        <Tip title={'Boost Motivation'} text={'Setting goals and building daily habits'} icon={'d20'} />
        <Tip title={'Customizable'} text={'Lots of settings to tweak your experience'} icon={'d20'} />
      </TipsWrapper>
    </>
  );
}
