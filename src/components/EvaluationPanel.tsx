import type { Choice } from '../utils/api';
import { DICE_SYMBOLS } from '../constants/dice';
import { CATEGORY_LABELS, type CategoryKey } from '../constants/categories';
import { useGame } from '../context/GameContext';

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
          {error ? (
            <div className="evaluation-error">{error}</div>
          ) : (
            choices.map((choice, index) => (
              <ChoiceItem key={index} choice={choice} onApply={onApply} onConfirm={onConfirm} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

interface ChoiceItemProps {
  choice: Choice;
  onApply: (choice: Choice) => void;
  onConfirm: (choice: Choice) => void;
}

const createMessageFromDiceToHold = (diceToHold: number[]): string => {
  return diceToHold.length == 0
    ? 'すべて振り直す'
    : `${diceToHold.map((face) => DICE_SYMBOLS[face]).join('')}を残す`;
};

const createExpectedValueMessage = (choice: Choice): string => {
  return `期待値 ${choice.expectedValue.toFixed(2)} 点`;
};

function ChoiceItem({ choice, onApply, onConfirm }: ChoiceItemProps) {
  return (
    <div className="evaluation-choice">
      {choice.choiceType === 'dice' ? (
        <>
          <span>{createMessageFromDiceToHold(choice.diceToHold!)}</span>
          <span>{createExpectedValueMessage(choice)}</span>
          <button onClick={() => onApply(choice)}>適用</button>
        </>
      ) : (
        <>
          <span>{CATEGORY_LABELS[choice.category as CategoryKey]}確定</span>
          <span>{createExpectedValueMessage(choice)}</span>
          <button onClick={() => onConfirm(choice)}>確定</button>
        </>
      )}
    </div>
  );
}
