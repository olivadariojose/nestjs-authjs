import { Form, Formik, FormikHelpers, FormikValues } from 'formik'
import React from 'react'
import { Schema } from 'yup'


interface Props<T extends FormikValues> {
    children: React.ReactNode,
    initialValues: T,
    validationSchema: Schema<T>
    onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void
}

export const FormProviderComponent = <T extends FormikValues>({ children, initialValues, onSubmit, validationSchema }: Props<T>) => {
    return (
        <Formik<T>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: T, formikHelpers: FormikHelpers<T>) => onSubmit(values, formikHelpers)}
        >
            {
                () => (
                    <Form >
                        {children}
                    </Form>
                )
            }
        </Formik>
    )
}
