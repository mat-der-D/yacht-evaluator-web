import type { ScoreSheet } from './game';

type Category =
  | 'ace'
  | 'deuce'
  | 'trey'
  | 'four'
  | 'five'
  | 'six'
  | 'choice'
  | 'fourOfAKind'
  | 'fullHouse'
  | 'smallStraight'
  | 'bigStraight'
  | 'yacht';

export interface DiceChoice {
  choiceType: 'dice';
  diceToHold: number[];
  expectedValue: number;
}

export interface CategoryChoice {
  choiceType: 'category';
  category: Category;
  expectedValue: number;
}

export interface EvaluateRequest {
  scoreSheet: ScoreSheet;
  dice: number[];
  rollCount: 1 | 2 | 3;
}

export interface EvaluateResponse {
  data: (DiceChoice | CategoryChoice)[];
}
