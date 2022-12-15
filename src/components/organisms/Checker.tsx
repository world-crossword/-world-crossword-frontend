import { useRouter } from 'next/router';
import myAxios from 'others/myAxios';
import { accessTokenAtom, isReadyAtom } from 'others/store';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import useInterval from 'use-interval';

const Checker: React.FC = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const [isReady, setIsReady] = useRecoilState(isReadyAtom);

  const checkLogin = async () => {
    try {
      const res = await myAxios('post', 'api/v1/auth/account-token', null, true);
      setAccessToken(res.data.response.accessToken);
    } catch (e) {
      console.log(e);
    } finally {
      setIsReady(true);
    }
  };

  useEffect(() => {
    // checkLogin();
  }, []);

  useInterval(() => {
    // checkLogin();
  }, REFRESH_ACCESS_TOKEN_TIME);

  useEffect(() => {
    if (!isReady) return;
    if (accessToken === '') {
      if (router.pathname !== '/login') router.push('/login');
    } else {
      if (router.pathname === '/login') router.push('/');
    }
  }, [isReady, router.pathname, accessToken]);

  return <></>;
};

const REFRESH_ACCESS_TOKEN_TIME = 5000000;

export default Checker;
