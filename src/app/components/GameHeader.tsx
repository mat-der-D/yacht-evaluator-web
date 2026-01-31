import { useGame } from '../context/GameContext';
import { calculateFinalTotal } from '../utils/calculateScore';

export default function GameHeader() {
  const { gameState } = useGame();
  const totalScore = calculateFinalTotal(gameState.scoreSheet);

  return (
    <header className={`game-header game-header--${gameState.mode}`}>
      <span className="game-header__title">ヨット局面評価</span>
      <span className="game-header__score">スコア: {totalScore}</span>
    </header>
  );
}
