// app/signin/page.tsx
import { redirect } from "next/navigation"
import { auth } from "../../../auth"
import SignInForm from "./components/SignInForm"
import Grid from '@mui/material/Grid';

const SignInPage = async () => {

  const session = await auth()

  // const callbackUrl = "/dashboard"
  if (session) {
    // if (session.user?.mustBeChangepassword) {

    

    if (session.user?.mustBeChangepassword) {
      redirect("/changePassword")
    } else {
      redirect("/dashboard")
    }
  }

  return (
    <Grid container height={'100vh'} justifyContent={'center'} alignItems={'center'}  >
      {/* <SignInForm callbackUrl={callbackUrl} /> */}
      <SignInForm />
    </Grid>
  )
}

export default SignInPage
