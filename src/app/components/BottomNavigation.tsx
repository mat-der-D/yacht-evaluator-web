import { useGame } from '../context/GameContext';

export default function BottomNavigation() {
  const { gameState, dispatch } = useGame();
  const { mode } = gameState;

  return (
    <nav className="bottom-nav">
      <button
        className={`bottom-nav__item ${mode === 'play' ? 'bottom-nav__item--active' : ''}`}
        onClick={() => dispatch({ type: 'CHANGE_MODE', payload: 'play' })}
        aria-label="遊ぶモードに切り替え"
      >
        <span className="bottom-nav__icon">🎲</span>
        <span className="bottom-nav__label">遊ぶ</span>
      </button>
      <button
        className={`bottom-nav__item ${mode === 'analysis' ? 'bottom-nav__item--active' : ''}`}
        onClick={() => dispatch({ type: 'CHANGE_MODE', payload: 'analysis' })}
        aria-label="分析するモードに切り替え"
      >
        <span className="bottom-nav__icon">🔍</span>
        <span className="bottom-nav__label">分析する</span>
      </button>
    </nav>
  );
}
