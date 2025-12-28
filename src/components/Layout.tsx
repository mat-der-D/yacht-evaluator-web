import ModeTab from './ModeTab';
import GameHeader from './GameHeader';
import DiceDisplay from './DiceDisplay';
import DiceActions from './DiceActions';
import ScoreSheet from './ScoreSheet';
import EvaluationButton from './EvaluationButton';

export default function Layout() {
  return (
    <div className="layout">
      <ModeTab />
      <GameHeader />
      <DiceDisplay />
      <DiceActions />
      <EvaluationButton />
      <ScoreSheet></ScoreSheet>
    </div>
  );
}
