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
  const diceValue = gameState.dice[index];
  const handleClick = () => {
    if (gameState.mode === 'play') {
      dispatch({ type: 'LOCK_DICE', payload: index });
    } else {
      dispatch({ type: 'INCREMENT_DICE', payload: index });
    }
  };
  return (
    <div className="dice-item" onClick={handleClick}>
      {diceSymbols[diceValue]}
    </div>
  );
}
