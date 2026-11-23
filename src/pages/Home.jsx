import WordChain from '../components/WordChain.jsx'
import { TURN_SECONDS } from '../utils/gameRules.js'
import './Home.css'

const EXAMPLE_WORDS = ['casa', 'árbol', 'luna']

export default function Home() {
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
        <button className="home__play" type="button" disabled>Jugar</button>

        <section className="home__scores">
          <h2>Mejores puntajes</h2>
          <p>Todavía no hay puntajes.</p>
        </section>
      </div>
    </main>
  )
}
