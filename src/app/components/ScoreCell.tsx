import { useGame } from '../context/GameContext';
import { isValidScore } from '../utils/validateScore';
import type { ScoreSheet } from '../types/game';
import { useMemo } from 'react';

interface ScoreCellProps {
  categoryKey: keyof ScoreSheet | 'upperTotal' | 'bonus' | 'total';
  score: number | null;
  potentialScore: number;
  isConfirmed: boolean;
}

const SPECIAL_ROWS = new Set(['total', 'bonus', 'upperTotal']);

function isScoreSheetKey(key: string): key is keyof ScoreSheet {
  return !SPECIAL_ROWS.has(key);
}

function parseInputValue(value: string): number | null {
  return value === '' ? null : parseInt(value, 10);
}

export default function ScoreCell({
  categoryKey,
  score,
  potentialScore,
  isConfirmed,
}: ScoreCellProps) {
  const { gameState, dispatch } = useGame();
  const { mode, scoreSheet } = gameState;

  const isSpecialRow = SPECIAL_ROWS.has(categoryKey);
  const isAnalysisMode = mode === 'analysis' && !isSpecialRow;

  const validationState = useMemo(() => {
    if (!isScoreSheetKey(categoryKey)) {
      return { hasError: false };
    }

    const currentValue = scoreSheet[categoryKey];
    const isValid = isValidScore(categoryKey, currentValue);
    const hasError = currentValue !== null && !isValid;

    return { hasError };
  }, [categoryKey, scoreSheet]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isScoreSheetKey(categoryKey)) return;

    const inputValue = event.target.value;
    const numValue = parseInputValue(inputValue);

    dispatch({
      type: 'UPDATE_SCORE',
      payload: {
        category: categoryKey,
        score: numValue,
      },
    });
  };

  if (isAnalysisMode && isScoreSheetKey(categoryKey)) {
    const currentValue = scoreSheet[categoryKey];
    const inputClassName = `score-cell-input ${validationState.hasError ? 'score-cell-input--invalid' : ''
      }`;

    return (
      <td className={`score-value ${isConfirmed ? '' : 'score-unconfirmed'}`}>
        <div className="score-cell-input-wrapper">
          <input
            className={inputClassName}
            type="number"
            value={currentValue ?? ''}
            onChange={handleInputChange}
          />
          {validationState.hasError && (
            <div className="score-cell-error">無効なスコアです</div>
          )}
        </div>
      </td>
    );
  }

  return (
    <td className={`score-value ${isConfirmed ? '' : 'score-unconfirmed'}`}>
      <span>{isConfirmed ? score : `(+${potentialScore})`}</span>
    </td>
  );
}
