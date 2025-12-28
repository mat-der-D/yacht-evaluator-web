import ScoreRow from './ScoreRow';

const upperCategories = [
  { key: 'ace' as const, label: 'Ace' },
  { key: 'deuce' as const, label: 'Deuce' },
  { key: 'trey' as const, label: 'Trey' },
  { key: 'four' as const, label: 'Four' },
  { key: 'five' as const, label: 'Five' },
  { key: 'six' as const, label: 'Six' },
];

const lowerCategories = [
  { key: 'choice' as const, label: 'Choice' },
  { key: 'fourOfAKind' as const, label: 'FourOfAKind' },
  { key: 'fullHouse' as const, label: 'Full House' },
  { key: 'smallStraight' as const, label: 'Small Straight' },
  { key: 'bigStraight' as const, label: 'Big Straight' },
  { key: 'yacht' as const, label: 'Yacht' },
];

export default function ScoreSheet() {
  return (
    <div className="score-sheet">
      <table>
        <tbody>
          {upperCategories.map((cat) => (
            <ScoreRow categoryKey={cat.key} label={cat.label} />
          ))}
          <ScoreRow categoryKey="upperTotal" label="Upper Total" />
          <ScoreRow categoryKey="bonus" label="Bonus" />
          {lowerCategories.map((cat) => (
            <ScoreRow categoryKey={cat.key} label={cat.label} />
          ))}
          <ScoreRow categoryKey="total" label="Total" />
        </tbody>
      </table>
    </div>
  );
}
