import Image from 'next/image';
import styled from 'styled-components';
import crown from 'public/crown.svg';
import left from 'public/left.svg';
import right from 'public/right.svg';
import { useState } from 'react';

const Status: React.FC = () => {
  const [isExpand, setIsExpand] = useState(true);

  const handleStatusSize = () => {
    setIsExpand(!isExpand);
  };

  const expandStatus = () => {
    if (!isExpand) setIsExpand(true);
  };

  return (
    <StyledStatus isExpand={isExpand}>
      <div className={'header'} onClick={expandStatus}>
        <Image alt={'crown'} src={crown} width={23} />
        <p>Ranking</p>
      </div>
      <div className={'ranking'}>
        <div>
          <span className={'rank'}>1</span>
          <span className={'nickname'}>hi</span>
          <span className={'score'}>230</span>
        </div>
        <div>
          <span className={'rank'}>2</span>
          <span className={'nickname'}>hello</span>
          <span className={'score'}>180</span>
        </div>
        <div>
          <span className={'rank'}>3</span>
          <span className={'nickname'}>me</span>
          <span className={'score'}>150</span>
        </div>
        <div className={'myRanking'}>
          <span className={'rank'}>1</span>
          <span className={'nickname'}>hi</span>
          <span className={'score'}>230</span>
        </div>
      </div>
      <div className={'close'} onClick={handleStatusSize}>
        {isExpand ? <Image alt="reduce" src={right} /> : <Image alt="expand" src={left} />}
      </div>
    </StyledStatus>
  );
};

interface StyledStatusProps {
  isExpand: boolean;
}

const StyledStatus = styled.div<StyledStatusProps>`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 10px;
  right: 10px;
  ${({ isExpand }) => {
    if (isExpand) {
      return `
        width: 300px;
        padding: 10px;
        border: solid 1px #ddd;
      `;
    } else {
      return `
        width: 60px;
        border: none;
      `;
    }
  }}
  gap: 10px;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: #fff;
  transition: 0.5s;
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    ${({ isExpand }) => {
      if (isExpand) {
        return `
      height: 40px;
      `;
      } else {
        return `
      height: 60px;
      border-radius: 4px;
      cursor: pointer;
      `;
      }
    }}
    background: #04673a;
    color: #fff;
    gap: 10px;
    > img {
      margin-bottom: 2px;
    }
    > p {
      display: ${({ isExpand }) => (isExpand ? '' : 'none')};
    }
  }
  .ranking {
    display: ${({ isExpand }) => (isExpand ? 'flex' : 'none')};
    flex-direction: column;
    width: 100%;
    > div {
      display: flex;
      align-items: center;
      background: #fff;
      padding: 5px 0;
      overflow: hidden;
      .rank {
        margin-left: 30px;
        width: 40px;
      }
      .nickname {
        width: 120px;
        overflow: hidden;
      }
      .score {
        margin-left: 30px;
        width: 40px;
      }
      > span {
        font-weight: 600;
      }
    }
    .myRanking {
      color: #fff;
      background: #118952;
    }
  }
  .close {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: calc(50% - 25px);
    left: -18px;
    width: 18px;
    height: 50px;
    background: #fff;
    border-radius: 6px 0px 0px 6px;
    border: solid 1.5px #ddd;
    cursor: pointer;
  }
`;

export default Status;
