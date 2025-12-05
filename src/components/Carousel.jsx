import React, { useEffect, useState } from 'react'

const images = [
  '/Imagens/carrocel-1 1.png',
  '/Imagens/carrocel-2 1.png',
  '/Imagens/carrocel-3 1.png'
]

export default function Carousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % images.length), 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="carousel">
      <div className="carousel-items">
        {images.map((src, i) => (
          <div className={`imagem fade`} key={i} style={{ display: i === index ? 'block' : 'none' }}>
            <img src={src} alt={`carousel-${i}`} />
          </div>
        ))}
      </div>
      <a className="anterior" onClick={() => setIndex(i => (i - 1 + images.length) % images.length)} role="button" tabIndex="0">&#10094;</a>
      <a className="proximo" onClick={() => setIndex(i => (i + 1) % images.length)} role="button" tabIndex="0">&#10095;</a>
      <div className="indicadores">
        {images.map((_, i) => (
          <span key={i} className={`indicador ${i === index ? 'ativo' : ''}`} onClick={() => setIndex(i)} role="button" tabIndex="0"></span>
        ))}
      </div>
    </section>
  )
}
