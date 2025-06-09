import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Alert,
  Chip,
  Stack,
  Snackbar,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useMenu } from '../contexts/MenuContext';
import MenuItemCard from '../components/MenuItemCard';
import type { MenuItem } from '../types/menu';

const Menu = () => {
  const { t, i18n } = useTranslation();
  const { items, loading, error } = useMenu();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleFilterChange = (event: React.MouseEvent<HTMLElement>, newFilter: string) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const getLocalizedName = (item: MenuItem) => {
    return i18n.language === 'es' ? item.nameEs : item.name;
  };

  const getLocalizedDescription = (item: MenuItem) => {
    return i18n.language === 'es' ? item.descriptionEs : item.description;
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = 
      getLocalizedName(item).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getLocalizedDescription(item).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'spicy' && item.spiceLevel > 1) ||
      (filter === 'vegetarian' && item.isVegetarian) ||
      (filter === 'popular' && item.isPopular);
    return matchesSearch && matchesFilter && item.isAvailable;
  });

  const handleAddToCart = (item: MenuItem, quantity: number, spiceLevel: number) => {
    // For now, just show a success message
    // Later this will integrate with a cart context/service
    const itemName = getLocalizedName(item);
    setSnackbarMessage(
      `${quantity}x ${itemName} ${t('menu.addedToCart')} (${t('menu.spice.level')}: ${spiceLevel})`
    );
    setSnackbarOpen(true);
    
    // TODO: Integrate with cart service
    console.log('Added to cart:', { item, quantity, spiceLevel });
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        {t('menu.title')}
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={t('menu.items.search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />

        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          aria-label={t('menu.filters.title')}
        >
          <ToggleButton value="all">{t('menu.filters.all')}</ToggleButton>
          <ToggleButton value="spicy">{t('menu.filters.spicy')}</ToggleButton>
          <ToggleButton value="vegetarian">{t('menu.filters.vegetarian')}</ToggleButton>
          <ToggleButton value="popular">{t('menu.filters.popular')}</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {filteredItems.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          {t('menu.items.notFound')}
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {filteredItems.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <MenuItemCard item={item} onAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
};

export default Menu; 