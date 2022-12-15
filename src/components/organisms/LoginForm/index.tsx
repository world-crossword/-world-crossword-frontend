import Image from 'next/image';
import { StyledLoginForm } from './styled';
import google from 'public/google.svg';
import { useRouter } from 'next/router';
import logo from 'public/mainLogo.png';

const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email&response_type=code&redirect_uri=http://project.nextkhoon.xyz:58866/login/oauth2/code/google
&client_id=576349839964-rbdmc9a0tsofvih0j582oldrbkp6an52.apps.googleusercontent.com&access_type=offline`;

const LoginForm: React.FC = () => {
  const router = useRouter();

  const handleSocialLogin = async () => {
    router.push(loginURL);
  };

  return (
    <StyledLoginForm>
      <div className="logo">
        <Image alt={'logo'} src={logo} />
      </div>
      <div className={'socialLogin'} onClick={handleSocialLogin}>
        <div className={'googleLogo'}>
          <Image alt={'google logo'} src={google} />
        </div>
        <p>Login with Google</p>
      </div>
    </StyledLoginForm>
  );
};

export default LoginForm;
