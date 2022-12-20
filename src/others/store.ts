import { atom } from 'recoil';

export const loginAtom = atom({
  key: 'login',
  default: true,
});

/** 로그인 확인 절차 전에 페이지 쫒아내는거 방지용 */
export const readyAtom = atom({
  key: 'ready',
  default: true,
});

export const connectionAtom = atom({
  key: 'connection',
  default: false,
});

export const solvedWordAtom = atom({
  key: 'solvedWord',
  default: {},
});

export const rankingListAtom = atom({
  key: 'ranking',
  default: {
    ranking: [],
    mine: {},
  },
});
