'use client'
import { linksByRole } from '@/utils/rolesRoutes'
import { useSession } from 'next-auth/react'
import React from 'react'

export const LinkRoles = () => {
  const { data: session } = useSession()
  const role = session?.user?.rolId?.nameRole

  return (
    <aside>
      <a href="/profile">Perfil</a>
      <a href="/configuration">Configuración</a>
      {linksByRole[role]?.map(link => (
        <a key={link} href={`/${link.toLowerCase()}`}>{link}</a>
      ))}
    </aside>
  )
}
