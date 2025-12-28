import { useGame } from '../context/GameContext';
import { useEvaluation } from '../hooks/useEvaluation';
import type { Choice, EvaluationRequest } from '../utils/api';

interface EvaluationButtonProps {
  onEvaluationComplete: (choices: Choice[]) => void;
}

export default function EvaluationButton({ onEvaluationComplete }: EvaluationButtonProps) {
  const { gameState } = useGame();
  const { loading, evaluate } = useEvaluation();
  const { scoreSheet, dice, rollCount } = gameState;

  const handleClick = async () => {
    const request: EvaluationRequest = {
      scoreSheet,
      dice,
      rollCount,
    };
    const result = await evaluate(request);
    if (result) {
      onEvaluationComplete(result);
    }
  };

  const isGameFinished = Object.values(scoreSheet).every((value) => value !== null);
  const isDisabled = isGameFinished || rollCount === 0 || loading;

  return (
    <button disabled={isDisabled} onClick={handleClick}>
      {loading ? '評価中...' : '評価を見る'}
    </button>
  );
}
