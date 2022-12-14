import styled from 'styled-components';

export const StyledLoginForm = styled.div`
  display: flex;
  flex-direction: column;
  background: #e9e9e9;
  width: 90%;
  max-width: 450px;
  padding: 5px 10px;
  gap: 60px;

  .tempLogin {
    display: flex;
    flex-direction: column;
    width: 100%;
    p {
      font-weight: 600;
      font-size: 18px;
    }
    input {
      background: #fff;
      outline: none;
      border: none;
      height: 50px;
      padding: 0 10px;
      font-size: 16px;
    }
    button {
      outline: none;
      border: none;
      height: 45px;
      font-weight: 600;
      font-size: 16px;
      color: #fff;
      letter-spacing: 3px;
      background: #04673a;
      cursor: pointer;
    }
  }
  .socialLogin {
    display: flex;
    width: 100%;
    height: 50px;
    cursor: pointer;
    .googleLogo {
      min-width: 40px;
    }
    p {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      font-weight: 600;
      font-size: 18px;
      background: #fff;
    }
  }
`;
