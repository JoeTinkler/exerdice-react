import React from "react";
import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";
import HeroAsset from "@assets/exerdice-hero.svg?react";

export const Combo = styled.div`
  position: fixed;
  top: 2px;
  right: 2px;
  font-size: 5px;
  z-index: 999;
  color: ${({ theme }) => theme.secondaryColour};
  opacity: 0.2;
`;

export const HeroCard = styled.div`
  background: ${({ theme }) => theme.card.background};
  position: relative;
  height: 48%;
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  padding: 8px 8px 0;
`;

export const Title = styled.h1`
  font-size: 30px;
  line-height: 1.05;
  letter-spacing: .3px;
  margin: 10px 0 14px;
  font-weight: 800;
  text-align: center;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.secondaryColour};
  font-size: 20px;
  line-height: 1.45;
  text-align: center;
`;

export const CTA = styled(Link)`
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

export const BottomBar = styled.div`
  margin: 40px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  align-items: end;
`;

export const Action = styled.button`
  background: ${({ theme }) => theme.card.background};
  border: 0;
  border-radius: 22px;
  padding: 10px 10px 30px 10px;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colour};
  height: 100%;
`;

export const ActionIcon = ({ children }: { children: React.ReactNode }) => (
  <IconWrap>{children}</IconWrap>
);

export const IconWrap = styled.div`
  width: 70px;
  height: 70px;
  display:grid;
  place-items:center;

  svg {
    width: 26px;
    height: 26px;
  }
`;

export const Caption = styled.div`
  font-size: 14px;
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const glow = keyframes`
  40% { fill: #1a1a1a; }
  45% { fill: #15c580; }
  65% { fill: #1a1a1a; }
`;

export const ExerdiceHero = styled(HeroAsset)<{ $animate: boolean }>`
  user-select: none;
  width: 100%;
  color: #1a1a1a;
  margin: 0 auto;

  ${({ $animate}) => $animate ? css`
    .hero-stopwatch-frame {
      transform-origin: 2.5% 4.3%;
      animation: ${rotate} 2.5s linear infinite;
      position: relative;
    }

    .hero-heart {
      animation: ${pulse} 1.5s ease infinite;
    }

    .hero-dice {
      animation: ${glow} 3s linear infinite;
    }
  ` : ''}
`;

export const TipsWrapper = styled.div`
  margin: 20px;
`;