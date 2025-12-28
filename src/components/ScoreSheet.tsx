import { useGame } from '../context/GameContext';
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
];

const keyLabelPairs = categories.map((key) => ({ key, label: CATEGORY_LABELS[key] }));

export default function ScoreSheet() {
  const { dispatch } = useGame();

  const handleReset = () => {
    if (window.confirm('本当にリセットしてよろしいですか？')) {
      dispatch({ type: 'RESET_GAME' });
    }
  };

  return (
    <div className="score-sheet">
      <table>
        <tbody>
          {keyLabelPairs.map((cat) => (
            <ScoreRow key={cat.key} categoryKey={cat.key} label={cat.label} />
          ))}
        </tbody>
      </table>
      <button className="reset-button" onClick={handleReset}>
        リセット
      </button>
    </div>
  );
}
