import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    line-height: 1.5;
    transition: background-color 0.2s ease-in-out;
  }

  button, input, select, textarea {
    font-family: inherit;
  }

  /* Add smooth transitions for all interactive elements */
  a, button, select {
    transition: all 0.2s ease-in-out;
  }

  /* Add custom scrollbar for the entire page */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.surfaceHover};
    border-radius: 5px;
    border: 2px solid ${({ theme }) => theme.background};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.border};
  }
`; 