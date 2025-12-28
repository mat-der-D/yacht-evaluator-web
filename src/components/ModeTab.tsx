import { useGame } from '../context/GameContext';

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
        🎲 遊ぶ 🎲
      </button>
      <button
        className={mode === 'analysis' ? 'active' : ''}
        onClick={() => dispatch({ type: 'CHANGE_MODE', payload: 'analysis' })}
      >
        📊 分析する 📊
      </button>
    </div>
  );
}
