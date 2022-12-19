import { atom } from 'recoil';

export const loginAtom = atom({
  key: 'login',
  default: false,
});

export const readyAtom = atom({
  key: 'ready',
  default: false,
});
