import type { GameMode, GameState } from '../types/game';
import ModeTab from './ModeTab';
import GameHeader from './GameHeader';

interface LayoutProps {
  gameState: GameState;
  setGameState: (state: GameState) => void;
}

export default function Layout({ gameState, setGameState }: LayoutProps) {
  const handleModeChange = (newMode: GameMode) => {
    setGameState({ ...gameState, mode: newMode });
  };

  return (
    <div className="layout">
      <ModeTab mode={gameState.mode} onModeChange={handleModeChange} />
      <GameHeader mode={gameState.mode} />
      <DiceDisplay></DiceDisplay>
      <DiceActions></DiceActions>
      <EvaluationButton></EvaluationButton>
      <ScoreSheet></ScoreSheet>
    </div>
  );
}
