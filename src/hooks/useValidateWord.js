import { useState } from 'react'
import Api from '../services/Api.js'
import { getWordError, normalizeWord } from '../utils/gameRules.js'

export function useValidateWord() {
  const [input, setInput] = useState('')
  const [usedWords, setUsedWords] = useState([])
  const [error, setError] = useState('')
  const [isValidating, setIsValidating] = useState(false)

  function updateInput(value) {
    setInput(value)
    setError('')
  }

  async function validateWord(deadline) {
    const word = normalizeWord(input)
    if (!word || isValidating || deadline === null || performance.now() >= deadline) return null

    const wordError = getWordError(word, usedWords)
    setError(wordError)
    if (wordError) return null

    setIsValidating(true)
    try {
      const result = await Api.getValidateWord(word)
      if (typeof result?.exists !== 'boolean') {
        throw new Error('Respuesta inválida del diccionario')
      }

      const validatedAt = performance.now()
      if (validatedAt >= deadline) return null

      if (!result.exists) {
        setError('La palabra no existe en el diccionario.')
        return null
      }

      setUsedWords((previous) => [...previous, word])
      setInput('')
      return validatedAt
    } catch {
      if (performance.now() < deadline) {
        setError('No pudimos consultar el diccionario. Volvé a intentar.')
      }
      return null
    } finally {
      setIsValidating(false)
    }
  }

  return { input, updateInput, usedWords, error, isValidating, validateWord }
}
