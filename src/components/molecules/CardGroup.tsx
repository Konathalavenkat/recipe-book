import React from 'react';
import { Grid } from '@mui/material';

interface CardGroupProps {
  children: React.ReactNode;
}

const CardGroup: React.FC<CardGroupProps> = ({ children }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      {children}
    </Grid>
  );
};

export default CardGroup;