import React, { useContext, useReducer } from "react";
import { initialGameState, type GameMode, type GameState, type RollCount, type ScoreSheet } from "../types/game";

type ScoreSheetKey = keyof ScoreSheet;

type GameAction =
  | { type: 'ROLL_DICE' }
  | { type: 'LOCK_DICE'; payload: number }
  | { type: 'UPDATE_SCORE_SHEET'; payload: { key: ScoreSheetKey; value: number | null } }
  | { type: 'CHANGE_MODE'; payload: GameMode }
  | { type: 'RESET_GAME' }


function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ROLL_DICE': {
      if (state.rollCount === 3) return state
      const newDice = state.dice.map((die, index) =>
        state.lockedDice[index] ? die : Math.floor(Math.random() * 6) + 1
      )
      return { ...state, dice: newDice, rollCount: (state.rollCount + 1) as RollCount }
    }
    case 'LOCK_DICE': {
      const newLockedDice = state.lockedDice.map((locked, index) =>
        index === action.payload ? !locked : locked
      )
      return { ...state, lockedDice: newLockedDice }
    }
    case 'UPDATE_SCORE_SHEET': {
      const { key, value } = action.payload
      return {
        ...state, scoreSheet: {
          ...state.scoreSheet, [key]: value
        }
      }
    }
    case 'CHANGE_MODE':
      return { ...state, mode: action.payload }
    case 'RESET_GAME':
      return initialGameState
    default:
      return state
  }
}

const GameContext = React.createContext<{
  gameState: GameState,
  dispatch: React.Dispatch<GameAction>
} | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within GameProvider')
  }

  return context
}
