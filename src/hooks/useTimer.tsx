import { useStateProvider } from '../contexts/stateProvider'

export function useTimer() {
  const [{ timerValue }] = useStateProvider()

  let minutes: number = Math.floor(timerValue / 60)
  let seconds: number = timerValue - minutes * 60

  return `${lengthСheck(minutes)}:${lengthСheck(seconds)}`
}

function lengthСheck(value: number): string {
  if (value < 10) {
    return '0' + value
  }
  return value.toString()
}
