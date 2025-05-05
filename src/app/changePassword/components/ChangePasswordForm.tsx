'use client'
import { FormProviderComponent } from '@/libraries/formik/FormProviderComponent'
import React from 'react'
import { FormContent } from './FormContent'
import { changepasswordValidationSchema } from '../yup/changepassword.validationSchema'
import { signOut } from 'next-auth/react'
import { endpoints } from '@/utils/endpoints'

const initialValues = {
    newPassword: '.NestjsNestjs2.',
    confirmNewPassword: '.NestjsNestjs2.'
}

interface Props {
    userId: string
}

export const ChangePasswordForm = ({ userId }: Props) => {

    const handleSubmit = async (values: typeof initialValues) => {

        try {
            const response = await fetch(`${endpoints.changePassword}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newPassword: values.newPassword,
                    confirmNewPassword: values.confirmNewPassword
                })
            })

            signOut({
                redirectTo: '/signin'
            })

        } catch (error) {
            console.log('Error')
        }

    }


    return (
        <FormProviderComponent initialValues={initialValues} onSubmit={handleSubmit} validationSchema={changepasswordValidationSchema} >
            <FormContent />
        </FormProviderComponent>
    )
}
