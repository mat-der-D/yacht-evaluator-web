import { useState } from 'react';
import { initialGameState } from './types/game';
import Layout from './components/Layout';

export default function App() {
  const [gameState, setGameState] = useState(initialGameState);

  return <Layout gameState={gameState} setGameState={setGameState} />;
}
