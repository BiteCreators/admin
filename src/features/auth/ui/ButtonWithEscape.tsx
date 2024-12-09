import React, { useEffect, useState } from 'react'

import { Button } from '@packages/shared/ui'

export const ButtonWithEscape = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const getRandomOffset = () => {
    const angle = Math.random() * 2 * Math.PI
    const distance = Math.random() * 40 + 30

    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    const mouseX = e.clientX
    const mouseY = e.clientY

    const button = document.getElementById('escape-button')

    if (button) {
      const rect = button.getBoundingClientRect()
      const buttonX = rect.left + rect.width / 2
      const buttonY = rect.top + rect.height / 2

      const distanceX = mouseX - buttonX
      const distanceY = mouseY - buttonY

      if (Math.abs(distanceX) < 30 && Math.abs(distanceY) < 30) {
        const randomOffset = getRandomOffset()

        setPosition(randomOffset)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <Button
      id={'escape-button'}
      style={{
        cursor: 'default',
        position: 'relative',
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.3s ease',
      }}
      variant={'outline'}
    >
      No
    </Button>
  )
}
