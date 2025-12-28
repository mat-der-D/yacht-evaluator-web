import { useGame } from '../context/GameContext';
import type { ScoreSheet } from '../types/game';
import {
  calculateBonus,
  calculateCategoryScore,
  calculateFinalTotal,
  calculateUpperTotal,
} from '../utils/calculateScore';
import ScoreCell from './ScoreCell';

interface ScoreRowProps {
  categoryKey: keyof ScoreSheet | 'upperTotal' | 'bonus' | 'total';
  label: string;
}

export default function ScoreRow({ categoryKey, label }: ScoreRowProps) {
  const { gameState, dispatch } = useGame();

  const { scoreSheet, dice, rollCount } = gameState;

  const handleConfirmButton = (category: keyof ScoreSheet, score: number) => {
    dispatch({ type: 'CONFIRM_SCORE', payload: { key: category, value: score } });
  };

  let score: number | null = null;
  let potentialScore: number = 0;
  switch (categoryKey) {
    case 'total':
      score = calculateFinalTotal(scoreSheet);
      break;
    case 'bonus':
      score = calculateBonus(scoreSheet);
      break;
    case 'upperTotal':
      score = calculateUpperTotal(scoreSheet);
      break;
    default: {
      score = scoreSheet[categoryKey];
      potentialScore = calculateCategoryScore(categoryKey, dice);
      break;
    }
  }

  const isSpecialRow = ['total', 'bonus', 'upperTotal'].includes(categoryKey);
  const isConfirmed = score !== null;
  const isConfirmButtonDisabled =
    gameState.mode === 'play' ? isConfirmed || rollCount === 0 : isConfirmed;

  return (
    <tr className={isSpecialRow ? 'score-special' : ''}>
      <td className="score-label">{label}</td>
      <ScoreCell
        categoryKey={categoryKey}
        score={score}
        potentialScore={potentialScore}
        isConfirmed={isConfirmed}
      />
      <td>
        <button
          disabled={isConfirmButtonDisabled}
          onClick={() => handleConfirmButton(categoryKey as keyof ScoreSheet, potentialScore)}
        >
          確定
        </button>
      </td>
    </tr>
  );
}
