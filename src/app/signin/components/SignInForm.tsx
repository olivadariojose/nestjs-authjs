"use client"
import { signIn } from "next-auth/react"
import { FormContent } from "./FormContent"
import { redirect } from "next/navigation"
import { FormProviderComponent } from "@/libraries/formik/FormProviderComponent"
import { signInValidationSchema } from "../yup/signin.validationSchema"
import { useRouter } from "next/navigation"

const initialValues = {
  email: 'olivadariojose@gmail.com',
  password: '2MR86BWm',
}


const SignInForm = () => {
  const router = useRouter()


  const handleSubmit = async (values: typeof initialValues) => {


    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    })

    if (res?.ok) {
      console.log("Sign in successful", res)
      // redirect("/dashboard")
      router.push("/dashboard")
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