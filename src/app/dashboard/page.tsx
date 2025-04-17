import React from 'react'
import { auth, signOut } from '../../../libraries/authjs/auth'
import { redirect } from 'next/navigation'
import { SignOutButton } from './SignOutButton'

const DashboardPage = async () => {


  const session = await auth()
  // if (!session) return <div>Not authenticated</div>

  if (!session) {
    redirect('/signin')
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
      <SignOutButton/>
    </div>
  )
}

export default DashboardPage