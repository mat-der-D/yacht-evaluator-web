import ModeTab from './ModeTab';
import GameHeader from './GameHeader';
import DiceDisplay from './DiceDisplay';
import DiceActions from './DiceActions';

export default function Layout() {
  return (
    <div className="layout">
      <ModeTab />
      <GameHeader />
      <DiceDisplay />
      <DiceActions />
      {/*<EvaluationButton></EvaluationButton>
      <ScoreSheet></ScoreSheet>*/}
    </div>
  );
}
