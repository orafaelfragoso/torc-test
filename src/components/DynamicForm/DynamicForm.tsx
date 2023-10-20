import React, { ChangeEvent, FormEvent, ReactNode, useState } from 'react'
import useFormState from '@/hooks/useFormState'
import useFormDispatch from '@/hooks/useFormDispatch'
import { FormState } from '@/context/form'

export interface FieldConfig {
  type: 'text' | 'number' | 'select'
  textOnly?: boolean
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
    dispatch({ type: 'update', field: name, value, fields })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmittedData(formState)
    // @ts-ignore
    document.getElementById('formResult').showModal()
  }

  const handleData = (data: FormState | null): ReactNode => {
    if (data) {
      return Object.keys(data).map((field) => (
        <p key={field} className="py-1 ">
          <b>{field.charAt(0).toUpperCase() + field.slice(1)}</b>:{' '}
          {data[field].value}
        </p>
      ))
    }

    return null
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
                  required
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
                  required
                  onChange={handleInputChange}
                  value={formState[fieldName]?.value || ''}
                  className="input input-bordered w-full"
                />
              )}
              {formState[fieldName]?.error && (
                <label className="label">
                  <span className="label-text-alt text-red-500">
                    {formState[fieldName].error}
                  </span>
                </label>
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
          <h2 className="font-bold text-lg">Form</h2>
          {handleData(submittedData)}
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
