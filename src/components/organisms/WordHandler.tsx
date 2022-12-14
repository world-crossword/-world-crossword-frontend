import {
  ANY_CORRECT_WORD_STATE,
  DEFAULT_WORD_STATE,
  MY_CORRECT_WORD_STATE,
  WRONG_WORD_STATE,
} from 'others/GlobalConsts';
import { WordHandlerData, zIndex } from 'others/GlobalStyle';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

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
        {wordState === WRONG_WORD_STATE || wordState === DEFAULT_WORD_STATE ? (
          <button type={'submit'}>SUBMIT</button>
        ) : (
          <button type={'button'} onClick={goToMain}>
            GO BACK
          </button>
        )}
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
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: ${zIndex.wordHandler};
  > form {
    display: flex;
    flex-direction: column;
    max-width: 800px;
    margin: 10px;
    padding: 20px;
    width: 100%;
    border: solid 1px #ccc;
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
    > button {
      background: #fff;
      height: 40px;
      outline: none;
      border: none;
    }
  }
`;

export default WordHandler;
