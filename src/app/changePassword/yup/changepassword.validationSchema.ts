import * as yup from "yup";


export const changepasswordValidationSchema = yup.object().shape({
    newPassword: yup.string().
        required('La nueva contraseña es requerida').
        min(15, 'La contraseña debe tener al menos 15 caracteres'),
    confirmNewPassword: yup.string().
        required('Debes confirmar tu contraseña').
        oneOf([yup.ref('newPassword')], 'Las contraseñas no coinciden')
})