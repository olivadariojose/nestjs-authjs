// app/signin/page.tsx
import { redirect } from "next/navigation"
import SignInForm from "./SignInForm"
import { auth } from "../../../auth"
type Props = {
  searchParams: Record<string, string | string[] | undefined>
}

const SignInPage = async ({ searchParams }: Props) => {
  const session = await auth()
  // const callbackUrl = typeof searchParams?.callbackUrl === "string" ? searchParams.callbackUrl : "/dashboard"
  const callbackUrl = "/dashboard"

  if (session) {
    redirect(callbackUrl)
  }

  return (
    <div className="flex flex-col gap-2">
      <SignInForm callbackUrl={callbackUrl} />
    </div>
  )
}

export default SignInPage
