import { useState, useEffect, useRef } from 'react'

export function useTypewriter(text, options = {}) {
  const { speed = 45, humanize = true, onFinished } = options
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const index = useRef(0)
  const timerRef = useRef(null)

  useEffect(() => {
    index.current = 0
    setDisplayed('')
    setDone(false)

    const tick = () => {
      if (index.current >= text.length) {
        setDone(true)
        onFinished?.()
        return
      }

      const char = text[index.current]
      let delay = speed

      if (humanize) {
        if (char === '.' || char === '!' || char === '?') delay = speed * 6
        else if (char === ',') delay = speed * 3
        else if (char === '\n') delay = speed * 8
        else if (char === ' ') delay = speed * 0.8
        else delay = speed * (0.8 + Math.random() * 0.6)
      }

      index.current++
      setDisplayed(prev => prev + char)
      timerRef.current = setTimeout(tick, delay)
    }

    timerRef.current = setTimeout(tick, 600)
    return () => clearTimeout(timerRef.current)
  }, [text])

  return { displayed, done }
}