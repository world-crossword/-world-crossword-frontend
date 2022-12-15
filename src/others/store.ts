import { atom } from 'recoil';

export const accessTokenAtom = atom({
  key: 'accessToken',
  default: '1',
});

export const isReadyAtom = atom({
  key: 'isReady',
  default: false,
});
