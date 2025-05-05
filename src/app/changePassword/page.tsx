import { redirect } from 'next/navigation'
import React from 'react'
import { auth } from '../../../auth'
import { ChangePasswordForm } from './components/ChangePasswordForm'
import Grid from '@mui/material/Grid';

const ChangePasswordPage = async () => {

  const session = await auth()
  // if (!session || !session.user?.mustBeChangepassword) {
  //   redirect("/dashboard")
  // }

  return (
    <Grid container height={'100vh'} justifyContent={'center'} alignItems={'center'}  >
      <ChangePasswordForm userId={session?.user?.id} />

    </Grid>
  )
}

export default ChangePasswordPage