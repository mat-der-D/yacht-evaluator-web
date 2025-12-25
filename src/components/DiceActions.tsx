import type { GameMode, RollCount } from '../types/game';

interface DiceActionsProps {
  mode: GameMode;
  rollCount: RollCount;
}

function PlayModeActions({ rollsRemaining }: { rollsRemaining: number }) {
  return (
    <div className="dice-actions">
      <button>[サイコロを振る] あと {rollsRemaining} 回</button>
    </div>
  );
}

function AnalysisModeActions({ rollCount }: { rollCount: RollCount }) {
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

export default function DiceActions({ mode, rollCount }: DiceActionsProps) {
  const rollsRemaining = Math.max(0, 3 - rollCount);

  return mode === 'play' ? (
    <PlayModeActions rollsRemaining={rollsRemaining} />
  ) : (
    <AnalysisModeActions rollCount={rollCount} />
  );
}
