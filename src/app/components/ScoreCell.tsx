import { useGame } from '../context/GameContext';
import type { ScoreSheet } from '../types/game';

interface ScoreCellProps {
  categoryKey: keyof ScoreSheet | 'upperTotal' | 'bonus' | 'total';
  score: number | null;
  potentialScore: number;
  isConfirmed: boolean;
}

export default function ScoreCell({
  categoryKey,
  score,
  potentialScore,
  isConfirmed,
}: ScoreCellProps) {
  const { gameState, dispatch } = useGame();
  const { mode, scoreSheet } = gameState;

  const isSpecialRow = ['total', 'bonus', 'upperTotal'].includes(categoryKey);
  const createInputElement = () => (
    <input
      className="score-cell-input"
      type="number"
      value={scoreSheet[categoryKey as keyof ScoreSheet] ?? ''}
      onChange={(e) => {
        const inputValue = e.target.value;
        const numValue = inputValue === '' ? null : parseInt(inputValue);

        dispatch({
          type: 'UPDATE_SCORE',
          payload: {
            category: categoryKey as keyof ScoreSheet,
            score: numValue,
          },
        });
      }}
    />
  );

  const createSpanElement = () => <span>{isConfirmed ? score : `(+${potentialScore})`}</span>;

  return (
    <td className={`score-value ${isConfirmed ? '' : 'score-unconfirmed'}`}>
      {mode === 'analysis' && !isSpecialRow ? createInputElement() : createSpanElement()}
    </td>
  );
}
