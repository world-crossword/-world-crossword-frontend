import styled from 'styled-components';

export const StyledLoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  width: 90%;
  max-width: 450px;
  padding: 25px 20px;
  gap: 20px;
  border: solid 2px #ddd;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .logo {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 8px;
    > img {
      width: 100%;
      height: 100%;
    }
  }

  .socialLogin {
    display: flex;
    width: 100%;
    height: 50px;
    cursor: pointer;
    background: #fff;
    border: solid 2px #ddd;
    border-radius: 4px;

    .googleLogo {
      min-width: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    p {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      font-weight: 600;
      font-size: 18px;
    }
  }
`;
