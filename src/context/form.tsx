import React, { createContext, useReducer, Dispatch, ReactNode } from 'react'

export type FormState = Record<string, string | number>
type Action = { type: string; field: string; value: string | number }

export const FormStateContext = createContext<FormState | undefined>(undefined)
export const FormDispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined
)

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case 'update':
      return { ...state, [action.field]: action.value }
    default:
      return state
  }
}

interface FormProviderProps {
  children: ReactNode
}

const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, {})

  return (
    <FormStateContext.Provider value={state}>
      <FormDispatchContext.Provider value={dispatch}>
        {children}
      </FormDispatchContext.Provider>
    </FormStateContext.Provider>
  )
}

export { FormProvider }
