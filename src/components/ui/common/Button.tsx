import { Link } from "react-router-dom";
import styled from "styled-components";

type PropTypes = {
  $primary?: boolean;
  $size?: 'large' | 'medium' | 'small';
}

export const NavigationButton = styled(Link)<PropTypes>`
  background: ${({ theme, $primary }) => !$primary ? '#333' : theme.highlightColour};
  border: none;
  border-radius: ${({ $size}) => {
    switch ($size) {
      case 'small': return '8px';
      case 'medium': return '8px';
      default:
      case 'large': return '12px';
    }
  }};
  padding: ${({ $size}) => {
    switch ($size) {
      case 'small': return '12px';
      case 'medium': return '14px';
      default:
      case 'large': return '16px';
    }
  }};
  color: ${({ theme }) => theme.button.colour};
  font-size: ${({ $size}) => {
    switch ($size) {
      case 'small': return '12px';
      case 'medium': return '16px';
      default:
      case 'large': return '18px';
    }
  }};
  width: 100%;
  margin: ${({ $size}) => {
    switch ($size) {
      case 'small': return '10px 0';
      case 'medium': return '12px 0';
      default:
      case 'large': return '20px 0';
    }
  }};
  text-decoration: none;
  text-align: center;
  display: block;
`;

export const Button = styled.button<PropTypes>`
  background: ${({ theme, $primary }) => !$primary ? '#333' : theme.highlightColour};
  border: none;
  border-radius: ${({ $size}) => {
    switch ($size) {
      case 'small': return '8px';
      case 'medium': return '8px';
      default:
      case 'large': return '12px';
    }
  }};
  padding: ${({ $size}) => {
    switch ($size) {
      case 'small': return '12px';
      case 'medium': return '14px';
      default:
      case 'large': return '16px';
    }
  }};
  color: ${({ theme }) => theme.button.colour};
  font-size: ${({ $size}) => {
    switch ($size) {
      case 'small': return '12px';
      case 'medium': return '16px';
      default:
      case 'large': return '18px';
    }
  }};
  width: 100%;
  margin: ${({ $size}) => {
    switch ($size) {
      case 'small': return '10px 0';
      case 'medium': return '12px 0';
      default:
      case 'large': return '20px 0';
    }
  }};
  text-decoration: none;
  text-align: center;
  display: block;
`;