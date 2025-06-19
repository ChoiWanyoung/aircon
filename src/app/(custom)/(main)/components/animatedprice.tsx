'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedPriceProps {
  value: number
  duration?: number
}

export default function AnimatedPrice({ value, duration = 1500 }: AnimatedPriceProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const startValueRef = useRef(displayValue)

  useEffect(() => {
    const start = startValueRef.current
    const end = value
    const startTime = performance.now()

    const frame = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 0.3)
      const eased = 1 - Math.pow(1 - progress, 3)
      const newValue = Math.round(start + (end - start) * eased)
      setDisplayValue(newValue)
      if (progress < 1) {
        requestAnimationFrame(frame)
      } else {
        startValueRef.current = end // 끝난 값 저장
      }
    }

    requestAnimationFrame(frame)
  }, [value, duration])

  return (
    <span className="text-2xl font-bold text-blue-600 inline-block transition-all duration-300">
      {displayValue.toLocaleString()}원
    </span>
  )
}
