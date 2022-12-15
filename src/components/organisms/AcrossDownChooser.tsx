import Image from 'next/image';
import { AcrossDownChooserData, WordHandlerData, zIndex } from 'others/GlobalStyle';
import { MouseEvent } from 'react';
import styled from 'styled-components';
import across from 'public/across.svg';
import down from 'public/down.svg';

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
        <div onClick={(e) => handleChoosing(e, ACROSS)}>
          <Image alt={'across'} src={across} />
          <p>Across</p>
        </div>
        <div onClick={(e) => handleChoosing(e, DOWN)}>
          <Image alt={'down'} src={down} />
          <p>Down</p>
        </div>
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
    border-radius: 4px;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      box-shadow: 0 0 0 1px #ddd;
      background: #fff;
      > img {
        width: 80%;
        height: 70%;
      }
    }
    > div:hover {
      background: #118952;
      box-shadow: 0 0 0 1px #118952;
      color: #fff;
    }
  }
`;

export default AcrossDownChooser;
