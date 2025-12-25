type RollCount = 0 | 1 | 2 | 3;

type GameMode = "play" | "analysis";

interface GameState {
  mode: GameMode;
  rollCount: RollCount;
  dice: number[];
  scoreSheet: ScoreSheet;
  lockedDice: boolean[];
}

interface ScoreSheet {
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

const initialGameState = {
  mode: "play",
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
} as const;
