import { atom } from 'recoil';

export const loginAtom = atom({
  key: 'login',
  default: false,
});

/** 로그인 확인 절차 전에 페이지 쫒아내는거 방지용 */
export const readyAtom = atom({
  key: 'ready',
  default: false,
});

export const myIdAtom = atom({
  key: 'id',
  default: null,
});

export const connectionAtom = atom({
  key: 'connection',
  default: false,
});

export interface SolvedWord {
  row_point: number;
  col_point: number;
  direction: string;
  word: string;
}

export const solvedWordAtom = atom<SolvedWord>({
  key: 'solvedWord',
  default: {
    row_point: 0,
    col_point: 0,
    direction: 'ACROSS',
    word: '',
  },
});

export const rankingListAtom = atom<{
  ranking: [];
  mine: {
    rank: string;
    ranker: {
      username: string;
    };
    score: number;
  };
}>({
  key: 'ranking',
  default: {
    ranking: [],
    mine: {
      rank: '',
      ranker: {
        username: '',
      },
      score: 0,
    },
  },
});
