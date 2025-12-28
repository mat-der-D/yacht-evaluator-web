import React, { useContext, useReducer } from 'react';
import {
  initialGameState,
  type GameMode,
  type GameState,
  type RollCount,
  type ScoreSheet,
} from '../types/game';

type ScoreSheetKey = keyof ScoreSheet;

type GameAction =
  | { type: 'ROLL_DICE' }
  | { type: 'LOCK_DICE'; payload: number }
  | { type: 'INCREMENT_DICE'; payload: number }
  | { type: 'SET_ROLLCOUNT'; payload: RollCount }
  | { type: 'CONFIRM_SCORE'; payload: { key: ScoreSheetKey; value: number } }
  | { type: 'CHANGE_MODE'; payload: GameMode }
  | { type: 'RESET_GAME' };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ROLL_DICE': {
      if (state.rollCount === 3) return state;
      const newDice = state.dice.map((die, index) =>
        state.lockedDice[index] ? die : Math.floor(Math.random() * 6) + 1
      );
      return { ...state, dice: newDice, rollCount: (state.rollCount + 1) as RollCount };
    }
    case 'LOCK_DICE': {
      const newLockedDice = state.lockedDice.map((locked, index) =>
        index === action.payload ? !locked : locked
      );
      return { ...state, lockedDice: newLockedDice };
    }
    case 'INCREMENT_DICE': {
      const newDice = state.dice.map((die, index) =>
        index === action.payload ? (die % 6) + 1 : die
      );
      return { ...state, dice: newDice };
    }
    case 'SET_ROLLCOUNT':
      return { ...state, rollCount: action.payload };
    case 'CONFIRM_SCORE': {
      const { key, value } = action.payload;
      return {
        ...state,
        scoreSheet: {
          ...state.scoreSheet,
          [key]: value,
        },
        rollCount: 0 as RollCount,
        dice: [1, 1, 1, 1, 1],
        lockedDice: [false, false, false, false, false],
      };
    }
    case 'CHANGE_MODE':
      return { ...state, mode: action.payload };
    case 'RESET_GAME':
      return initialGameState;
    default:
      return state;
  }
}

const GameContext = React.createContext<
  | {
      gameState: GameState;
      dispatch: React.Dispatch<GameAction>;
    }
  | undefined
>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  return <GameContext.Provider value={{ gameState, dispatch }}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }

  return context;
}
