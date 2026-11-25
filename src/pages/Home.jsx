import { useRef, useState } from 'react'
import WordChain from '../components/WordChain.jsx'
import { TURN_SECONDS } from '../utils/gameRules.js'
import './Home.css'

const EXAMPLE_WORDS = ['casa', 'árbol', 'luna']

export default function Home({ scores, onPlay }) {
  const [playerName, setPlayerName] = useState('')
  const rulesDialog = useRef(null)

  function handlePlay(event) {
    event.preventDefault()
    const name = playerName.trim()
    if (name) onPlay(name)
  }

  return (
    <main className="home">
      <button type="button" className="home__rules" aria-haspopup="dialog"
        onClick={() => rulesDialog.current.showModal()}>
        <span aria-hidden="true">?</span> Reglas
      </button>
      <dialog ref={rulesDialog} className="rules-dialog" aria-labelledby="rules-title">
        <form method="dialog">
          <h2 id="rules-title">Cómo jugar</h2>
          <button className="rules-dialog__close" aria-label="Cerrar reglas">×</button>
          <p>Formá la cadena más larga que puedas antes de que se acabe el tiempo.</p>
          <ol>
            <li>Elegí cualquier palabra del diccionario español para empezar. El reloj arranca cuando empezás a escribirla.</li>
            <li>Seguí con otra palabra del diccionario que empiece con la <strong>última letra de la última palabra aceptada</strong>. Usá cada palabra una sola vez por partida.</li>
            <li>Tenés <strong>{TURN_SECONDS} segundos por turno</strong>. Cada palabra aceptada vuelve a poner el reloj en {TURN_SECONDS} y suma <strong>un punto por letra</strong>. Por ejemplo, {EXAMPLE_WORDS.join(' → ')} suma 13 puntos.</li>
            <li>Si la palabra no existe, está repetida o no encadena, vas a ver el motivo. La cadena y el puntaje quedan igual. El reloj sigue corriendo y podés volver a intentar.</li>
            <li>Cuando el reloj llega a cero, termina la partida. Vas a ver tu puntaje final y cuántas palabras encadenaste. Los diez mejores puntajes quedan en el ranking local.</li>
          </ol>
          <button className="home__play">Entendido</button>
        </form>
      </dialog>
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
          <label htmlFor="player-name">Ingresa tu nombre</label>
          <div className="home__name">
            <input
            id="player-name"
            autoComplete="nickname"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
            maxLength={20}
            required
            />
            <small aria-hidden="true">{playerName.length}/20</small>
          </div>
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
