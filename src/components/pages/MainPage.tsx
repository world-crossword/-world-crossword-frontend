import AcrossDownChooser from 'components/organisms/AcrossDownChooser';
import Board from 'components/organisms/Board';
import Status from 'components/organisms/Status';
import WordHandler from 'components/organisms/WordHandler';
import { AcrossDownChooserData, PageDefaultLayout, WordHandlerData } from 'others/GlobalStyle';
import { useState } from 'react';
import styled from 'styled-components';

const MainPage: React.FC = () => {
  const [handleWordHandler, setHandleWordHandler] = useState(false);
  const [wordHandlerData, setWordHandlerData] = useState<WordHandlerData>();
  const [handleAcrossDownChooser, setHandleAcrossDownChooser] = useState(false);
  const [acrossDownChooserData, setAcrossDownChooserData] = useState<AcrossDownChooserData>();

  const openWordHandler = ({ startRow, startCol, isRow }: WordHandlerData) => {
    setWordHandlerData({
      startRow,
      startCol,
      isRow,
    });
    setHandleWordHandler(true);
  };
  const closeWordHandler = () => setHandleWordHandler(false);

  const openAcrossDownChooser = ({ row, col }: AcrossDownChooserData) => {
    setAcrossDownChooserData({ row, col });
    setHandleAcrossDownChooser(true);
  };
  const closeAcrossDownChooser = () => setHandleAcrossDownChooser(false);

  return (
    <MainPageLayout>
      <div className={'nicknameBar'}>
        <p>nickname</p>
        <div>img</div>
      </div>
      <Status></Status>
      <Board openWordHandler={openWordHandler} openAcrossDownChooser={openAcrossDownChooser}></Board>
      {handleWordHandler && wordHandlerData && (
        <WordHandler closeWordHandler={closeWordHandler} wordHandlerData={wordHandlerData}></WordHandler>
      )}
      {handleAcrossDownChooser && acrossDownChooserData && (
        <AcrossDownChooser
          closeAcrossDownChooser={closeAcrossDownChooser}
          openWordHandler={openWordHandler}
          acrossDownChooserData={acrossDownChooserData}
        ></AcrossDownChooser>
      )}
    </MainPageLayout>
  );
};

const MainPageLayout = styled(PageDefaultLayout)`
  overflow: scroll;
  width: 100%;
  height: 100%;
  .nicknameBar {
    display: flex;
    position: fixed;
    top: 10px;
    left: 10px;
    width: 300px;
    height: 60px;
    background: #118952;
    p {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      color: #fff;
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 3px;
    }
    div {
      min-width: 60px;
    }
  }
`;

export default MainPage;
