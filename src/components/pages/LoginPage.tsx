import LoginForm from 'components/organisms/LoginForm';
import { PageDefaultLayout } from 'others/GlobalStyle';

const LoginPage: React.FC = () => {
  return (
    <PageDefaultLayout>
      <LoginForm></LoginForm>
    </PageDefaultLayout>
  );
};

export default LoginPage;
