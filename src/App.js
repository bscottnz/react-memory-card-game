import { useEffect, useState } from 'react';
import Header from './components/Header';
import Game from './components/Game';
import Score from './components/Score';

function App() {
  // current score
  const [score, setScore] = useState(0);
  // high score
  const [highScore, setHighScore] = useState(0);

  const incrementScore = () => {
    setScore((prevScore) => {
      return prevScore + 1;
    });
  };

  const resetScore = () => {
    setScore(0);
  };

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score]);

  return (
    <div className="content">
      <Header />
      <Game incrementScore={incrementScore} resetScore={resetScore} />
      <Score score={score} highScore={highScore} />
    </div>
  );
}

export default App;
