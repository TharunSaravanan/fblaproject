import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


export default function Appbar() {


  const loadComponent = url => {
    window.open(url, '_self', 'noopener,noreferrer');
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Andover High School
          </Typography>
          <Button color="inherit" onClick={() => loadComponent('./')}>Home</Button>
          <Button color="inherit" onClick={() => loadComponent('./points')}>Points</Button>
          <Button color="inherit" onClick={() => loadComponent('./')}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}