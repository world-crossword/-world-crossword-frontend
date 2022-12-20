import AcrossDownChooser from 'components/organisms/AcrossDownChooser';
import Board from 'components/organisms/Board';
import Status from 'components/organisms/Status';
import WordHandler from 'components/organisms/WordHandler';
import Image from 'next/image';
import { AcrossDownChooserData, PageDefaultLayout, WordHandlerData } from 'others/GlobalStyle';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import exit from 'public/exit.svg';
import logo from 'public/mainLogo.png';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { readyAtom, connectionAtom } from 'others/store';
import arrowLeft from 'public/arrowLeft.svg';
import arrowRight from 'public/arrowRight.svg';
import myAxios from 'others/myAxios';

const MainPage: React.FC = () => {
  const [handleWordHandler, setHandleWordHandler] = useState(false);
  const [wordHandlerData, setWordHandlerData] = useState<WordHandlerData>();
  const [handleAcrossDownChooser, setHandleAcrossDownChooser] = useState(false);
  const [acrossDownChooserData, setAcrossDownChooserData] = useState<AcrossDownChooserData>();
  const [puzzleData, setPuzzleData] = useState(null);
  const isReady = useRecoilValue(readyAtom);
  const isConnection = useRecoilValue(connectionAtom);
  const router = useRouter();

  const openWordHandler = ({ startRow, startCol, id, isRow }: WordHandlerData) => {
    setWordHandlerData({
      startRow,
      startCol,
      id,
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

  const movePuzzle = async (ad: number) => {
    const id = Number(router.query.id);
    let processedId;
    if (id + ad <= 0 || id + ad >= 11) {
      router.push({
        pathname: '/',
        query: { id: 1 },
      });
      processedId = 1;
    } else {
      processedId = id + ad;
      router.push({
        pathname: '/',
        query: { id: id + ad },
      });
    }

    try {
      const res = await myAxios('get', `puzzle/${id}/${processedId}`, null, true);
      setPuzzleData(res.data.puzzle);
    } catch (e) {
      console.log(e);
    }
  };

  const getPuzzleData = async (id: number) => {
    if (id <= 0 || id >= 11) {
      router.push({
        pathname: '/',
        query: { id: 1 },
      });
    }
    const processedId = id <= 0 || id >= 11 ? 1 : id;
    const res = await myAxios('get', `puzzle/0/${processedId}`, null, true);
    setPuzzleData(res.data.puzzle);
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (!isConnection) return;
    if (!isReady) return;
    getPuzzleData(Number(router.query.id));
  }, [isReady, isConnection, router.isReady]);

  useEffect(() => {
    if (!router.isReady) return;
    if (!router.query.id) {
      router.push({
        pathname: '/',
        query: { id: 1 },
      });
      return;
    }
  }, [router.isReady]);

  return (
    <MainPageLayout>
      {isReady && (
        <>
          <div className="logo">
            <Image alt={'mainLogo'} src={logo} fill />
          </div>
          {/* <div className={'exit'} onClick={goToLogin}>
            <Image alt={'exit'} src={exit} width={20} />
          </div> */}
          <Status></Status>
          <div className="boardWrapper">
            <Board
              openWordHandler={openWordHandler}
              openAcrossDownChooser={openAcrossDownChooser}
              puzzleData={puzzleData}
            ></Board>
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
          <div className="move moveLeft" onClick={() => movePuzzle(-1)}>
            <Image alt={'arrow left'} src={arrowLeft} />
          </div>
          <div className="move moveRight" onClick={() => movePuzzle(1)}>
            <Image alt={'arrow right'} src={arrowRight} />
          </div>
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

  .move {
    position: fixed;
    top: calc(50% - 15px);
    width: 30px;
    height: 30px;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .move:hover {
    border: solid 2px #04673a;
  }
  .moveLeft {
    left: 10px;
  }
  .moveRight {
    right: 10px;
  }

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
