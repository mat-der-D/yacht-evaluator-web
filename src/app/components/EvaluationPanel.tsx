import type { Choice } from '../utils/api';
import { DICE_SYMBOLS } from '../constants/dice';
import { CATEGORY_LABELS, type CategoryKey } from '../constants/categories';
import { useGame } from '../context/GameContext';
import { calculateFinalTotal } from '../utils/calculateScore';

interface EvaluationPanelProps {
  isOpen: boolean;
  choices: Choice[];
  error?: string | null;
  onClose: () => void;
  onApply: (choice: Choice) => void;
  onConfirm: (choice: Choice) => void;
}

export default function EvaluationPanel({
  isOpen,
  choices,
  error,
  onClose,
  onApply,
  onConfirm,
}: EvaluationPanelProps) {
  const { gameState } = useGame();

  if (!isOpen) return null;

  const totalScore = calculateFinalTotal(gameState.scoreSheet);
  const bestExpectedValue = Math.max(...choices.map((choice) => choice.expectedValue));

  return (
    <div className="evaluation-panel-overlay" onClick={onClose}>
      <div
        className={`evaluation-panel evaluation-panel--${gameState.mode}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="evaluation-panel-header">
          <h2>{error ? 'エラー' : '評価値'}</h2>
          <button onClick={onClose}>×</button>
        </div>
        <div className="evaluation-panel-body">
          <span>
            現在の合計スコア: {totalScore}点<br />※ 期待値は最終スコアの見込みです
          </span>
          {error ? (
            <div className="evaluation-error">{error}</div>
          ) : (
            choices.map((choice, index) => (
              <ChoiceItem
                key={`${choice.choiceType}-${index}`}
                choice={choice}
                bestExpectedValue={bestExpectedValue}
                onApply={onApply}
                onConfirm={onConfirm}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

interface ChoiceItemProps {
  choice: Choice;
  bestExpectedValue: number;
  onApply: (choice: Choice) => void;
  onConfirm: (choice: Choice) => void;
}

const createDiceToHoldComponent = (diceToHold: number[]) => {
  if (diceToHold.length == 0) {
    return <span>すべて振り直す</span>;
  } else {
    const diceMessage = diceToHold.map((face) => DICE_SYMBOLS[face]).join('');
    return (
      <span>
        <span className="evaluation-panel-dice">{diceMessage}</span> を残す
      </span>
    );
  }
};

const roundToTwoDecimals = (value: number): number => {
  return Math.round(value * 100) / 100;
};

const createExpectedValueMessage = (choice: Choice, bestExpectedValue: number): string => {
  const roundedExpectedValue = roundToTwoDecimals(choice.expectedValue);
  const roundedBestExpectedValue = roundToTwoDecimals(bestExpectedValue);
  const diff = roundedBestExpectedValue - roundedExpectedValue;
  const diffMessage = diff === 0 ? '(Best)' : `(Best - ${diff.toFixed(2)})`;
  return `期待値 ${roundedExpectedValue.toFixed(2)} 点 ${diffMessage}`;
};

function ChoiceItem({ choice, bestExpectedValue, onApply, onConfirm }: ChoiceItemProps) {
  const { gameState } = useGame();

  return (
    <div className="evaluation-choice">
      {choice.choiceType === 'dice' ? (
        <>
          {createDiceToHoldComponent(choice.diceToHold!)}
          <span>{createExpectedValueMessage(choice, bestExpectedValue)}</span>
          {gameState.mode === 'play' && <button onClick={() => onApply(choice)}>🔒</button>}
        </>
      ) : (
        <>
          <span>{CATEGORY_LABELS[choice.category as CategoryKey]}確定</span>
          <span>{createExpectedValueMessage(choice, bestExpectedValue)}</span>
          <button onClick={() => onConfirm(choice)}>✓</button>
        </>
      )}
    </div>
  );
}
