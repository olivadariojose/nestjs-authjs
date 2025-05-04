import React from 'react'
import Button from '@mui/material/Button';
import { useFormikContext } from 'formik';
import { useBreakpoint } from '@/libraries/mui/useBreakpoints';

interface Props{
    variant? : 'text' | 'outlined' | 'contained'
}

export const ButtonForm = ({variant='contained'}:Props) => {
    const {submitForm, isSubmitting} = useFormikContext()
    const {isXs, isLg, isXl} =useBreakpoint()
  return (
    <Button 
        fullWidth={isXs || isLg || isXl}
        variant={variant}
        onClick={submitForm}
        disabled={isSubmitting}
    >
        Iniciar Sesion
    </Button>
  )
}
