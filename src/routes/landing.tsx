import React from "react";
import styled, { css } from "styled-components";

import heroImg from "@assets/hero.png";
import { GlobalStyle } from "@components/Global";
import { Link } from "react-router-dom";
import StopwatchIcon from "@assets/icons/stopwatch.svg?react";
import ChartIcon from "@assets/icons/bar-chart.svg?react";
import MedalIcon from "@assets/icons/trophy.svg?react";
import DiceIcon from "@assets/icons/d20.svg?react";

const HeroCard = styled.div`
  background: ${({ theme }) => theme.card.background};
  position: relative;
  height: 48%;
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Illustration = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.card.background} url(${heroImg}) center/contain no-repeat;
`;

const Fab = styled.button`
  position: absolute;
  right: 18px;
  bottom: -15px;
  width: 85px;
  height: 85px;
  border-radius: 28px;
  border: none;
  background: ${({ theme }) => theme.highlightColour};
  display: grid;
  place-items: center;
  box-shadow: 0 0 16px ${({ theme }) => theme.highlightColour};

  svg {
    width: 48px;
    height: 48px;
    color: ${({ theme }) => theme.button.colour};
  }
`;

const Content = styled.div`
  padding: 8px 8px 0;
`;

const Title = styled.h1`
  font-size: 30px;
  line-height: 1.05;
  letter-spacing: .3px;
  margin: 10px 0 14px;
  font-weight: 800;
  text-align: center;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.secondaryColour};
  font-size: 20px;
  line-height: 1.45;
  text-align: center;
`;

const CTA = styled(Link)`
  margin: 22px auto 0;
  display: block;
  width: 88%;
  border: 0;
  border-radius: 16px;
  padding: 20px 24px;
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.button.colour};
  background: ${({ theme }) => theme.highlightColour};
  cursor: pointer;
  transition: transform .08s ease, box-shadow .2s ease;
  box-shadow: 0 0 16px ${({ theme }) => theme.highlightColour};
  text-decoration: none;
  text-align: center;
`;

const BottomBar = styled.div`
  margin: 40px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  align-items: end;
`;

const Action = styled.button`
  background: ${({ theme }) => theme.card.background};
  border: 0;
  border-radius: 22px;
  padding: 10px 10px 30px 10px;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colour};
  height: 100%;
`;

const ActionIcon = ({ children }: { children: React.ReactNode }) => (
  <IconWrap>{children}</IconWrap>
);

const IconWrap = styled.div`
  width: 70px;
  height: 70px;
  display:grid;
  place-items:center;

  svg {
    width: 26px;
    height: 26px;
  }
`;

const Caption = styled.div`
  font-size: 14px;
`;

export const LandingRoute: React.FC = () => {
  return (
    <>
      <GlobalStyle />
        <HeroCard>
          <Illustration />
          <Fab aria-label="Stopwatch">
            <StopwatchIcon />
          </Fab>
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
