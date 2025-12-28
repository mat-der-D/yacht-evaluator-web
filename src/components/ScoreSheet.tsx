import ScoreRow from './ScoreRow';
import { CATEGORY_LABELS, type CategoryKey } from '../constants/categories';
import type { ScoreSheet } from '../types/game';

const categories: CategoryKey[] = [
  'ace',
  'deuce',
  'trey',
  'four',
  'five',
  'six',
  'upperTotal',
  'bonus',
  'choice',
  'fourOfAKind',
  'fullHouse',
  'smallStraight',
  'bigStraight',
  'yacht',
  'total',
]

const keyLabelPairs = categories.map((key) => ({ key, label: CATEGORY_LABELS[key] }))

export default function ScoreSheet() {
  return (
    <div className="score-sheet">
      <table>
        <tbody>
          {keyLabelPairs.map((cat) => (<ScoreRow categoryKey={cat.key} label={cat.label} />))}
        </tbody>
      </table>
    </div>
  );
}
