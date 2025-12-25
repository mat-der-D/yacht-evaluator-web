import type { GameMode } from '../types/game';

const PLAY_ICON = '🎲' as const;
const ANALYSIS_ICON = '🔍' as const;

interface GameHeaderProps {
  mode: GameMode;
}

export default function GameHeader({ mode }: GameHeaderProps) {
  return <div className="game-header">{mode === 'play' ? PLAY_ICON : ANALYSIS_ICON}</div>;
}
