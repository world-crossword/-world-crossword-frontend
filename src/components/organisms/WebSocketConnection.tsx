import { useEffect, useRef, useState } from 'react';

const BROKER_URL = `ws://project.nextkhoon.xyz:58866/puzzle`;

const WebSocketConnection = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const ws = useRef<any>(null);

  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(BROKER_URL);
      ws.current.onopen = () => {
        console.log('hi');
        setSocketConnected(true);
      };
    }

    return () => {
      //   ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (socketConnected) {
      ws.current.send(
        JSON.stringify({
          task: 'auth',
          googleId: 'test@gmail.com',
          sessionName: '1',
        })
      );

      ws.current.onmessage = (event) => {
        console.log(event.data);
      };
    }
  }, [socketConnected]);

  return <></>;
};

export default WebSocketConnection;
