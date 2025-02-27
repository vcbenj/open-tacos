import { RegisterOptions, useFormContext, UseFormReturn } from 'react-hook-form'
import clx from 'classnames'

interface InputProps {
  label: string
  name: string
  placeholder?: string
  registerOptions?: RegisterOptions
  className?: string
  classDefault?: string
  helper?: string | JSX.Element
  formContext?: UseFormReturn
  disabled?: boolean
  readOnly?: boolean
}

export default function Input ({ label, name, registerOptions, placeholder = '', className = '', classDefault = INPUT_DEFAULT_CSS, helper, formContext, disabled = false, readOnly = false }: InputProps): JSX.Element {
  const context = formContext == null ? useFormContext() : formContext
  const { register, formState: { errors } } = context
  const inputProps = register(name, registerOptions)
  const error = errors?.[name]
  return (
    <div className='form-control'>
      <label className='label' htmlFor={name}>
        <span className='label-text font-semibold'>{label}</span>
      </label>
      <input
        id={name}
        {...inputProps}
        type='text'
        placeholder={placeholder}
        className={clx(classDefault, className)}
        aria-label={label}
        aria-describedby={`${name}-helper`}
        disabled={disabled}
        readOnly={readOnly}
      />
      <label className='label' id={`${name}-helper`} htmlFor={name}>
        {error?.message != null &&
           (<span className='label-text-alt text-error'>{error?.message as string}</span>)}
        {(error == null) && helper}
      </label>
    </div>
  )
}

export const INPUT_DEFAULT_CSS = 'input input-primary input-bordered input-md focus:outline-0 focus:ring-1 focus:ring-primary'
