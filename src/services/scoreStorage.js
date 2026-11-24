const STORAGE_KEY = 'palabras-encadenadas-scores'
const SCORE_LIMIT = 10

export function readScores() {
  try {
    const scores = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!Array.isArray(scores)) return []

    return scores
      .filter((entry) => typeof entry?.id === 'string'
        && typeof entry.playerName === 'string'
        && entry.playerName.trim()
        && Number.isInteger(entry.score)
        && entry.score >= 0)
      .sort((first, second) => second.score - first.score)
      .slice(0, SCORE_LIMIT)
  } catch {
    return []
  }
}

export function addScore(scores, result) {
  if (scores.some(({ id }) => id === result.id)) return scores

  return [...scores, result]
    .sort((first, second) => second.score - first.score)
    .slice(0, SCORE_LIMIT)
}

export function saveScores(scores) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
  } catch {
  }
}
