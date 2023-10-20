import { useContext } from 'react'
import { FormDispatchContext } from '@/context/form'

export default function useFormDispatch() {
  const context = useContext(FormDispatchContext)
  if (context === undefined) {
    throw new Error('useFormDispatch must be used within a FormProvider')
  }
  return context
}
