interface DiceItemProps {
  value: number;
}

export default function DiceItem({ value }: DiceItemProps) {
  const diceSymbols: Record<number, string> = {
    1: '⚀',
    2: '⚁',
    3: '⚂',
    4: '⚃',
    5: '⚄',
    6: '⚅',
  };

  return <div className="dice-item">{diceSymbols[value]}</div>;
}
