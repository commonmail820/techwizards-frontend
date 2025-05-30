import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface MenuItem {
  id: number;
  name: string;
  quantity: number;
  specialInstructions?: string;
}

interface Order {
  id: number;
  items: MenuItem[];
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  timestamp: string;
  table?: number;
  customerName?: string;
}

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const { isWorker } = useAuth();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      items: [
        { id: 1, name: 'Tacos al Pastor', quantity: 2 },
        { id: 2, name: 'Guacamole', quantity: 1, specialInstructions: 'Extra spicy' },
      ],
      status: 'pending',
      timestamp: new Date().toISOString(),
      table: 5,
      customerName: 'John Doe',
    },
    {
      id: 2,
      items: [
        { id: 3, name: 'Enchiladas', quantity: 1 },
        { id: 4, name: 'Mexican Rice', quantity: 2 },
      ],
      status: 'preparing',
      timestamp: new Date().toISOString(),
      table: 3,
    },
  ]);

  // Redirect if not worker
  React.useEffect(() => {
    if (!isWorker) {
      navigate('/login');
    }
  }, [isWorker, navigate]);

  const handleUpdateStatus = (orderId: number, newStatus: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'error';
      case 'preparing':
        return 'warning';
      case 'ready':
        return 'success';
      case 'completed':
        return 'default';
      default:
        return 'default';
    }
  };

  const getNextStatus = (currentStatus: Order['status']): Order['status'] => {
    switch (currentStatus) {
      case 'pending':
        return 'preparing';
      case 'preparing':
        return 'ready';
      case 'ready':
        return 'completed';
      default:
        return 'completed';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Worker Dashboard
        </Typography>

        <Grid container spacing={3}>
          {orders
            .filter(order => order.status !== 'completed')
            .map((order) => (
              <Grid item xs={12} md={6} lg={4} key={order.id}>
                <Card
                  component={motion.div}
                  whileHover={{ scale: 1.02 }}
                  sx={{ height: '100%' }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6">
                        Order #{order.id}
                      </Typography>
                      <Chip
                        label={order.status.toUpperCase()}
                        color={getStatusColor(order.status)}
                      />
                    </Box>

                    {order.customerName && (
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Customer: {order.customerName}
                      </Typography>
                    )}

                    {order.table && (
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Table: {order.table}
                      </Typography>
                    )}

                    <Divider sx={{ my: 2 }} />

                    {order.items.map((item, index) => (
                      <Box key={index} sx={{ mb: 1 }}>
                        <Typography variant="body1">
                          {item.quantity}x {item.name}
                        </Typography>
                        {item.specialInstructions && (
                          <Typography variant="body2" color="text.secondary">
                            Note: {item.specialInstructions}
                          </Typography>
                        )}
                      </Box>
                    ))}

                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => handleUpdateStatus(order.id, getNextStatus(order.status))}
                      >
                        Mark as {getNextStatus(order.status)}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </motion.div>
    </Container>
  );
};

export default WorkerDashboard; 