import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  spiceLevel: number;
}

interface Order {
  id: number;
  items: MenuItem[];
  total: number;
  status: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      items: [
        {
          id: 1,
          name: 'Tacos al Pastor',
          description: 'Marinated pork tacos with pineapple',
          price: 12.99,
          category: 'Main Course',
          image: '/images/tacos-al-pastor.jpg',
          spiceLevel: 2,
        },
      ],
      total: 12.99,
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState<Partial<MenuItem>>({});

  // Redirect if not admin
  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  const handleAddMenuItem = () => {
    // TODO: Implement API call to add menu item
    setOpenDialog(false);
    setNewMenuItem({});
  };

  const handleUpdateOrderStatus = (orderId: number, newStatus: string) => {
    // TODO: Implement API call to update order status
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* Orders Section */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                Recent Orders
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Items</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>
                          {order.items.map(item => item.name).join(', ')}
                        </TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleUpdateOrderStatus(order.id, 'completed')}
                          >
                            Mark Complete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Menu Management Section */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Menu Management
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setOpenDialog(true)}
                sx={{ mb: 2 }}
              >
                Add New Menu Item
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Add Menu Item Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Add New Menu Item</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              value={newMenuItem.name || ''}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={newMenuItem.description || ''}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Price"
              type="number"
              fullWidth
              value={newMenuItem.price || ''}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, price: parseFloat(e.target.value) })}
            />
            <TextField
              margin="dense"
              label="Category"
              fullWidth
              value={newMenuItem.category || ''}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, category: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleAddMenuItem} variant="contained" color="primary">
              Add Item
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default AdminDashboard; 