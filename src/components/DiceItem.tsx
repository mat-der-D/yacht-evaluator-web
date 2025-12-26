import { useGame } from '../context/GameContext';

export default function DiceItem({ index }: { index: number }) {
  const diceSymbols: Record<number, string> = {
    1: '⚀',
    2: '⚁',
    3: '⚂',
    4: '⚃',
    5: '⚄',
    6: '⚅',
  };

  const { gameState, dispatch } = useGame();

  const handleClick = () => {
    if (gameState.mode === 'play') {
      dispatch({ type: 'LOCK_DICE', payload: index });
    } else {
      dispatch({ type: 'INCREMENT_DICE', payload: index });
    }
  };

  const diceValue = gameState.dice[index];
  const isLocked = gameState.lockedDice[index];

  return (
    <div className={isLocked ? 'dice-item--locked' : 'dice-item--unlocked'} onClick={handleClick}>
      {diceSymbols[diceValue]}
    </div>
  );
}
