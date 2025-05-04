import * as yup from "yup";


export const signInValidationSchema = yup.object().shape({

    email: yup.string().
        required('El email es requerido').
        email('El email no es válido'),

    password: yup.string().
        required('La contraseña es requerida')

})