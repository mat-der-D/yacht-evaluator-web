import { useGame } from "../context/GameContext";

export default function DiceItem({ index }: { index: number }) {
  const diceSymbols: Record<number, string> = {
    1: '⚀',
    2: '⚁',
    3: '⚂',
    4: '⚃',
    5: '⚄',
    6: '⚅',
  };

  const { gameState } = useGame()
  const diceValue = gameState.dice[index]
  return <div className="dice-item">{diceSymbols[diceValue]}</div>;
}
