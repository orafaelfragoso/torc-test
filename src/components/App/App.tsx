import DynamicForm, { FieldConfig } from '@/components/DynamicForm'
import { FormProvider } from '@/context/form'

const formConfig: { [key: string]: FieldConfig } = {
  name: { type: 'text', label: 'Name' },
  age: { type: 'number', label: 'Age' },
  country: {
    type: 'select',
    label: 'Country',
    options: ['USA', 'Canada', 'UK', 'Other']
  }
}

export default function App() {
  return (
    <FormProvider>
      <DynamicForm fields={formConfig} />
    </FormProvider>
  )
}
