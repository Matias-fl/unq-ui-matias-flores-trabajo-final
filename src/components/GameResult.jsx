export default function GameResult({ playerName, score, wordCount, onReplay, onBack }) {
  return (
    <section className="game__result" aria-live="polite">
      <h2>Partida terminada</h2>
      <p className="game__player">Jugador: <strong>{playerName}</strong></p>
      <p>Puntaje final: <strong>{score}</strong></p>
      <p>Palabras encadenadas: <strong>{wordCount}</strong></p>
      <div className="game__result-actions">
        <button className="game__button" type="button" onClick={onReplay}>Jugar otra vez</button>
        <button className="game__button" type="button" onClick={onBack}>Volver al inicio</button>
      </div>
    </section>
  )
}
