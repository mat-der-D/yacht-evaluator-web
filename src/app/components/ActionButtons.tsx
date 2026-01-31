import { useGame } from '../context/GameContext';
import { validateScoreSheet } from '../utils/validateScore';
import type { Choice, EvaluationRequest } from '../utils/api';

interface ActionButtonsProps {
  loading: boolean;
  evaluate: (request: EvaluationRequest) => Promise<Choice[] | undefined>;
  onEvaluationComplete: (choices: Choice[] | undefined) => void;
  onResetClick: () => void;
}

export default function ActionButtons({
  loading,
  evaluate,
  onEvaluationComplete,
  onResetClick,
}: ActionButtonsProps) {
  const { gameState } = useGame();
  const { scoreSheet, dice, rollCount, mode } = gameState;

  const handleEvaluate = async () => {
    if (!validateScoreSheet(scoreSheet)) {
      alert('無効なスコアが入力されています。分析モードで修正してください。');
      return;
    }

    const request: EvaluationRequest = {
      scoreSheet,
      dice,
      rollCount,
    };
    const result = await evaluate(request);
    onEvaluationComplete(result);
  };

  const isGameFinished = Object.values(scoreSheet).every((value) => value !== null);
  const isEvaluateDisabled = isGameFinished || rollCount === 0 || loading;

  return (
    <div className={`action-buttons action-buttons--${mode}`}>
      <button
        className="action-buttons__evaluate"
        disabled={isEvaluateDisabled}
        onClick={handleEvaluate}
        aria-label="評価を見る"
      >
        {loading ? '評価中...' : '📊 評価を見る'}
      </button>
      <button className="action-buttons__reset" onClick={onResetClick} aria-label="リセット">
        リセット
      </button>
    </div>
  );
}
