import { useGame } from '../context/GameContext';
import type { Choice, EvaluationRequest } from '../utils/api';

interface EvaluationButtonProps {
  loading: boolean;
  evaluate: (request: EvaluationRequest) => Promise<Choice[] | undefined>;
  onEvaluationComplete: (choices: Choice[] | undefined) => void;
}

export default function EvaluationButton({
  loading,
  evaluate,
  onEvaluationComplete,
}: EvaluationButtonProps) {
  const { gameState } = useGame();
  const { scoreSheet, dice, rollCount } = gameState;

  const handleClick = async () => {
    const request: EvaluationRequest = {
      scoreSheet,
      dice,
      rollCount,
    };
    const result = await evaluate(request);
    onEvaluationComplete(result);
  };

  const isGameFinished = Object.values(scoreSheet).every((value) => value !== null);
  const isDisabled = isGameFinished || rollCount === 0 || loading;

  return (
    <button
      className={`evaluation-button evaluation-button--${gameState.mode}`}
      disabled={isDisabled} onClick={handleClick}>
      {loading ? '評価中...' : '評価を見る'}
    </button>
  );
}
