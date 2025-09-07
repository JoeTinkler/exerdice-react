import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Roboto Condensed, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
    color: ${({ theme }) => theme.colour};
    background: ${({ theme }) => theme.secondaryBackground};
  }

  #root {
    background: ${({ theme }) => theme.background};
    max-width: 800px;
    margin: 0 auto;
    min-height: 100vh;
  }

  input[type="color"] {
    padding: 0;
  }

  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  input[type="color"]::-webkit-color-swatch {
    border: none;
  }
`;

export const LoadMore = styled.button`
  margin: 20px auto;
  display: block;
  border: none;
  background: ${({ theme }) => theme.button.background};
  color: ${({ theme }) => theme.button.colour};
  border-radius: 8px;
  padding: 10px 20px;
`;