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

interface Props {
  closeWordHandler: () => void;
  wordHandlerData: WordHandlerData;
}

const WordHandler: React.FC<Props> = ({ closeWordHandler, wordHandlerData }) => {
  const [wordState, setWordState] = useState(MY_CORRECT_WORD_STATE);
  const [word, setWord] = useState('');

  const goToMain = () => closeWordHandler();

  const typeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  useEffect(() => {
    // console.log(wordHandlerData);
  }, [wordHandlerData]);

  return (
    <StyledWordHandler state={wordState}>
      <div className="goBackWrapper">
        <div className="goBack" onClick={closeWordHandler}>
          <Image alt={'go back'} src={back} />
        </div>
      </div>
      <form>
        <input
          type={'text'}
          value={word}
          onChange={(e) => typeAnswer(e)}
          readOnly={wordState === MY_CORRECT_WORD_STATE || wordState === ANY_CORRECT_WORD_STATE}
        />
        <div>
          <p>5 Letter</p>
          <p>noun</p>
        </div>
        <p>the act of saying the word hello to someone as a greeting</p>
        <div className="submit">
          {wordState === WRONG_WORD_STATE || wordState === DEFAULT_WORD_STATE ? (
            <button type={'submit'}>SUBMIT</button>
          ) : (
            <button type={'button'} onClick={goToMain}>
              GO BACK
            </button>
          )}
        </div>
      </form>
    </StyledWordHandler>
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

export default WordHandler;
