import React from "react";
import ChartIcon from "@assets/icons/bar-chart.svg?react";
import MedalIcon from "@assets/icons/trophy.svg?react";
import DiceIcon from "@assets/icons/d20.svg?react";
import { Action, BottomBar, Content, CTA, ExerdiceHero, HeroCard, Subtitle, Title, ActionIcon, Caption } from "@components/ui/routes/Landing";

export const LandingRoute: React.FC = () => {
  return (
    <>
      <HeroCard>
        <ExerdiceHero />
      </HeroCard>

      <Content>
        <Title>Exercise Time Tracker</Title>
        <Subtitle>
          Let the dice decide your exercise time and log your progress all in one place. Start your journey now!
        </Subtitle>
        <CTA to="/dashboard">Get Started</CTA>
      </Content>

      <BottomBar>
        <Action>
          <ActionIcon><ChartIcon /></ActionIcon>
          <Caption>Track Progress</Caption>
        </Action>
        <Action>
          <ActionIcon><DiceIcon /></ActionIcon>
          <Caption>Roll Dice</Caption>
        </Action>
        <Action>
          <ActionIcon><MedalIcon /></ActionIcon>
          <Caption>Set Goals</Caption>
        </Action>
      </BottomBar>
    </>
  );
}
