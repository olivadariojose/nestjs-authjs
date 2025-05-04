import React from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import theme from './theme';
// import theme from '../theme';

interface Props {
    children: React.ReactNode
}

export const ProviderMui = ({ children }: Props) => {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme} >
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}