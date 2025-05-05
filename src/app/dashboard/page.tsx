import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '../../../auth'
import { BottomBarComponent } from '@/compnents-general/Dashboard/BottomBar/BottomBarComponent'

const DashboardPage = async () => {
  // const session = await auth()
  // if (!session) return <div>Not authenticated</div>

  // console.log('La sesion en DASHBOARD: ', session)

  // console.log('session', session)


  // if (!session) {
  //   redirect('/signin')
  // }


  // if (session.user?.mustBeChangepassword) {
  //   redirect("/changePassword")
  // }
  return (
    <div>
      DashboardPage
      <BottomBarComponent/>
    </div>
  )
}

export default DashboardPage