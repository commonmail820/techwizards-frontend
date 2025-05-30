import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../config/constants';
import { useMenu } from '../contexts/MenuContext';
import type { MenuItem } from '../types/menu';

const Menu = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { items, loading, error } = useMenu();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

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

  const handleOrder = (itemId: number) => {
    navigate(`${ROUTES.ORDER}?item=${itemId}`);
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
        <Typography variant="h6" align="center">
          {t('menu.items.notFound')}
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {filteredItems.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={getLocalizedName(item)}
                  />
                  <CardContent>
                    <Typography variant="h6" component="h3">
                      {getLocalizedName(item)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {getLocalizedDescription(item)}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {t('menu.items.price')}: ${item.price.toFixed(2)}
                    </Typography>
                    <Box sx={{ mt: 1, mb: 2 }}>
                      {item.spiceLevel > 1 && (
                        <Typography variant="caption" sx={{ mr: 1 }}>
                          🌶️ {t('menu.items.spicyLabel')}
                        </Typography>
                      )}
                      {item.isVegetarian && (
                        <Typography variant="caption" sx={{ mr: 1 }}>
                          🥬 {t('menu.items.vegetarianLabel')}
                        </Typography>
                      )}
                      {item.isPopular && (
                        <Typography variant="caption">
                          ⭐ {t('menu.items.popularLabel')}
                        </Typography>
                      )}
                    </Box>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => handleOrder(item.id)}
                    >
                      {t('menu.items.orderButton')}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Menu; 