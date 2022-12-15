import { BLANK_STATE, PRIVATE_STATE, PUBLIC_STATE } from 'others/GlobalConsts';
import { AcrossDownChooserData, WordHandlerData } from 'others/GlobalStyle';
import styled from 'styled-components';

interface Props {
  data: {
    state: number;
    row: { startRow: number; startCol: number } | undefined;
    col: { startRow: number; startCol: number } | undefined;
    alp: string;
  };
  openWordHandler: (arg0: WordHandlerData) => void;
  openAcrossDownChooser: (arg0: AcrossDownChooserData) => void;
}

const LetterBox: React.FC<Props> = ({ data, openWordHandler, openAcrossDownChooser }) => {
  const letterBoxClickHandler = () => {
    if (data.row && data.col) {
      openAcrossDownChooser({
        row: {
          startRow: data.row.startRow,
          startCol: data.row.startCol,
        },
        col: {
          startRow: data.col.startRow,
          startCol: data.col.startCol,
        },
      });
      return;
    }
    if (data.row) {
      openWordHandler({
        startRow: data.row.startRow,
        startCol: data.row.startCol,
        isRow: true,
      });
    }
    if (data.col) {
      openWordHandler({
        startRow: data.col.startRow,
        startCol: data.col.startCol,
        isRow: false,
      });
    }
  };

  switch (data.state) {
    case BLANK_STATE:
      return <Blank></Blank>;
    case PRIVATE_STATE:
      return <StyledLetterBox state={PRIVATE_STATE} onClick={letterBoxClickHandler}></StyledLetterBox>;
    case PUBLIC_STATE:
      return (
        <StyledLetterBox state={PUBLIC_STATE} onClick={letterBoxClickHandler}>
          {data.alp}
        </StyledLetterBox>
      );
    default:
      return <></>;
  }
};

const Blank = styled.div`
  width: 50px;
  height: 50px;
  min-width: 50px;
  min-height: 50px;
  pointer-events: none;
`;

interface StyledLetterBoxProps {
  state: number;
}

const StyledLetterBox = styled.div<StyledLetterBoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  min-width: 50px;
  min-height: 50px;
  border-radius: 6px;
  ${({ state }) => {
    if (state === PRIVATE_STATE) {
      return `
      border: solid 1px #aaa;
      box-shadow: 0 0 0 1px #aaa;
      `;
    } else {
      return `
      background: #04673a10;
      border: solid 1px #04673a;
      box-shadow: 0 0 0 1px #04673a;
      `;
    }
  }}
  cursor: pointer;
  font-size: 22px;
  font-weight: 600;
`;

export default LetterBox;
