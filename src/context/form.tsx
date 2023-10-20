import React, { createContext, useReducer, Dispatch, ReactNode } from 'react'
import { FieldConfig } from '@/components/DynamicForm'

export type FormState = {
  [key: string]: {
    name: string
    value: string | number
    error?: string
  }
}

type Action = {
  type: string
  field: string
  value: string | number
  fields: { [key: string]: FieldConfig }
}

export const FormStateContext = createContext<FormState | undefined>(undefined)
export const FormDispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined
)

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case 'update':
      const field = action.fields[action.field]

      if (field.textOnly) {
        const pattern = new RegExp(/[a-zA-Z]+$/i)
        if (!pattern.test(String(action.value))) {
          return {
            ...state,
            [action.field]: {
              name: action.field,
              value: action.value,
              error: 'You cannot type numbers'
            }
          }
        }
      }

      return {
        ...state,
        [action.field]: {
          name: action.field,
          value: action.value
        }
      }
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
