import React from 'react'
import { redirect } from 'next/navigation'
import { SignOutButton } from './SignOutButton'
import { auth } from '../../../auth'

const DashboardPage = async () => {


  const session = await auth()
  // if (!session) return <div>Not authenticated</div>

  // console.log('La sesion en DASHBOARD: ', session)

  if (!session) {
    redirect('/signin')
  }


  if (session.user?.mustBeChangepassword) {
    redirect("/changePassword")
  }

  return (
    <div>
      DashboardPage
      <div>
        {
          JSON.stringify(session, null, 2)
        }
      </div>
      {/* <form
        action={async () => {
          "use server"
          await signOut()
          redirect('/signin')
        }}
      >
        <button type="submit">Sign Out</button>
      </form> */}
      <SignOutButton />
    </div>
  )
}

export default DashboardPage