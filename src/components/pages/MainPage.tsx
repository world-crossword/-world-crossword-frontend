import AcrossDownChooser from 'components/organisms/AcrossDownChooser';
import Board from 'components/organisms/Board';
import Status from 'components/organisms/Status';
import WordHandler from 'components/organisms/WordHandler';
import Image from 'next/image';
import { AcrossDownChooserData, PageDefaultLayout, WordHandlerData } from 'others/GlobalStyle';
import { useState } from 'react';
import styled from 'styled-components';
import exit from 'public/exit.svg';
import logo from 'public/mainLogo.png';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { accessTokenAtom } from 'others/store';

const MainPage: React.FC = () => {
  const [handleWordHandler, setHandleWordHandler] = useState(false);
  const [wordHandlerData, setWordHandlerData] = useState<WordHandlerData>();
  const [handleAcrossDownChooser, setHandleAcrossDownChooser] = useState(false);
  const [acrossDownChooserData, setAcrossDownChooserData] = useState<AcrossDownChooserData>();
  const accessToken = useRecoilValue(accessTokenAtom);
  const router = useRouter();

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

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <MainPageLayout>
      {accessToken !== '0' && (
        <>
          <div className="logo">
            <Image alt={'mainLogo'} src={logo} fill />
          </div>
          <div className={'exit'} onClick={goToLogin}>
            <Image alt={'exit'} src={exit} width={20} />
          </div>
          <Status></Status>
          <div className="boardWrapper">
            <Board openWordHandler={openWordHandler} openAcrossDownChooser={openAcrossDownChooser}></Board>
          </div>
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
        </>
      )}
    </MainPageLayout>
  );
};

const MainPageLayout = styled(PageDefaultLayout)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2800px;
  min-height: 2800px;

  .logo {
    position: absolute;
    top: 20px;
    left: 125px;
    width: 80px;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
  }
  .boardWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 2550px;
    min-height: 2550px;
    border: solid 2px #ddd;
    border-radius: 4px;
  }
  .exit {
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    bottom: 10px;
    right: 10px;
    width: 50px;
    height: 50px;
    background: #118952;
    border-radius: 3px;
    cursor: pointer;
    transition: 0.3s;
  }
  .exit:hover {
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  }
`;

export default MainPage;
