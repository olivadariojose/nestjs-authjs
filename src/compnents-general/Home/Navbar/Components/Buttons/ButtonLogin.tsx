import Button from '@mui/material/Button';
import Link from 'next/link';

export const ButtonLogin = () => {
  return (
    <Link href={'/signin'} >
        <Button color="inherit" variant='text' >Iniciar Sesion</Button>
    </Link>
  )
}
