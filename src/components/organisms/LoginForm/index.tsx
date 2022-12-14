import { StyledLoginForm } from './styled';

const LoginForm: React.FC = () => {
  return (
    <>
      <StyledLoginForm>
        <div className={'tempLogin'}>
          <p>Temp nickname</p>
          <input type={'text'}></input>
          <button type={'submit'}>ENTER</button>
        </div>
        <div className={'socialLogin'}>
          <div className={'googleLogo'}>img</div>
          <p>Login with Google</p>
        </div>
      </StyledLoginForm>
    </>
  );
};

export default LoginForm;
