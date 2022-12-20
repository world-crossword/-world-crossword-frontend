import { useRouter } from 'next/router';
import { BLANK_STATE, PRIVATE_STATE, PUBLIC_STATE } from 'others/GlobalConsts';
import { AcrossDownChooserData, WordHandlerData } from 'others/GlobalStyle';
import myAxios from 'others/myAxios';
import { connectionAtom, SolvedWord, solvedWordAtom } from 'others/store';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import LetterBox from '../LetterBox';
import { StyledBoard } from './styled';

interface Atom {
  state: number;
  startRow: number;
  startCol: number;
  length: number;
  alp: string;
  isSolved: boolean;
  id: number;
}

interface Props {
  openWordHandler: (arg0: WordHandlerData) => void;
  openAcrossDownChooser: (arg0: AcrossDownChooserData) => void;
  puzzleData: any[] | null;
}

const Board: React.FC<Props> = ({ openWordHandler, openAcrossDownChooser, puzzleData }) => {
  const [NNArray, setNNArray] = useState<{ row: Atom; col: Atom; start?: boolean }[][]>([]);
  const solvedWord = useRecoilValue(solvedWordAtom);

  const processArray = () => {
    const newNNArray = Array.from(Array(50), () =>
      JSON.parse(
        JSON.stringify(
          Array(50).fill({
            row: { state: BLANK_STATE },
            col: { state: BLANK_STATE },
          })
        )
      )
    );
    puzzleData?.forEach(({ col_point: startRow, row_point: startCol, completion, direction, id, solver_id, word }) => {
      const isSolved = completion === 0 ? false : true,
        isRow = direction === ACROSS ? true : false,
        length = word.length;

      newNNArray[startCol][startRow].start = true;

      if (isRow) {
        for (let i = startRow; i < startRow + length; i++) {
          const posRow = newNNArray[startCol][i].row;
          posRow.state = isSolved ? PUBLIC_STATE : PRIVATE_STATE;
          posRow.startRow = startRow;
          posRow.startCol = startCol;
          posRow.length = length;
          posRow.alp = word[i - startRow];
          posRow.id = id;
        }
      } else {
        for (let i = startCol; i < startCol + length; i++) {
          const posCol = newNNArray[i][startRow].col;
          posCol.state = isSolved ? PUBLIC_STATE : PRIVATE_STATE;
          posCol.startRow = startRow;
          posCol.startCol = startCol;
          posCol.length = length;
          posCol.alp = word[i - startCol];
          posCol.id = id;
        }
      }
    });
    setNNArray(newNNArray);
  };

  const processedState = (rowState: number, colState: number) => {
    if (rowState === BLANK_STATE && colState === BLANK_STATE) return BLANK_STATE;
    if (rowState === PUBLIC_STATE || colState === PUBLIC_STATE) return PUBLIC_STATE;
    return PRIVATE_STATE;
  };

  const processedAlp = (rowAlp: string, colAlp: string) => rowAlp ?? colAlp;

  const processedData = (row: Atom, col: Atom, start?: boolean) => ({
    state: processedState(row.state, col.state),
    row: row.state !== BLANK_STATE ? { startRow: row.startRow, startCol: row.startCol, id: row.id } : undefined,
    col: col.state !== BLANK_STATE ? { startRow: col.startRow, startCol: col.startCol, id: col.id } : undefined,
    alp: processedAlp(row.alp, col.alp),
    start: start ?? false,
  });

  const updateArray = ({ row_point: startCol, col_point: startRow, direction, word }: SolvedWord) => {
    const isRow = direction === ACROSS ? true : false;
    const newNNArray = JSON.parse(JSON.stringify(NNArray));
    const length = word?.length;
    if (isRow) {
      for (let i = startRow; i < startRow + length; i++) {
        const posRow = newNNArray[startCol][i].row;
        console.log(posRow);
        posRow.state = PUBLIC_STATE;
      }
    } else {
      for (let i = startCol; i < startCol + length; i++) {
        const posCol = newNNArray[i][startRow].col;
        posCol.state = PUBLIC_STATE;
      }
    }
    setNNArray(newNNArray);
  };

  useEffect(() => {
    if (!puzzleData) return;
    processArray();
  }, [puzzleData]);

  useEffect(() => {
    updateArray(solvedWord);
  }, [solvedWord]);

  return (
    <StyledBoard>
      {puzzleData &&
        NNArray?.map((rows, colIdx) => {
          return (
            <div key={`col${colIdx}`}>
              {rows.map(({ row, col, start }, rowIdx) => {
                return (
                  <LetterBox
                    key={`${colIdx},${rowIdx}`}
                    data={processedData(row, col, start)}
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

const ACROSS = 'ACROSS',
  DOWN = 'DOWN';

export default Board;
