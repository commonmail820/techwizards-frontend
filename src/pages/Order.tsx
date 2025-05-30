import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Order = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box>
        <Typography variant="h2" component="h1" gutterBottom>
          Place Your Order
        </Typography>
      </Box>
    </Container>
  );
};

export default Order; 