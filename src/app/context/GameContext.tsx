/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useEffect, useReducer } from 'react';
import { initialGameState, type GameState } from '../types/game';
import { gameReducer, type GameAction } from './gameReducer';

const STORAGE_KEY = 'yacht-game-state';

function loadGameState(): GameState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved) as GameState;
    }
  } catch {
    // データ破損時はデフォルトにフォールバック
  }
  return initialGameState;
}

const GameContext = React.createContext<
  | {
      gameState: GameState;
      dispatch: React.Dispatch<GameAction>;
    }
  | undefined
>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState, loadGameState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  return <GameContext.Provider value={{ gameState, dispatch }}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }

  return context;
}
