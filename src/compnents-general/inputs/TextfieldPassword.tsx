import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useField } from 'formik';
import { FormHelperText } from '@mui/material';

interface Props {
    name: string
    label: string
}

export const TextfieldPassword = ({ name, label }: Props) => {

    const [field, meta, helpers] = useField(name)

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (

        <FormControl fullWidth  variant="outlined"   >
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <OutlinedInput
                id={name}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
                error={meta.touched && Boolean(meta.error)}
                {...field}
            />
            {
                meta.touched && meta.error && (
                    <FormHelperText error >{meta.error}</FormHelperText>
                )
            }
        </FormControl>
    )
}
