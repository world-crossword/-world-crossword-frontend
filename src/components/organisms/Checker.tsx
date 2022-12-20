import { useRouter } from 'next/router';
import myAxios from 'others/myAxios';
import { loginAtom, myIdAtom, readyAtom } from 'others/store';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import useInterval from 'use-interval';

const Checker: React.FC = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  const [isReady, setIsReady] = useRecoilState(readyAtom);
  const setMyId = useSetRecoilState(myIdAtom);

  const checkLogin = async () => {
    try {
      const res = await myAxios('get', 'member/me', null, true);
      setMyId(res.data.memberId);
      setIsLogin(true);
    } catch (e) {
      // console.log(e);
    } finally {
      setIsReady(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  useInterval(() => {
    // checkLogin();
  }, REFRESH_ACCESS_TOKEN_TIME);

  useEffect(() => {
    if (!isReady) return;
    if (!isLogin) {
      router.push('/login');
    } else {
      if (router.pathname === '/login') router.push('/');
    }
  }, [isReady, router.pathname]);

  return <></>;
};

const REFRESH_ACCESS_TOKEN_TIME = 5000000;

export default Checker;
