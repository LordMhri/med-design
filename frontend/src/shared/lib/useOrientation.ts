import { useEffect, useState } from 'react'

export type OrientationType = 'portrait' | 'landscape'

export interface OrientationState {
  type: OrientationType
  isLandscape: boolean
  isPortrait: boolean
  angle: number
}

function getOrientationState(): OrientationState {
  let isLandscape = false

  if (typeof window !== 'undefined') {
    if (window.matchMedia) {
      isLandscape = window.matchMedia('(orientation: landscape)').matches
    } else {
      isLandscape = window.innerWidth > window.innerHeight
    }
  }

  const angle = typeof window !== 'undefined' && window.screen && window.screen.orientation
    ? window.screen.orientation.angle
    : (typeof window !== 'undefined' && typeof window.orientation === 'number' ? (window.orientation as number) : 0)

  return {
    type: isLandscape ? 'landscape' : 'portrait',
    isLandscape,
    isPortrait: !isLandscape,
    angle,
  }
}

export function useOrientation(): OrientationState {
  const [state, setState] = useState<OrientationState>(getOrientationState)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateOrientation = () => {
      setState(getOrientationState())
    }

    // Listen to media query match changes
    const mediaQuery = window.matchMedia('(orientation: landscape)')
    const handleMediaChange = () => updateOrientation()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange)
    } else {
      mediaQuery.addListener(handleMediaChange)
    }

    // Screen orientation event listener if supported
    if (window.screen && window.screen.orientation) {
      window.screen.orientation.addEventListener('change', updateOrientation)
    }

    // Fallback resize listener for mobile browsers
    window.addEventListener('resize', updateOrientation)
    window.addEventListener('orientationchange', updateOrientation)

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange)
      } else {
        mediaQuery.removeListener(handleMediaChange)
      }

      if (window.screen && window.screen.orientation) {
        window.screen.orientation.removeEventListener('change', updateOrientation)
      }

      window.removeEventListener('resize', updateOrientation)
      window.removeEventListener('orientationchange', updateOrientation)
    }
  }, [])

  return state
}
