// app/signin/SignInForm.tsx
"use client"

import { signIn } from "next-auth/react"
// import { signIn } from "../../../auth"
import { useState } from "react"
import { useRouter } from "next/navigation"

const SignInForm = ({ callbackUrl }: { callbackUrl: string }) => {
  const [error, setError] = useState("")
  const router = useRouter()

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label>
        Email
        <input name="email" type="email" defaultValue="dariooliva33@gmail.com" />
      </label>
      <label>
        Password
        <input name="password" type="password" defaultValue=".NestjsNestjs2." />
      </label>
      <input type="submit" value="Sign In" />
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
    </form>
  )
}

export default SignInForm
