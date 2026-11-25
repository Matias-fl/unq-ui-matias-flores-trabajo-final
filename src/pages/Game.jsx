import { useEffect } from 'react'
import GameResult from '../components/GameResult.jsx'
import GameStats from '../components/GameStats.jsx'
import WordChain from '../components/WordChain.jsx'
import WordForm from '../components/WordForm.jsx'
import useTurnTimer from '../hooks/useTurnTimer.js'
import { useValidateWord } from '../hooks/useValidateWord.js'
import './Game.css'

export default function Game({ gameId, playerName, onFinish, onReplay, onBack }) {
  const { input, updateInput, usedWords: words, error, isValidating, validateWord } = useValidateWord()
  const { deadline, secondsLeft, startTurn } = useTurnTimer()

  const lastLetter = words.at(-1)?.at(-1)
  const score = words.reduce((sum, word) => sum + word.length, 0)
  const isFinished = secondsLeft === 0

  useEffect(() => {
    if (isFinished) onFinish({ id: gameId, playerName, score })
  }, [gameId, isFinished, onFinish, playerName, score])

  function changeInput(value) {
    updateInput(value)

    if (deadline === null && value.trim()) {
      startTurn(performance.now())
    }
  }

  async function submitWord() {
    const validatedAt = await validateWord(deadline)
    if (validatedAt !== null) startTurn(validatedAt)
  }

  return (
    <main className="game">
      <div className="game__content">
        <h1>Palabras encadenadas</h1>

        {isFinished ? (
          <GameResult
            playerName={playerName}
            score={score}
            wordCount={words.length}
            onReplay={onReplay}
            onBack={onBack}
          />
        ) : (
          <>
            <GameStats score={score} lastWord={words.at(-1)} secondsLeft={secondsLeft} />
            <WordForm
              input={input}
              error={error}
              isValidating={isValidating}
              lastLetter={lastLetter}
              hasStarted={deadline !== null}
              onChange={changeInput}
              onSubmit={submitWord}
            />
          </>
        )}

        <WordChain words={words} />
      </div>
    </main>
  )
}
