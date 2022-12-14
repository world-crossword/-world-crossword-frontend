import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html, body, #__next {
        width: 100%;
        height: 100%;
        min-height: 100%;
    }
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
`;

export const PageDefaultLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const zIndex = {
  acrossDownChooser: 1,
  wordHandler: 2,
};

export interface WordHandlerData {
  startRow: number;
  startCol: number;
  isRow: boolean;
}

export interface AcrossDownChooserData {
  row: {
    startRow: number;
    startCol: number;
  };
  col: {
    startRow: number;
    startCol: number;
  };
}

const recentlyUsed = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  cursor: pointer;

  outline: none;
  border: none;
`;
