import styled from 'styled-components';

const Status: React.FC = () => {
  return (
    <StyledStatus>
      <div className={'puzzleInitializer'}>
        <p>#123123</p>
      </div>
      <div className={'ranking'}>
        <div>
          <span>1</span>
          <span>name</span>
        </div>
        <div>
          <span>2</span>
          <span>name</span>
        </div>
      </div>
    </StyledStatus>
  );
};

const StyledStatus = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 10px;
  right: 10px;

  width: 300px;
  gap: 10px;

  .puzzleInitializer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    background: #04673a;
    color: #fff;
  }
  .ranking {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
    background: #d9d9d9;
    padding: 10px 0;
    > div {
      display: flex;
      align-items: center;
      > span {
        margin-left: 30px;
        width: 50px;
      }
    }
  }
`;

export default Status;
