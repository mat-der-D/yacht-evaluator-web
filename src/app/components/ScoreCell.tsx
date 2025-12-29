import { useGame } from '../context/GameContext';
import { isValidScore } from '../utils/validateScore';
import type { ScoreSheet } from '../types/game';
import { useMemo, useState, useEffect } from 'react';

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

function toHalfWidth(str: string): string {
  return str.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));
}

function isValidNumericInput(value: string): boolean {
  if (value === '') return true;
  const trimmed = value.trim();
  if (trimmed === '') return true;
  return /^-?\d+$/.test(trimmed);
}

function parseInputValue(value: string): number | null {
  if (value === '') return null;
  const trimmed = value.trim();
  if (trimmed === '') return null;
  const parsed = parseInt(trimmed, 10);
  return Number.isNaN(parsed) ? null : parsed;
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

  // ローカルで入力値を文字列として保持
  const [inputText, setInputText] = useState<string>('');
  const [isComposing, setIsComposing] = useState<boolean>(false);

  // scoreSheetの値が外部から変更された時に同期
  useEffect(() => {
    if (isScoreSheetKey(categoryKey)) {
      const value = scoreSheet[categoryKey];
      setInputText(value === null ? '' : String(value));
    }
  }, [categoryKey, scoreSheet]);

  const validationState = useMemo(() => {
    if (!isScoreSheetKey(categoryKey)) {
      return { hasError: false, isInputInvalid: false };
    }

    // IME入力中はエラー表示しない
    if (isComposing) {
      return { hasError: false, isInputInvalid: false };
    }

    // 入力形式が不正かチェック
    const isInputInvalid = !isValidNumericInput(inputText);
    if (isInputInvalid) {
      return { hasError: true, isInputInvalid: true };
    }

    // 値のバリデーション
    const currentValue = scoreSheet[categoryKey];
    const isValid = isValidScore(categoryKey, currentValue);
    const hasError = currentValue !== null && !isValid;

    return { hasError, isInputInvalid: false };
  }, [categoryKey, scoreSheet, inputText, isComposing]);

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (event: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    processInput(event.currentTarget.value);
  };

  const processInput = (rawValue: string) => {
    if (!isScoreSheetKey(categoryKey)) return;

    // 全角数字を半角に変換
    const inputValue = toHalfWidth(rawValue);

    // 0-9（半角）以外は受け付けない
    if (inputValue !== '' && !/^\d*$/.test(inputValue)) {
      return;
    }

    setInputText(inputValue);

    // stateを更新
    const numValue = parseInputValue(inputValue);
    dispatch({
      type: 'UPDATE_SCORE',
      payload: {
        category: categoryKey,
        score: numValue,
      },
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;

    // IME入力中は表示だけ更新
    if (isComposing) {
      setInputText(rawValue);
      return;
    }

    processInput(rawValue);
  };

  if (isAnalysisMode && isScoreSheetKey(categoryKey)) {
    const inputClassName = `score-cell-input ${
      validationState.hasError ? 'score-cell-input--invalid' : ''
    }`;

    return (
      <td className={`score-value ${isConfirmed ? '' : 'score-unconfirmed'}`}>
        <div className="score-cell-input-wrapper">
          <input
            className={inputClassName}
            type="text"
            inputMode="numeric"
            value={inputText}
            onChange={handleInputChange}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
          />
          {validationState.hasError && <div className="score-cell-error">無効なスコアです</div>}
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
