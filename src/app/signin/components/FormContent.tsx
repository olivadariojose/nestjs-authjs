import Grid from '@mui/material/Grid';
import React from 'react'
import { TextfieldPassword } from '../../../compnents-general/inputs/TextfieldPassword';
import { TextfieldSimple } from '../../../compnents-general/inputs/TextfieldSimple';
import { ButtonForm } from './ButtonForm';
import { Divider, Stack, Typography } from '@mui/material';

export const FormContent = () => {
    return (
        <Grid container spacing={{xs:4}} maxWidth={'sm'} paddingX={{ xs: 2, sm:4 }} paddingY={{xs:4, sm:5}} >

            <Grid size={{xs:12, sm:12, md:12, lg:6}} alignItems={'center'} justifyContent={'center'} display={'flex'} >
                <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} >
                    <Typography fontWeight={'bold'} >inventar</Typography>
                    <Typography color='primary' variant='h5' >IA</Typography>
                </Stack>
                <Divider/>
            </Grid>

            <Grid container spacing={{ xs: 4 }} size={{xs:12, sm:12, md:12, lg:6}}   >
                <Grid size={12}  >
                    <Typography variant='h4' align='center' >Iniciar Sesión</Typography>
                </Grid>
                <Grid size={12} >
                    <TextfieldSimple name='email' label='Email' />
                </Grid>

                <Grid size={12} >
                    <TextfieldPassword name='password' label='Contraseña' />
                </Grid>

                <Grid size={12} >
                    <ButtonForm />
                </Grid>
            </Grid>
        </Grid>

    )
}
