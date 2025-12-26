import { useGame } from '../context/GameContext';

function PlayModeActions() {
  const {
    gameState: { rollCount },
    dispatch,
  } = useGame();
  const rollsRemaining = Math.max(0, 3 - rollCount);

  return (
    <div className="dice-actions">
      <button onClick={() => dispatch({ type: 'ROLL_DICE' })}>
        [サイコロを振る] あと {rollsRemaining} 回
      </button>
    </div>
  );
}

function AnalysisModeActions() {
  return (
    <div className="dice-actions">
      {[0, 1, 2, 3].map((roll) => (
        <label key={roll}>
          <input type="radio" name="rollCount" value={roll} />
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
