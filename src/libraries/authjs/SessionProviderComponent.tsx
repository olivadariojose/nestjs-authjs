'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

interface Props{
    children: React.ReactNode
}

export const SessionProviderComponent = ({children}: Props) => {
  return (
    <SessionProvider>
        {
            children
        }
    </SessionProvider>
  )
}
