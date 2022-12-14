import { AcrossDownChooserData, WordHandlerData, zIndex } from 'others/GlobalStyle';
import { MouseEvent } from 'react';
import styled from 'styled-components';

interface Props {
  closeAcrossDownChooser: () => void;
  openWordHandler: (arg0: WordHandlerData) => void;
  acrossDownChooserData: AcrossDownChooserData;
}

const ACROSS = false,
  DOWN = true;

const AcrossDownChooser: React.FC<Props> = ({ closeAcrossDownChooser, openWordHandler, acrossDownChooserData }) => {
  const handleChoosing = (e: MouseEvent, choosen: boolean) => {
    e.stopPropagation();
    closeAcrossDownChooser();
    if (choosen === ACROSS) {
      openWordHandler({
        startRow: acrossDownChooserData.row.startRow,
        startCol: acrossDownChooserData.row.startCol,
        isRow: true,
      });
    } else {
      openWordHandler({
        startRow: acrossDownChooserData.col.startRow,
        startCol: acrossDownChooserData.col.startCol,
        isRow: false,
      });
    }
  };

  return (
    <StyledAcrossDownChooser onClick={closeAcrossDownChooser}>
      <div>
        <div onClick={(e) => handleChoosing(e, ACROSS)}>Across</div>
        <div onClick={(e) => handleChoosing(e, DOWN)}>Down</div>
      </div>
    </StyledAcrossDownChooser>
  );
};

const StyledAcrossDownChooser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #00000050;
  z-index: ${zIndex.acrossDownChooser};
  cursor: pointer;
  padding: 20px;
  > div {
    display: flex;
    max-width: 350px;
    width: 100%;
    height: 200px;
    background: #fff;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  }
`;

export default AcrossDownChooser;
