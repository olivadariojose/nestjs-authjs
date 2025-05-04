'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#26a7ff', // Azul vibrante
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0288d1', // Azul claro más armonioso
      contrastText: '#ffffff',
    },
    background: {
      default: '#0a192f', // Azul profundo suave
      paper: '#112240', // Menos saturado, ideal para tarjetas/dialogs
    },
    text: {
      primary: '#e3f2fd', // Azul claro sutil
      secondary: 'rgba(179, 200, 255, 0.7)', // Más legible en papel oscuro
    },
    error: {
      main: '#ef5350',
    },
    warning: {
      main: '#ffa726',
    },
    info: {
      main: '#29b6f6',
    },
    success: {
      main: '#66bb6a',
    },
    divider: 'rgba(255,255,255,0.12)',
    
    // neutral: {
    //   main: '#64748B',
    //   contrastText: '#ffffff',
    // },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    // h1: {
    //   fontSize: '2.6rem',
    //   fontWeight: 700,
    //   letterSpacing: '-0.01562em',
    // },
    // h2: {
    //   fontSize: '2.0rem',
    //   fontWeight: 600,
    // },
    // button: {
    //   textTransform: 'none',
    //   fontWeight: 500,
    //   letterSpacing: '0.05em',
    // },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: 8,
            height: 8,
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            border: '2px solid transparent',
            backgroundClip: 'padding-box',
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-button, & *::-webkit-scrollbar-button': {
            display: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 0 8px rgba(0,0,0,0.4)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // borderRadius: 10,
        },
      },
    },
  },
});

export default theme;
