import {
  initialGameState,
  type GameMode,
  type GameState,
  type RollCount,
  type ScoreSheet,
} from '../types/game';
import { calculateCategoryScore } from '../utils/calculateScore';

type ScoreSheetKey = keyof ScoreSheet;

export type GameAction =
  | { type: 'ROLL_DICE' }
  | { type: 'TOGGLE_DICE_LOCK'; payload: number }
  | { type: 'APPLY_DICE_LOCK'; payload: boolean[] }
  | { type: 'INCREMENT_DICE'; payload: number }
  | { type: 'SET_ROLLCOUNT'; payload: RollCount }
  | { type: 'UPDATE_SCORE'; payload: { category: ScoreSheetKey; score: number | null } }
  | { type: 'CONFIRM_SCORE'; payload: ScoreSheetKey }
  | { type: 'CHANGE_MODE'; payload: GameMode }
  | { type: 'RESET_GAME' };

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ROLL_DICE': {
      if (state.rollCount === 3) return state;
      const newDice = state.dice.map((die, index) =>
        state.lockedDice[index] ? die : Math.floor(Math.random() * 6) + 1
      );
      return { ...state, dice: newDice, rollCount: (state.rollCount + 1) as RollCount };
    }
    case 'TOGGLE_DICE_LOCK': {
      const newLockedDice = state.lockedDice.map((locked, index) =>
        index === action.payload ? !locked : locked
      );
      return { ...state, lockedDice: newLockedDice };
    }
    case 'APPLY_DICE_LOCK':
      return { ...state, lockedDice: action.payload };
    case 'INCREMENT_DICE': {
      const newDice = state.dice.map((die, index) =>
        index === action.payload ? (die % 6) + 1 : die
      );
      return { ...state, dice: newDice };
    }
    case 'SET_ROLLCOUNT':
      return { ...state, rollCount: action.payload };
    case 'UPDATE_SCORE': {
      const { category: key, score: value } = action.payload;
      return {
        ...state,
        scoreSheet: {
          ...state.scoreSheet,
          [key]: value,
        },
      };
    }

    case 'CONFIRM_SCORE': {
      const category = action.payload;
      const score = calculateCategoryScore(category, state.dice);
      const newScoreSheet = {
        ...state.scoreSheet,
        [category]: score,
      };

      if (state.mode === 'play') {
        return {
          ...state,
          scoreSheet: newScoreSheet,
          rollCount: 0 as RollCount,
          dice: [1, 1, 1, 1, 1],
          lockedDice: [false, false, false, false, false],
        };
      } else {
        return {
          ...state,
          scoreSheet: newScoreSheet,
        };
      }
    }
    case 'CHANGE_MODE':
      return { ...state, mode: action.payload };
    case 'RESET_GAME':
      return { ...initialGameState, mode: state.mode };
    default:
      return state;
  }
}
