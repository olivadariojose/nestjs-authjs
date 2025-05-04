'use client'
import { Box, Typography, useTheme } from "@mui/material";
import { useBreakpoint } from "./useBreakpoints";

export const CurrentSize = () => {
  const { currentBreakpoint, deviceType, isXs, isSm, isMd, isLg, isXl } = useBreakpoint();
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: 4,
        p: 1,
        borderRadius: 2,
        zIndex: 1300,
        fontSize: '0.875rem',
        width: 150,
        pointerEvents: 'none',
      }}
    >
      <Typography variant="caption">📱 Dispositivo: {deviceType}</Typography>
      <br/>
      <Typography variant="caption">📐 Breakpoint: {currentBreakpoint}</Typography>

    </Box>
  );
};


