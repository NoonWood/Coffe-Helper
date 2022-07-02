import React, {
  FC,
  createContext,
  useContext,
  useReducer,
  ReducerAction,
  ReducerState,
  Dispatch,
  useMemo,
} from 'react'

import reducer, { initialState } from '../stor/reducers/timerReducer'
interface StateProviderProps {
  children: any
}

type ReducerType = typeof reducer

type ContextValueType = [
  ReducerState<ReducerType>,
  Dispatch<ReducerAction<ReducerType>>
]

export const Context = createContext<ContextValueType | null>(null)

export const StateProvider: FC<StateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value: ContextValueType = useMemo(
    () => [state, dispatch],
    [state, dispatch]
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useStateProvider() {
  const value = useContext(Context)
  if (value === null) {
    throw new Error('Не могу найти StateProvider')
  }
  return value
}
