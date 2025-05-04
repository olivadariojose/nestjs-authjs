import Grid from '@mui/material/Grid';
import React from 'react'
import { Typography } from '@mui/material';
import { TextfieldPassword } from '@/compnents-general/inputs/TextfieldPassword';
import { ButtonForm } from './ButtonForm';

export const FormContent = () => {
    return (
        <Grid container spacing={{ xs: 4 }} maxWidth={'sm'} paddingX={{ xs: 2, sm: 4 }} paddingY={{ xs: 4, sm: 5 }} >

            <Grid size={12}  >
                <Typography variant='h4' align='center' >Cambiar Contraseña</Typography>
            </Grid>
            <Grid size={12} >
                <TextfieldPassword name='newPassword' label='Nueva Contraseña' />
            </Grid>

            <Grid size={12} >
                <TextfieldPassword name='confirmNewPassword' label='Confirma Contraseña' />
            </Grid>

            <Grid size={12} >
                <ButtonForm />
            </Grid>
        </Grid>

    )
}
