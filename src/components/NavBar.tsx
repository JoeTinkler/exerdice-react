import styled from "styled-components";
import HomeIcon  from "@assets/icons/home.svg?react";
import ChartIcon from "@assets/icons/chart.svg?react";
import DiceIcon from "@assets/icons/dice.svg?react";
import LogIcon from "@assets/icons/journal.svg?react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { Avatar } from "./Avatar";

const NavBarContainer = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  background: #171717;
  display: flex;
  justify-content: space-around;
  padding: 18px 0 24px;
`;

const NavItem = styled(Link)<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: ${({ theme, $active }) => $active ? theme.highlightColour : '#ccc'};
  text-decoration: none;

  svg {
    width: 24px;
    height: 24px;
  }
}`;

const IconWrapper = styled.div`
`;

export const NavBar: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <NavBarContainer>
      <NavItem to="/dashboard" $active={pathname === '/dashboard'}><IconWrapper><HomeIcon/></IconWrapper> Home</NavItem>
      <NavItem to="/history" $active={pathname === '/history'}><IconWrapper><ChartIcon /></IconWrapper> Stats</NavItem>
      <NavItem to="/roll" $active={pathname === '/roll'}><IconWrapper><DiceIcon /></IconWrapper> Roll</NavItem>
      <NavItem to="/log" $active={pathname.startsWith('/log')}><IconWrapper><LogIcon /></IconWrapper> Log</NavItem>
      <NavItem to="/profile" $active={pathname === '/profile'}><IconWrapper><Avatar size={24} /></IconWrapper> Profile</NavItem>
    </NavBarContainer>
  );
}