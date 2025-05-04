"use client"
import { signIn } from "next-auth/react"
import { FormContent } from "./FormContent"
import { redirect } from "next/navigation"
import { FormProviderComponent } from "@/libraries/formik/FormProviderComponent"
import { signInValidationSchema } from "../yup/signin.validationSchema"

const initialValues = {
  email: 'olivadariojose@gmail.com',
  password: 'ZJqdcnjw',
}


const SignInForm = () => {
  // const router = useRouter()

  console.log('SignInForm')

  const handleSubmit = async (values: typeof initialValues) => {


    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false
    })

    if (res?.ok) {
      redirect("/dashboard")
      // router.push(callbackUrl)
    } else {
      console.log("Error signing in", res?.error)
    }
  }


  return (
    <FormProviderComponent initialValues={initialValues} onSubmit={handleSubmit} validationSchema={signInValidationSchema} >
      <FormContent />
    </FormProviderComponent>
  )
}

export default SignInForm