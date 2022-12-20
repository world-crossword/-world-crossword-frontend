import { useRouter } from 'next/router';
import { connectionAtom, loginAtom, rankingListAtom, solvedWordAtom } from 'others/store';
import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const BROKER_URL = `ws://project.nextkhoon.xyz:58866/puzzlesocket`;

const WebSocketConnection = () => {
  const router = useRouter();
  const isLogin = useRecoilValue(loginAtom);
  const [socketConnected, setSocketConnected] = useRecoilState(connectionAtom);
  const setRankingList = useSetRecoilState(rankingListAtom);
  const setSolvedWord = useSetRecoilState(solvedWordAtom);
  const ws = useRef<any>(null);

  useEffect(() => {
    if (!isLogin) return;
    if (!ws.current) {
      ws.current = new WebSocket(BROKER_URL);
      ws.current.onopen = () => {
        setSocketConnected(true);
      };

      //   ws.current.onclose = (e) => {
      //     console.log(e);
      //   };
    }

    return () => {};
  }, [isLogin]);

  useEffect(() => {
    if (socketConnected) {
      ws.current.send(
        JSON.stringify({
          task: 'auth',
          googleId: 'test@gmail.com',
          sessionName: '1',
        })
      );

      ws.current.onmessage = (event: any) => {
        const puzzle = JSON.parse(event.data).puzzle;
        if (puzzle.sessionName === router.query.id) setSolvedWord(puzzle);
        setRankingList(JSON.parse(event.data).ranking);
      };
    }
  }, [socketConnected]);

  return <></>;
};

export default WebSocketConnection;
