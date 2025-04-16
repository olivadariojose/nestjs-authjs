import React from 'react'
import { auth, signOut } from '../../../libraries/authjs/auth'

const DashboardPage = async () => {

    const session = await auth()
    if (!session) return <div>Not authenticated</div>

  return (
    <div>
        DashboardPage
        <div>
            {
                JSON.stringify(session, null, 2)
            }
        </div>
        <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
    </div>
  )
}

export default DashboardPage