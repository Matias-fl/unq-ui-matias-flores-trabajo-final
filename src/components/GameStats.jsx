import { useEffect, useState } from 'react'
import { TURN_SECONDS } from '../utils/gameRules.js'

export default function GameStats({ score, lastWord, secondsLeft }) {
  const [expiredWord, setExpiredWord] = useState(null)

  useEffect(() => {
    if (!lastWord) return
    const timeout = setTimeout(() => setExpiredWord(lastWord), 1500)
    return () => clearTimeout(timeout)
  }, [lastWord])

  return (
    <dl className="game__stats">
      <div>
        <dt>Puntaje</dt>
        <dd className="game__score">
          {score}
          {lastWord && lastWord !== expiredWord && (
            <small className="game__score-gain" title={lastWord}>
              +{lastWord.length}
            </small>
          )}
        </dd>
      </div>
      <div className={secondsLeft <= 3 ? 'game__timer game__timer--low' : 'game__timer'}>
        <dt>Tiempo restante</dt>
        <dd role="timer">
          {secondsLeft} s
          <span className="game__timer-track" aria-hidden="true">
            <span style={{ width: `${100 * secondsLeft / TURN_SECONDS}%` }} />
          </span>
        </dd>
      </div>
    </dl>
  )
}
