import { useGame } from '../context/GameContext';

interface DotPosition {
  row: number;
  col: number;
}

const DOT_PATTERNS: Record<number, DotPosition[]> = {
  1: [{ row: 2, col: 2 }],
  2: [
    { row: 1, col: 3 },
    { row: 3, col: 1 },
  ],
  3: [
    { row: 1, col: 3 },
    { row: 2, col: 2 },
    { row: 3, col: 1 },
  ],
  4: [
    { row: 1, col: 1 },
    { row: 1, col: 3 },
    { row: 3, col: 1 },
    { row: 3, col: 3 },
  ],
  5: [
    { row: 1, col: 1 },
    { row: 1, col: 3 },
    { row: 2, col: 2 },
    { row: 3, col: 1 },
    { row: 3, col: 3 },
  ],
  6: [
    { row: 1, col: 1 },
    { row: 1, col: 3 },
    { row: 2, col: 1 },
    { row: 2, col: 3 },
    { row: 3, col: 1 },
    { row: 3, col: 3 },
  ],
};

export default function DiceItem({ index }: { index: number }) {
  const { gameState, dispatch } = useGame();

  const handleClick = () => {
    if (gameState.mode === 'play') {
      dispatch({ type: 'TOGGLE_DICE_LOCK', payload: index });
    } else {
      dispatch({ type: 'INCREMENT_DICE', payload: index });
    }
  };

  const diceValue = gameState.dice[index];
  const isLocked = gameState.lockedDice[index];
  const showLockIcon = isLocked && gameState.mode === 'play';
  const dots = DOT_PATTERNS[diceValue] || [];

  const ariaLabel =
    gameState.mode === 'play'
      ? `ダイス ${diceValue}${isLocked ? '、ロック中' : '、解除'}`
      : `ダイス ${diceValue}、クリックで値を変更`;

  return (
    <div
      className={`dice-item ${showLockIcon ? 'dice-item--locked' : 'dice-item--unlocked'}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="dice-item__face">
        {dots.map((dot, i) => (
          <div
            key={i}
            className={`dice-item__dot ${diceValue === 1 ? 'dice-item__dot--one' : ''}`}
            style={{
              gridRow: dot.row,
              gridColumn: dot.col,
            }}
          />
        ))}
      </div>
      {showLockIcon && <span className="dice-item__lock-icon">🔒</span>}
    </div>
  );
}
