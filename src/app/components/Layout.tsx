import GameHeader from './GameHeader';
import ScoreSheet from './ScoreSheet';
import ActionButtons from './ActionButtons';
import DiceActions from './DiceActions';
import DiceDisplay from './DiceDisplay';
import BottomNavigation from './BottomNavigation';
import EvaluationPanel from './EvaluationPanel';
import ResetDialog from './ResetDialog';
import { useGame } from '../context/GameContext';
import { useState } from 'react';
import type { Choice } from '../utils/api';
import { useEvaluation } from '../hooks/useEvaluation';

export default function Layout() {
  const { gameState, dispatch } = useGame();
  const [evaluationPanelOpen, setEvaluationPanelOpen] = useState(false);
  const [evaluationChoices, setEvaluationChoices] = useState<Choice[]>([]);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const { loading, error, evaluate } = useEvaluation();

  const handleEvaluationComplete = (choices: Choice[] | undefined) => {
    setEvaluationPanelOpen(true);
    if (choices) {
      setEvaluationChoices(choices);
    }
  };

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

  const handleConfirmCategoryChoice = (choice: Choice) => {
    if (choice.choiceType !== 'category') return;
    dispatch({
      type: 'CONFIRM_SCORE',
      payload: choice.category!,
    });
    setEvaluationPanelOpen(false);
  };

  const handleResetClick = () => {
    setShowResetDialog(true);
  };

  const handleResetConfirm = () => {
    dispatch({ type: 'RESET_GAME' });
    setShowResetDialog(false);
  };

  const handleResetCancel = () => {
    setShowResetDialog(false);
  };

  return (
    <div className={`layout layout--${gameState.mode}`}>
      <GameHeader />

      <main className="layout__main">
        <ScoreSheet />

        <div className="layout__divider" />

        <ActionButtons
          loading={loading}
          evaluate={evaluate}
          onEvaluationComplete={handleEvaluationComplete}
          onResetClick={handleResetClick}
        />

        <DiceActions />

        <DiceDisplay />
      </main>

      <BottomNavigation />

      <EvaluationPanel
        isOpen={evaluationPanelOpen}
        choices={evaluationChoices}
        error={error}
        onClose={() => setEvaluationPanelOpen(false)}
        onApply={handleApplyDiceChoice}
        onConfirm={handleConfirmCategoryChoice}
      />

      <ResetDialog
        isOpen={showResetDialog}
        onConfirm={handleResetConfirm}
        onCancel={handleResetCancel}
      />
    </div>
  );
}
