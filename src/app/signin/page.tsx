"use client"

import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false
    })

    if (res?.ok) {
      router.push(callbackUrl)
    } else {
      setError("Credenciales inválidas")
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input name="email" id="email" defaultValue="dariooliva33@gmail.com" />
        </label>
        <label htmlFor="password">
          Password
          <input name="password" id="password" type="password" defaultValue=".NestjsNestjs2." />
        </label>
        <input type="submit" value="Sign In" />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}
