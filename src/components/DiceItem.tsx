import { useGame } from '../context/GameContext';
import { DICE_SYMBOLS } from '../constants/dice';

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
  const className = `dice-item ${showLockIcon ? 'dice-item--locked' : 'dice-item--unlocked'}`

  return (
    <div
      className={className}
      onClick={handleClick}
    >
      {DICE_SYMBOLS[diceValue]}
    </div>
  );
}
