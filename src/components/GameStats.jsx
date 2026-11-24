export default function GameStats({ score, secondsLeft }) {
  return (
    <dl className="game__stats">
      <div>
        <dt>Puntaje</dt>
        <dd>{score}</dd>
      </div>
      <div>
        <dt>Tiempo restante</dt>
        <dd role="timer">{secondsLeft} s</dd>
      </div>
    </dl>
  )
}
