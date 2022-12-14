import { BLANK_STATE, PRIVATE_STATE, PUBLIC_STATE } from 'others/GlobalConsts';
import { AcrossDownChooserData, WordHandlerData } from 'others/GlobalStyle';
import { useEffect, useState } from 'react';
import LetterBox from '../LetterBox';
import { StyledBoard } from './styled';

interface Atom {
  state: number;
  startRow: number;
  startCol: number;
  length: number;
  alp: string;
  isSolved: boolean;
}

const NNArray: {
  row: Atom;
  col: Atom;
}[][] = Array.from(Array(50), () =>
  JSON.parse(
    JSON.stringify(
      Array(50).fill({
        row: { state: BLANK_STATE },
        col: { state: BLANK_STATE },
      })
    )
  )
);

interface Props {
  openWordHandler: (arg0: WordHandlerData) => void;
  openAcrossDownChooser: (arg0: AcrossDownChooserData) => void;
}

const Board: React.FC<Props> = ({ openWordHandler, openAcrossDownChooser }) => {
  const [loadArray, setLoadArray] = useState(false);

  const quizData = [
    {
      startRow: 3,
      startCol: 2,
      isRow: true,
      length: 7,
      str: 'youtube',
      isSolved: true,
    },
    {
      startRow: 3,
      startCol: 2,
      isRow: false,
      length: 7,
      str: 'youtube',
      isSolved: true,
    },
    {
      startRow: 1,
      startCol: 3,
      isRow: false,
      length: 5,
      str: 'hello',
      isSolved: false,
    },
    {
      startRow: 5,
      startCol: 5,
      isRow: true,
      length: 10,
      str: 'hellohello',
      isSolved: true,
    },
    {
      startRow: 49,
      startCol: 49,
      isRow: true,
      length: 1,
      str: 'a',
      isSolved: false,
    },
  ];

  const processArray = () => {
    quizData.forEach(({ startRow, startCol, isRow, length, str, isSolved }) => {
      if (isRow) {
        for (let i = startRow; i < startRow + length; i++) {
          const posRow = NNArray[startCol][i].row;
          posRow.state = isSolved ? PUBLIC_STATE : PRIVATE_STATE;
          posRow.startRow = startRow;
          posRow.startCol = startCol;
          posRow.length = length;
          posRow.alp = str[i - startRow];
        }
      } else {
        for (let i = startCol; i < startCol + length; i++) {
          const posCol = NNArray[i][startRow].col;
          posCol.state = isSolved ? PUBLIC_STATE : PRIVATE_STATE;
          posCol.startRow = startRow;
          posCol.startCol = startCol;
          posCol.length = length;
          posCol.alp = str[i - startCol];
        }
      }
    });
    setLoadArray(true);
  };

  const processedState = (rowState: number, colState: number) => {
    if (rowState === BLANK_STATE && colState === BLANK_STATE) return BLANK_STATE;
    if (rowState === PUBLIC_STATE || colState === PUBLIC_STATE) return PUBLIC_STATE;
    return PRIVATE_STATE;
  };

  const processedAlp = (rowAlp: string, colAlp: string) => rowAlp ?? colAlp;

  const processedData = (row: Atom, col: Atom) => ({
    state: processedState(row.state, col.state),
    row: row.state !== BLANK_STATE ? { startRow: row.startRow, startCol: row.startCol } : undefined,
    col: col.state !== BLANK_STATE ? { startRow: col.startRow, startCol: col.startCol } : undefined,
    alp: processedAlp(row.alp, col.alp),
  });

  useEffect(() => {
    processArray();
  }, []);

  return (
    <StyledBoard>
      {NNArray.map((rows, colIdx) => {
        return (
          <div key={`col${colIdx}`}>
            {loadArray &&
              rows.map(({ row, col }, rowIdx) => {
                return (
                  <LetterBox
                    key={`${colIdx},${rowIdx}`}
                    data={processedData(row, col)}
                    openWordHandler={openWordHandler}
                    openAcrossDownChooser={openAcrossDownChooser}
                  ></LetterBox>
                );
              })}
          </div>
        );
      })}
    </StyledBoard>
  );
};

export default Board;
