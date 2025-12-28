import ModeTab from './ModeTab';
import GameHeader from './GameHeader';
import DiceDisplay from './DiceDisplay';
import DiceActions from './DiceActions';
import ScoreSheet from './ScoreSheet';
import EvaluationButton from './EvaluationButton';
import { useGame } from '../context/GameContext';
import { useState } from 'react';
import type { Choice } from '../utils/api';
import EvaluationPanel from './EvaluationPanel';
import { useEvaluation } from '../hooks/useEvaluation';

export default function Layout() {
  const { gameState, dispatch } = useGame();
  const [evaluationPanelOpen, setEvaluationPanelOpen] = useState(false);
  const [evaluationChoices, setEvaluationChoices] = useState<Choice[]>([]);
  const { loading, error, evaluate } = useEvaluation();

  // EvaluationButton が呼ぶハンドラー
  const handleEvaluationComplete = (choices: Choice[]) => {
    setEvaluationPanelOpen(true);
    setEvaluationChoices(choices);
  };

  // EvaluationPanel の [適用] ボタンが呼ぶハンドラー
  const handleApplyDiceChoice = (choice: Choice) => {
    if (choice.choiceType !== 'dice') return;
    const dice = gameState.dice;
    const newLockedDice = [false, false, false, false, false];
    for (const faceToLock of choice.diceToHold!) {
      for (let i = 0; i < dice.length; i++) {
        if (dice[i] === faceToLock && !newLockedDice[i]) {
          newLockedDice[i] = true;
          break;
        }
      }
    }
    dispatch({ type: 'APPLY_DICE_LOCK', payload: newLockedDice });
    setEvaluationPanelOpen(false);
  };

  // EvaluationPanel の [確定] ボタンが呼ぶハンドラー
  const handleConfirmCategoryChoice = (choice: Choice) => {
    if (choice.choiceType !== 'category') return;
    dispatch({
      type: 'CONFIRM_SCORE',
      payload: choice.category!,
    });
    setEvaluationPanelOpen(false);
  };

  return (
    <div className="layout">
      <ModeTab />
      <GameHeader />
      <DiceDisplay />
      <DiceActions />
      <EvaluationButton
        loading={loading}
        evaluate={evaluate}
        onEvaluationComplete={handleEvaluationComplete}
      />
      <ScoreSheet />

      <EvaluationPanel
        isOpen={evaluationPanelOpen}
        choices={evaluationChoices}
        error={error}
        onClose={() => setEvaluationPanelOpen(false)}
        onApply={handleApplyDiceChoice}
        onConfirm={handleConfirmCategoryChoice}
      />
    </div>
  );
}
