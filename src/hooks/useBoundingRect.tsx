import { useState, useCallback, useLayoutEffect } from 'react'

interface DimentionsProps {
  width?: number
  height?: number
  top?: number
  left?: number
  x?: number
  y?: number
  right?: number
  bottom?: number
}

const debounce = (limit: number, callback: () => void) => {
  let timeoutId: number
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(callback, limit, args)
  }
}

function getDimensionObject(node: HTMLElement) {
  const rect = node.getBoundingClientRect()
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    x: rect.x,
    y: rect.y,
    right: rect.right,
    bottom: rect.bottom,
  }
}

const defaultDimensions = {
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  x: 0,
  y: 0,
  right: 0,
  bottom: 0,
}

export default function useBoundingRect(limit?: number) {
  const [dimensions, setDimensions] =
    useState<DimentionsProps>(defaultDimensions)
  const [node, setNode] = useState<HTMLElement | null>(null)

  const ref = useCallback((node: HTMLElement) => {
    setNode(node)
  }, [])

  useLayoutEffect(() => {
    if ('undefined' !== typeof window && node) {
      const measure = () =>
        window.requestAnimationFrame(() =>
          setDimensions(getDimensionObject(node))
        )

      measure()

      const listener = debounce(limit ? limit : 100, measure)

      window.addEventListener('resize', listener)
      window.addEventListener('scroll', listener)
      return () => {
        window.removeEventListener('resize', listener)
        window.removeEventListener('scroll', listener)
      }
    }
  }, [node, limit])

  return [ref, dimensions, node] as const
}
