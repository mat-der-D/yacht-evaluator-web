export type RollCount = 0 | 1 | 2 | 3;

export type GameMode = 'play' | 'analysis';

export interface GameState {
  mode: GameMode;
  rollCount: RollCount;
  dice: number[];
  scoreSheet: ScoreSheet;
  lockedDice: boolean[];
}

export interface ScoreSheet {
  ace: number | null;
  deuce: number | null;
  trey: number | null;
  four: number | null;
  five: number | null;
  six: number | null;
  choice: number | null;
  fourOfAKind: number | null;
  fullHouse: number | null;
  smallStraight: number | null;
  bigStraight: number | null;
  yacht: number | null;
}

export const initialGameState: GameState = {
  mode: 'play',
  rollCount: 0,
  dice: [1, 1, 1, 1, 1],
  scoreSheet: {
    ace: null,
    deuce: null,
    trey: null,
    four: null,
    five: null,
    six: null,
    choice: null,
    fourOfAKind: null,
    fullHouse: null,
    smallStraight: null,
    bigStraight: null,
    yacht: null,
  },
  lockedDice: [false, false, false, false, false],
};
