import { useState, useRef, useEffect, useCallback } from 'react';
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

const MIN_HEIGHT_PERCENT = 25;
const INITIAL_HEIGHT_PERCENT = 48;
const MAX_HEIGHT_PERCENT = 85;

export default function EvaluationPanel({
  isOpen,
  choices,
  error,
  onClose,
  onApply,
  onConfirm,
}: EvaluationPanelProps) {
  const { gameState } = useGame();
  const [heightPercent, setHeightPercent] = useState(INITIAL_HEIGHT_PERCENT);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setHeightPercent(INITIAL_HEIGHT_PERCENT);
      onClose();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  const handleDragStart = (clientY: number) => {
    setIsDragging(true);
    startYRef.current = clientY;
    startHeightRef.current = heightPercent;
  };

  const handleDragMove = useCallback(
    (clientY: number) => {
      if (!isDragging) return;

      const deltaY = startYRef.current - clientY;
      const deltaPercent = (deltaY / window.innerHeight) * 100;
      const newHeight = Math.min(
        MAX_HEIGHT_PERCENT,
        Math.max(MIN_HEIGHT_PERCENT, startHeightRef.current + deltaPercent)
      );
      setHeightPercent(newHeight);
    },
    [isDragging]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleDragMove(e.clientY);
    const handleTouchMove = (e: TouchEvent) => handleDragMove(e.touches[0].clientY);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  if (!isOpen && !isClosing) return null;

  const totalScore = calculateFinalTotal(gameState.scoreSheet);
  const bestExpectedValue =
    choices.length > 0 ? Math.max(...choices.map((choice) => choice.expectedValue)) : 0;

  return (
    <div
      className={`bottom-sheet-overlay ${isClosing ? 'bottom-sheet-overlay--closing' : ''}`}
      onClick={handleClose}
    >
      <div
        ref={panelRef}
        className={`bottom-sheet bottom-sheet--${gameState.mode} ${isClosing ? 'bottom-sheet--closing' : ''}`}
        style={{ height: `${heightPercent}%` }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="evaluation-panel-title"
      >
        <div
          className="bottom-sheet__handle-area"
          onMouseDown={(e) => handleDragStart(e.clientY)}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
        >
          <div className="bottom-sheet__handle" />
        </div>

        <div className="bottom-sheet__header">
          <h2 id="evaluation-panel-title" className="bottom-sheet__title">
            {error ? 'エラー' : '評価値'}
          </h2>
          <button className="bottom-sheet__close" onClick={handleClose} aria-label="閉じる">
            ×
          </button>
        </div>

        <div className="bottom-sheet__content">
          {error ? (
            <div className="bottom-sheet__error">{error}</div>
          ) : (
            <>
              <p className="bottom-sheet__note">
                現在の合計スコア: {totalScore}点
                <br />※ 期待値は最終スコアの見込みです
              </p>
              <div className="bottom-sheet__choices">
                {choices.map((choice, index) => (
                  <ChoiceItem
                    key={`${choice.choiceType}-${index}`}
                    choice={choice}
                    bestExpectedValue={bestExpectedValue}
                    onApply={onApply}
                    onConfirm={onConfirm}
                  />
                ))}
              </div>
            </>
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
  if (diceToHold.length === 0) {
    return <span className="choice-item__action-text">すべて振り直す</span>;
  }
  const diceMessage = diceToHold.map((face) => DICE_SYMBOLS[face]).join('');
  return (
    <span className="choice-item__action-text">
      <span className="choice-item__dice">{diceMessage}</span> を残す
    </span>
  );
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
    <div className="choice-item">
      <div className="choice-item__info">
        {choice.choiceType === 'dice' ? (
          createDiceToHoldComponent(choice.diceToHold!)
        ) : (
          <span className="choice-item__action-text">
            {CATEGORY_LABELS[choice.category as CategoryKey]}確定
          </span>
        )}
        <span className="choice-item__expected-value">
          {createExpectedValueMessage(choice, bestExpectedValue)}
        </span>
      </div>
      {choice.choiceType === 'dice' ? (
        gameState.mode === 'play' && (
          <button
            className="choice-item__button"
            onClick={() => onApply(choice)}
            aria-label="このダイスをロック"
          >
            🔒
          </button>
        )
      ) : (
        <button
          className="choice-item__button"
          onClick={() => onConfirm(choice)}
          aria-label={`${CATEGORY_LABELS[choice.category as CategoryKey]}を確定`}
        >
          ✓
        </button>
      )}
    </div>
  );
}
