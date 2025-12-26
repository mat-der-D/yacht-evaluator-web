import Layout from './components/Layout';
import { GameProvider } from './context/GameContext';

export default function App() {
  return (
    <GameProvider>
      <Layout />
    </GameProvider>
  );
}
