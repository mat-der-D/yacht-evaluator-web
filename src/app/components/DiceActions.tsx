import { useGame } from '../context/GameContext';
import type { RollCount } from '../types/game';

function PlayModeActions() {
  const {
    gameState: { scoreSheet, rollCount },
    dispatch,
  } = useGame();

  const isGameFinished = Object.values(scoreSheet).every((value) => value !== null);
  const isDisabled = isGameFinished || rollCount >= 3;
  const rollsRemaining = Math.max(0, 3 - rollCount);

  return (
    <div className="dice-actions">
      <button onClick={() => dispatch({ type: 'ROLL_DICE' })} disabled={isDisabled}>
        🎲を振る（残{rollsRemaining}回）
      </button>
    </div>
  );
}

function AnalysisModeActions() {
  const { gameState, dispatch } = useGame();

  return (
    <div className="dice-actions">
      {[0, 1, 2, 3].map((roll) => (
        <label key={roll}>
          <input
            type="radio"
            name="rollCount"
            value={roll}
            checked={gameState.rollCount === roll}
            onChange={() => dispatch({ type: 'SET_ROLLCOUNT', payload: roll as RollCount })}
          />
          {roll}投目
        </label>
      ))}
    </div>
  );
}

export default function DiceActions() {
  const {
    gameState: { mode },
  } = useGame();

  return mode === 'play' ? <PlayModeActions /> : <AnalysisModeActions />;
}
