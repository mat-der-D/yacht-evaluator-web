import Layout from './components/Layout';
import { GameProvider } from './context/GameContext';
import { useGame } from './context/GameContext';
import { useViewportHeight } from './hooks/useViewportHeight';

function AppContent() {
  const { gameState } = useGame();
  useViewportHeight();

  return (
    <div className={`app app--${gameState.mode}`}>
      <Layout />
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
