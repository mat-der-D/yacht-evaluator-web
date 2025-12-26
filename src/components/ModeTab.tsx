import { useGame } from '../context/GameContext';

const SELECTED_ICON = '●' as const;
const UNSELECTED_ICON = '○' as const;

export default function ModeTab() {
  const { gameState, dispatch } = useGame();

  return (
    <div className="mode-tab">
      <button onClick={() => dispatch({ type: 'CHANGE_MODE', payload: 'play' })}>
        {gameState.mode === 'play' ? SELECTED_ICON : UNSELECTED_ICON} プレイ
      </button>
      <button onClick={() => dispatch({ type: 'CHANGE_MODE', payload: 'analysis' })}>
        {gameState.mode === 'analysis' ? SELECTED_ICON : UNSELECTED_ICON} 局面解析
      </button>
    </div>
  );
}
