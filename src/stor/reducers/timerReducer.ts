import { AnyAction } from 'redux'

export type initialStateTupe = {
  timerLabel?: string | null
  isBusy: boolean | null
  timerValue: number | null
}

export const initialState: initialStateTupe = {
  timerLabel: 'Session',
  isBusy: false,
  timerValue: 60, // value in seconds
}

export const actionTypes = {
  START_TIMER: 'START_TIMER',
  RESET_TIMER: 'RESET_TIMER',
  TOGGLE_TIMER_LABEL: 'TOGGLE_TIMER_LABEL',
  TOGGLE_BUSY: 'TOGGLE_BUSY',
  SET_PROJECT_NAME: 'SET_PROJECT_NAME',
  SET_TIME: 'SET_TIME',
}

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.RESET_TIMER:
      return initialState
    case actionTypes.START_TIMER:
      return {
        ...state,
        timerValue: action.timerValue,
      }
    case actionTypes.TOGGLE_TIMER_LABEL:
      return {
        ...state,
        timerLabel: action.timerLabel,
      }
    case actionTypes.TOGGLE_BUSY:
      return {
        ...state,
        isBusy: action.isBusy,
      }
    case actionTypes.SET_TIME:
      return {
        ...state,
        timerValue: action.timerValue,
      }
    default:
      return state
  }
}

export default reducer
