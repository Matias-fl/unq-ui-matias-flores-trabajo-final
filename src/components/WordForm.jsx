import { useRef } from 'react'

export default function WordForm({ input, error, isValidating, lastLetter, hasStarted, onChange, onSubmit }) {
  const inputRef = useRef(null)

  function handleSubmit(event) {
    event.preventDefault()
    inputRef.current.focus()
    onSubmit()
  }

  return (
    <form className="game__form" onSubmit={handleSubmit}>
      <label htmlFor="game-word">
        {lastLetter
          ? <>Escribí una palabra que empiece con <strong>«{lastLetter}»</strong></>
          : 'Escribí tu primera palabra'}
      </label>
      <div className="game__controls">
        <input
          id="game-word"
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="off"
          spellCheck={false}
          readOnly={isValidating}
          aria-describedby="game-feedback"
        />
        <button className="game__button" type="submit" disabled={isValidating || !input.trim()}>
          Enviar
        </button>
      </div>
      <p id="game-feedback" className={error ? 'game__feedback game__feedback--error' : 'game__feedback'} role="status">
        {isValidating ? 'Validando palabra…' : error || (!hasStarted && 'El tiempo empieza apenas escribas.')}
      </p>
    </form>
  )
}
