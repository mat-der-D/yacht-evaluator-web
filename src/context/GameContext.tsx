/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useReducer } from 'react';
import {
  initialGameState,
  type GameState,
} from '../types/game';
import { gameReducer, type GameAction } from './gameReducer';

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
