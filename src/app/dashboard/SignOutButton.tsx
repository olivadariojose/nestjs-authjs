'use client'
import React from 'react'
// import { signOut } from '../../../auth'
// import { signOut } from '../../../libraries/authjs/auth'
import { signOut } from "next-auth/react"

export const SignOutButton = () => {
    return (
        <button
            // onClick={() => signOut({ callbackUrl: "/signin" })}
            onClick={() => signOut({ redirectTo: "/signin" })}
        >
            Sign Out
        </button>
    )
}
