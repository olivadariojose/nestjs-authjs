
"use client"

import React from 'react'
import { useRouter } from "next/navigation"
import { endpoints } from '@/utils'
import { useSession } from 'next-auth/react'
import { signOut } from "next-auth/react"

interface Props{
  userId:string
}

const ChangePasswordForm =  ({userId}:Props) => {

  // const {data:session, update} = useSession()

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    console.log("formData", formData)

    try {

      const response = await fetch(`${endpoints.changePassword}/${userId}`,{
        method:'PUT',
        headers:{
          'content-type':'application/json',
        },
        body: JSON.stringify({
          newPassword: formData.get("newPassword"),
          confirmNewPassword: formData.get("confirmNewPassword"),
        })
      })
  
      if(!response.ok) {
        // setError("Error al cambiar la contraseña")
        const error = await response.json()
        console.error("Error al cambiar la contraseña", error)
        return
      }
      const adata = await response.json()
      signOut({ redirectTo: "/signin" })
      // await update({ ...session, user: { ...session.user, mustBeChangepassword: false } })
      
      // router.push("/dashboard")
      // console.log("Contraseña cambiada", adata)
      
    } catch (error) {
      console.error("Error al cambiar la contraseña", error)
      return
      
    }

    

    // const res = await signIn("credentials", {
    //   email: formData.get("email"),
    //   password: formData.get("password"),
    //   redirect: false
    // })

    // if (res?.ok) {
    //   router.push(callbackUrl)
    // } else {
    //   setError("Credenciales inválidas")
    // }
  }


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label>
        New Password
        <input name="newPassword" type="password" defaultValue=".NestjsNestjs2." />
      </label>
      <label>
        Confirm Password
        <input name="confirmNewPassword" type="password" defaultValue=".NestjsNestjs2." />
      </label>
      <input type="submit" value="Sign In" />
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
    </form>
  )
}

export default ChangePasswordForm
