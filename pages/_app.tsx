import Checker from 'components/organisms/Checker';
import WebSocketConnection from 'components/organisms/WebSocketConnection';
import type { AppProps } from 'next/app';
import { GlobalStyle } from 'others/GlobalStyle';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Checker />
      <WebSocketConnection />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
