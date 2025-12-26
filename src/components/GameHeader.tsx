import { useGame } from '../context/GameContext';

const PLAY_ICON = '🎲' as const;
const ANALYSIS_ICON = '🔍' as const;

export default function GameHeader() {
  const { gameState } = useGame();
  return <div className="game-header">{gameState.mode === 'play' ? PLAY_ICON : ANALYSIS_ICON}</div>;
}
