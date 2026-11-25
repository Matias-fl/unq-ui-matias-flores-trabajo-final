import './WordChain.css'

export default function WordChain({ words, title = 'Cadena de palabras', hideTitle = false }) {
  if (hideTitle) {
    return <WordTiles words={words} label={title} />
  }

  return (
    <section className="word-chain">
      <h2>{title}</h2>
      {words.length === 0 ? (
        <p>Todavía no hay palabras en la cadena.</p>
      ) : (
        <WordTiles words={words} label={title} />
      )}
    </section>
  )
}

function WordTiles({ words, label }) {
  return (
    <ol className="word-tiles" aria-label={label} role="list">
      {words.map((word, index) => (
        <li key={word}>
          {index > 0 && <span aria-hidden="true">→</span>}
          <span className="word-tiles__word">{word}</span>
        </li>
      ))}
    </ol>
  )
}
