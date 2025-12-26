import { useGame } from '../context/GameContext';
import DiceItem from './DiceItem';

export default function DiceDisplay() {
  const {
    gameState: { dice },
  } = useGame();

  return (
    <div className="dice-display">
      {dice.map((_, index) => (
        <DiceItem key={index} index={index} />
      ))}
    </div>
  );
}
