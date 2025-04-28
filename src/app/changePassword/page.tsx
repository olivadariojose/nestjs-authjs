
import { redirect } from 'next/navigation'
import React from 'react'
import { auth } from '../../../auth'
import ChangePasswordForm from './ChangePasswordForm'

const ChangePassword = async () => {
  const session = await auth()
  if (!session || !session.user?.mustBeChangepassword) {
    redirect("/dashboard")
  }

  console.log("session", session)


  return (
    <ChangePasswordForm userId={session?.user?.id} />
  )
}

export default ChangePassword
