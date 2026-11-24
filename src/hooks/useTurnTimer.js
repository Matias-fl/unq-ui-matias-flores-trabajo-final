import { useEffect, useState } from 'react'
import { TURN_SECONDS } from '../utils/gameRules.js'

const TURN_DURATION = TURN_SECONDS * 1000

export default function useTurnTimer() {
  const [deadline, setDeadline] = useState(null)
  const [clock, setClock] = useState(0)

  const secondsLeft = deadline === null
    ? TURN_SECONDS
    : Math.max(0, Math.ceil((deadline - clock) / 1000))

  useEffect(() => {
    if (deadline === null) return

    const interval = setInterval(() => {
      const now = performance.now()
      setClock(now)
      if (now >= deadline) clearInterval(interval)
    }, 100)

    return () => clearInterval(interval)
  }, [deadline])

  function startTurn(now) {
    const nextDeadline = now + TURN_DURATION
    setClock(now)
    setDeadline(nextDeadline)
    return nextDeadline
  }

  return { deadline, secondsLeft, startTurn }
}
