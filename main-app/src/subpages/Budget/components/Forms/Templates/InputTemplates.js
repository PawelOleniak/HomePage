import { InputWrapper } from './InputTemplatesCss';

export function Input({ input, meta, fieldType = 'text', step, placeholder, description, disabled }) {
  return (
    <InputWrapper>
      <label>{description ? description : fieldType}</label>

      <input
        {...input}
        step={step}
        disabled={disabled}
        defaultValue={'Reset'}
        type={disabled ? 'clear' : fieldType}
        placeholder={placeholder ? placeholder : fieldType}
      />
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </InputWrapper>
  );
}
export function Select({ input, meta, options, description, initialValue }) {
  return (
    <InputWrapper>
      <label>{description}</label>
      <select {...input} initialvalue={initialValue}>
        {options}
      </select>
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </InputWrapper>
  );
}
