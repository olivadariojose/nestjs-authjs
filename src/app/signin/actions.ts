// app/signin/actions.ts
"use server"

import { redirect } from "next/navigation"
import { signIn } from "../../../libraries/authjs/auth"

export async function handleLogin(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const callbackUrl = formData.get("callbackUrl") as string || "/dashboard"

  const res = await signIn("credentials", {
    email,
    password,
    redirect: false
  })

  if (res?.ok) {
    redirect(callbackUrl)
  }

  return { error: "Credenciales inválidas" }
}
