import { useTheme, useMediaQuery } from '@mui/material';

export const useBreakpoint = () => {
  const theme = useTheme();

  // Determinar si el viewport corresponde a un breakpoint específico
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));

  // Identificar el dispositivo
  const deviceType = (() => {
    if (isXs) return 'mobile';
    if (isSm) return 'tablet';
    if (isMd) return 'tablet';
    if (isLg || isXl) return 'desktop';
    return 'unknown';
  })();

  // Determinar el breakpoint actual
  const currentBreakpoint = (() => {
    if (isXs) return 'xs';
    if (isSm) return 'sm';
    if (isMd) return 'md';
    if (isLg) return 'lg';
    if (isXl) return 'xl';
    return 'unknown';
  })();

  return { currentBreakpoint, deviceType, isXs, isSm, isMd, isLg, isXl };
};

