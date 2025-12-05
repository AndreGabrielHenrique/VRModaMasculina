import React, { useEffect, useState } from 'react'

export default function ScrollButton() {
  const [top, setTop] = useState(false)

  useEffect(() => {
    function onScroll() {
      setTop(window.scrollY >= 100)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button type="button" className={`scrollpagina ${top ? 'topo' : 'inferior'}`} onClick={() => {
      if (window.scrollY >= 100) window.scrollTo({ top: 0 })
      else window.scrollTo({ top: document.body.scrollHeight })
    }} />
  )
}
