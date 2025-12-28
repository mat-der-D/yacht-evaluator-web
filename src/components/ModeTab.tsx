import { useGame } from '../context/GameContext';

const SELECTED_ICON = '●' as const;
const UNSELECTED_ICON = '○' as const;

export default function ModeTab() {
  const {
    gameState: { mode },
    dispatch,
  } = useGame();

  return (
    <div className={`mode-tab mode-tab--${mode}`}>
      <button
        className={mode === 'play' ? 'active' : ''}
        onClick={() => dispatch({ type: 'CHANGE_MODE', payload: 'play' })}
      >
        {mode === 'play' ? SELECTED_ICON : UNSELECTED_ICON} プレイ
      </button>
      <button
        className={mode === 'analysis' ? 'active' : ''}
        onClick={() => dispatch({ type: 'CHANGE_MODE', payload: 'analysis' })}
      >
        {mode === 'analysis' ? SELECTED_ICON : UNSELECTED_ICON} 局面解析
      </button>
    </div>
  );
}
