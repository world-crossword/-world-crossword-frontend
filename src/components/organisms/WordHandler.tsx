import {
  ANY_CORRECT_WORD_STATE,
  DEFAULT_WORD_STATE,
  MY_CORRECT_WORD_STATE,
  WRONG_WORD_STATE,
} from 'others/GlobalConsts';
import { WordHandlerData, zIndex } from 'others/GlobalStyle';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import back from 'public/back.png';
import Image from 'next/image';
import myAxios from 'others/myAxios';
import { useRouter } from 'next/router';

interface Props {
  closeWordHandler: () => void;
  wordHandlerData: WordHandlerData;
}

const WordHandler: React.FC<Props> = ({ closeWordHandler, wordHandlerData }) => {
  const [wordData, setWordData] = useState<{
    word: string;
    part: string;
    mean: string;
  }>({
    word: '',
    part: '',
    mean: '',
  });
  const [inputWord, setInputWord] = useState('');
  const [handlerState, setHandlerState] = useState(DEFAULT_WORD_STATE);
  const router = useRouter();

  const goToMain = () => closeWordHandler();

  const typeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setInputWord(e.target.value);
  };

  const handleHandlerState = (completion: number, solver_id: number) => {
    if (completion === 0) setHandlerState(DEFAULT_WORD_STATE);
    else setHandlerState(solver_id !== 1 ? ANY_CORRECT_WORD_STATE : MY_CORRECT_WORD_STATE);
  };

  const getWordData = async () => {
    const res = await myAxios('get', `puzzle/mean/${wordHandlerData.id}`, null, true);
    console.log(res.data.word);
    setWordData(res.data);
    handleHandlerState(res.data.completion, res.data.solver_id);
  };

  const submitWord = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await myAxios(
      'post',
      `puzzle`,
      {
        id: wordHandlerData.id,
        word: inputWord,
        session_name: router.query.id,
      },
      true
    );
    setHandlerState(res.data.solved === RIGHT ? MY_CORRECT_WORD_STATE : WRONG_WORD_STATE);
  };

  useEffect(() => {
    getWordData();
  }, [wordHandlerData]);

  return (
    <>
      {wordData && (
        <StyledWordHandler state={handlerState}>
          <div className="goBackWrapper">
            <div className="goBack" onClick={closeWordHandler}>
              <Image alt={'go back'} src={back} />
            </div>
          </div>
          <form onSubmit={submitWord}>
            <input
              type={'text'}
              value={
                handlerState === MY_CORRECT_WORD_STATE || handlerState === ANY_CORRECT_WORD_STATE
                  ? wordData?.word
                  : inputWord
              }
              onChange={(e) => typeAnswer(e)}
              readOnly={handlerState === MY_CORRECT_WORD_STATE || handlerState === ANY_CORRECT_WORD_STATE}
            />
            <div>
              <p>{wordData?.word?.length} Letter</p>
              <p>{wordData?.part}</p>
            </div>
            <p>{wordData?.mean}</p>
            <div className="submit">
              {handlerState === WRONG_WORD_STATE || handlerState === DEFAULT_WORD_STATE ? (
                <button type={'submit'}>SUBMIT</button>
              ) : (
                <button type={'button'} onClick={goToMain}>
                  GO BACK
                </button>
              )}
            </div>
          </form>
        </StyledWordHandler>
      )}
    </>
  );
};

interface WordHandlerProps {
  state: number;
}

const StyledWordHandler = styled.div<WordHandlerProps>`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  background: #fff;
  z-index: ${zIndex.wordHandler};

  .goBackWrapper {
    width: 100%;
    max-width: 800px;
    .goBack {
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      cursor: pointer;
      > img {
        width: 100%;
        height: 100%;
      }
    }
  }

  > form {
    display: flex;
    flex-direction: column;
    max-width: 800px;
    margin: 10px;
    padding: 20px;
    width: 100%;
    border: solid 1px #ccc;
    border-radius: 4px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background: ${({ state }) => {
      switch (state) {
        case DEFAULT_WORD_STATE:
          return `#fff`;
        case WRONG_WORD_STATE:
          return `#d2000028`;
        case MY_CORRECT_WORD_STATE:
          return `#00623599`;
        case ANY_CORRECT_WORD_STATE:
          return `#ccc`;
      }
    }};

    > input {
      height: 100px;
      font-size: 58px;
      padding: 0 20px;
      outline: none;
      text-align: center;
      letter-spacing: 5px;
      margin-bottom: 10px;
      border-radius: 4px;
    }
    > div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      > p {
        font-size: 20px;
      }
    }
    > p {
      min-height: 100px;
      font-size: 20px;
      margin-bottom: 20px;
    }
    .submit {
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        background: #fff;
        width: 120px;
        height: 40px;
        outline: none;
        border: none;
        background: #04673a;
        color: #fff;
        font-size: 16px;
        letter-spacing: 3px;
        border-radius: 4px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
      }
    }
  }
`;

const WRONG = 'WRONG',
  RIGHT = 'RIGHT';

export default WordHandler;
