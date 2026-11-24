import { useCallback, useEffect, useState } from 'react'
import Game from './pages/Game.jsx'
import Home from './pages/Home.jsx'
import { addScore, readScores, saveScores } from './services/scoreStorage.js'

function App() {
  const [game, setGame] = useState(null)
  const [scores, setScores] = useState(readScores)

  useEffect(() => {
    saveScores(scores)
  }, [scores])

  const finishGame = useCallback((result) => {
    setScores((previous) => addScore(previous, result))
  }, [])

  function startGame(playerName) {
    const id = crypto.getRandomValues(new Uint32Array(4)).join('-')
    setGame({ id, playerName })
  }

  return game ? (
    <Game
      key={game.id}
      gameId={game.id}
      playerName={game.playerName}
      onFinish={finishGame}
      onReplay={() => startGame(game.playerName)}
      onBack={() => setGame(null)}
    />
  ) : (
    <Home scores={scores} onPlay={startGame} />
  )
}

export default App
