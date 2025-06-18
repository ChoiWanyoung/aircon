'use client'

import { useEffect, useState } from 'react'

interface AnimatedPriceProps {
  value: number
  duration?: number
}

export default function AnimatedPrice({ value, duration = 1500 }: AnimatedPriceProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const start = displayValue
    const end = value
    const startTime = performance.now()
    setAnimate(true)

    const frame = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const newValue = Math.round(start + (end - start) * eased)
      setDisplayValue(newValue)
      if (progress < 1) requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
    const timeout = setTimeout(() => setAnimate(false), 300)
    return () => clearTimeout(timeout)
  }, [value])

  return (
    <span
      className={`text-3xl font-bold text-blue-600 inline-block transition-all duration-300 ${
        animate ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {displayValue.toLocaleString()}원
    </span>
  )
}
