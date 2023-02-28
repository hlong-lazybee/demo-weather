import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '@src/context/ColorModeContext';
import * as React from 'react';

export default function SwitchColor() {
  const theme = useTheme();

  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box>
      {theme.palette.mode} mode
      <IconButton
        onClick={() => {
          colorMode.toggleColorMode();
        }}
      >
        {theme.palette.mode === 'dark' ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
}
