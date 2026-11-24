import { useState } from 'react'
import WordChain from '../components/WordChain.jsx'
import { TURN_SECONDS } from '../utils/gameRules.js'
import './Home.css'

const EXAMPLE_WORDS = ['casa', 'árbol', 'luna']

export default function Home({ scores, onPlay }) {
  const [playerName, setPlayerName] = useState('')

  function handlePlay(event) {
    event.preventDefault()
    const name = playerName.trim()
    if (name) onPlay(name)
  }

  return (
    <main className="home">
      <div className="home__content">
        <header>
          <h1>Palabras encadenadas</h1>
          <p>
            Escribí palabras que empiecen con la última letra de la anterior.
            <br />
            Tenés {TURN_SECONDS} segundos por turno.
          </p>
        </header>

        <WordChain words={EXAMPLE_WORDS} title="Ejemplo de cadena" hideTitle />
        <form className="home__form" onSubmit={handlePlay}>
          <label htmlFor="player-name">Tu nombre</label>
          <input
            id="player-name"
            autoComplete="nickname"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
            required
          />
          <button className="home__play" type="submit" disabled={!playerName.trim()}>
            Jugar
          </button>
        </form>

        <section className="home__scores">
          <h2>Mejores puntajes</h2>
          {scores.length === 0 ? (
            <p>Todavía no hay puntajes.</p>
          ) : (
            <ol className="home__score-list" role="list">
              {scores.map(({ id, playerName, score }) => (
                <li key={id}>
                  <div><span>{playerName}</span><strong>{score} {score === 1 ? 'punto' : 'puntos'}</strong></div>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
    </main>
  )
}
