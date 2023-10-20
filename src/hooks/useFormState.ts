import { useContext } from 'react'
import { FormStateContext } from '@/context/form'

export default function useFormState() {
  const context = useContext(FormStateContext)
  if (context === undefined) {
    throw new Error('useFormState must be used within a FormProvider')
  }
  return context
}
