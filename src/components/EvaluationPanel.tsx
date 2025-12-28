import type { Choice } from '../utils/api';
import { DICE_SYMBOLS } from '../constants/dice';
import { CATEGORY_LABELS, type CategoryKey } from '../constants/categories';

interface EvaluationPanelProps {
  isOpen: boolean;
  choices: Choice[];
  onClose: () => void;
}

export default function EvaluationPanel({ isOpen, choices, onClose }: EvaluationPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="evaluation-panel-overlay" onClick={onClose}>
      <div className="evaluation-panel" onClick={(e) => e.stopPropagation()}>
        <div className="evaluation-panel-header">
          <h2>Results</h2>
          <button onClick={onClose}>[×]</button>
        </div>
        <div className="evaluation-panel-body">
          {choices.map((choice, index) => (
            <ChoiceItem key={index} choice={choice} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ChoiceItemProps {
  key: number;
  choice: Choice;
}

function ChoiceItem({ key, choice }: ChoiceItemProps) {
  return (
    <div key={key} className="evaluation-choice">
      {choice.choiceType === 'dice' ? (
        <span>
          {/* TODO: 何も残さないときの書き方を工夫する */}
          {choice.diceToHold?.map((face) => DICE_SYMBOLS[face]).join(' ')} - EV:{' '}
          {choice.expectedValue}
        </span>
      ) : (
        <span>
          {CATEGORY_LABELS[choice.category as CategoryKey]} - EV: {choice.expectedValue}
        </span>
      )}
    </div>
  );
}
