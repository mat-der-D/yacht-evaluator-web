import type { GameMode } from '../types/game';
import ModeTab from './ModeTab';
import GameHeader from './GameHeader';
import DiceDisplay from './DiceDisplay';
import DiceActions from './DiceActions';
import { useGame } from '../context/GameContext';

export default function Layout() {
  const { gameState, dispatch } = useGame();

  const handleModeChange = (newMode: GameMode) => {
    dispatch({ type: 'CHANGE_MODE', payload: newMode });
  };

  return (
    <div className="layout">
      <ModeTab mode={gameState.mode} onModeChange={handleModeChange} />
      <GameHeader mode={gameState.mode} />
      <DiceDisplay />
      <DiceActions />
      {/*<EvaluationButton></EvaluationButton>
      <ScoreSheet></ScoreSheet>*/}
    </div>
  );
}
