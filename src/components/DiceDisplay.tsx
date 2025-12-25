import DiceItem from './DiceItem';

interface DiceDisplayProps {
  dice: number[];
}

export default function DiceDisplay({ dice }: DiceDisplayProps) {
  return (
    <div className="dice-display">
      {dice.map((value, index) => (
        <DiceItem key={index} value={value} />
      ))}
    </div>
  );
}
