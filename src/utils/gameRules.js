export const TURN_SECONDS = 15

export function normalizeWord(word) {
  return word.trim().toLowerCase().normalize('NFC')
}

export function chainLetter(letter) {
  return letter.normalize('NFD').replace(/[\u0301\u0308]/g, '').normalize('NFC')
}

export function getWordError(word, words) {
  if (!/^[a-záéíóúüñ]+$/u.test(word)) {
    return 'Ingresá una sola palabra, usando letras.'
  }

  if (words.includes(word)) {
    return 'La palabra ya fue utilizada.'
  }

  const previousWord = words.at(-1)
  if (previousWord && chainLetter(word[0]) !== chainLetter(previousWord.at(-1))) {
    return `La palabra debe empezar con «${previousWord.at(-1)}».`
  }

  return ''
}
