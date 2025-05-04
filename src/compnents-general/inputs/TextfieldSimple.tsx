import React from 'react'
import TextField, { TextFieldVariants } from '@mui/material/TextField';
import { useField } from 'formik';

interface Props {
  name: string
  label: string
  variant?: TextFieldVariants
  type?: string

}

export const TextfieldSimple = ({ name, label, variant = 'outlined' }: Props) => {

  const [field, meta] = useField(name)

  return (
    <TextField
      id={name}
      autoComplete='off'
      label={label}
      variant={variant}
      fullWidth
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      {...field}
    />
  )
}
