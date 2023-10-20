import React, { ChangeEvent, FormEvent, useState } from 'react'
import useFormState from '@/hooks/useFormState'
import useFormDispatch from '@/hooks/useFormDispatch'
import { FormState } from '@/context/form'

export interface FieldConfig {
  type: 'text' | 'number' | 'select'
  label: string
  options?: string[]
}

export interface DynamicFormProps {
  fields: { [key: string]: FieldConfig }
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields }) => {
  const [submittedData, setSubmittedData] = useState<FormState | null>(null)
  const formState = useFormState()
  const dispatch = useFormDispatch()

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    dispatch({ type: 'update', field: name, value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmittedData(formState)
    // @ts-ignore
    document.getElementById('formResult').showModal()
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md p-2">
        <form onSubmit={handleSubmit}>
          {Object.entries(fields).map(([fieldName, fieldConfig]) => (
            <div key={fieldName} className="form-control w-full">
              <label className="label" htmlFor={fieldName}>
                <span className="label-text">{fieldConfig.label}</span>
              </label>
              {fieldConfig.type === 'select' ? (
                <select
                  name={fieldName}
                  onChange={handleInputChange}
                  className="select select-bordered"
                >
                  {fieldConfig.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={fieldConfig.type}
                  name={fieldName}
                  onChange={handleInputChange}
                  value={formState[fieldName] || ''}
                  className="input input-bordered w-full"
                />
              )}
            </div>
          ))}
          <button type="submit" className="btn mt-4">
            Submit
          </button>
        </form>
      </div>
      <dialog id="formResult" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Form</h3>
          <pre className="p-4">{JSON.stringify(submittedData, null, 2)}</pre>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default DynamicForm
