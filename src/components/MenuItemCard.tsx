import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Rating,
  Slider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as CartIcon,
  Whatshot as SpiceIcon,
  LocalFlorist as VegetarianIcon,
  Star as PopularIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import type { MenuItem } from '../types/menu';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart?: (item: MenuItem, quantity: number, spiceLevel: number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart }) => {
  const { t, i18n } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [customSpiceLevel, setCustomSpiceLevel] = useState(item.spiceLevel);
  const [openDialog, setOpenDialog] = useState(false);

  const getLocalizedName = () => {
    return i18n.language === 'es' ? item.nameEs : item.name;
  };

  const getLocalizedDescription = () => {
    return i18n.language === 'es' ? item.descriptionEs : item.description;
  };

  const getSpiceLevelText = (level: number) => {
    const spiceLevels = {
      0: { text: t('menu.spice.none'), color: '#4caf50' },
      1: { text: t('menu.spice.mild'), color: '#ff9800' },
      2: { text: t('menu.spice.medium'), color: '#ff5722' },
      3: { text: t('menu.spice.hot'), color: '#d32f2f' },
    };
    return spiceLevels[level as keyof typeof spiceLevels] || spiceLevels[0];
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(item, quantity, customSpiceLevel);
    }
    setOpenDialog(false);
    // Reset to defaults
    setQuantity(1);
    setCustomSpiceLevel(item.spiceLevel);
  };

  const spiceInfo = getSpiceLevelText(customSpiceLevel);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5 }}
      >
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="220"
              image={item.image}
              alt={getLocalizedName()}
              sx={{
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
            
            {/* Badges */}
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              {item.isPopular && (
                <Chip
                  icon={<PopularIcon />}
                  label={t('menu.items.popularLabel')}
                  size="small"
                  sx={{
                    backgroundColor: '#ffd700',
                    color: '#000',
                    fontWeight: 'bold',
                  }}
                />
              )}
              {item.isVegetarian && (
                <Chip
                  icon={<VegetarianIcon />}
                  label={t('menu.items.vegetarianLabel')}
                  size="small"
                  sx={{
                    backgroundColor: '#4caf50',
                    color: 'white',
                  }}
                />
              )}
            </Box>

            {/* Spice Level Indicator */}
            {item.spiceLevel > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  borderRadius: 2,
                  px: 1,
                  py: 0.5,
                }}
              >
                <SpiceIcon sx={{ color: getSpiceLevelText(item.spiceLevel).color, mr: 0.5 }} />
                <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>
                  {Array.from({ length: item.spiceLevel }, (_, i) => '🌶️').join('')}
                </Typography>
              </Box>
            )}
          </Box>

          <CardContent sx={{ flexGrow: 1, p: 3 }}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                mb: 1,
              }}
            >
              {getLocalizedName()}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                lineHeight: 1.6,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {getLocalizedDescription()}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: 'primary.main',
                }}
              >
                ${item.price.toFixed(2)}
              </Typography>
              
              {item.orderCount && (
                <Typography variant="caption" color="text.secondary">
                  {item.orderCount} {t('menu.items.orders')}
                </Typography>
              )}
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<CartIcon />}
              onClick={() => setOpenDialog(true)}
              sx={{
                borderRadius: 2,
                py: 1.5,
                fontWeight: 'bold',
                textTransform: 'none',
                background: 'linear-gradient(45deg, #006847 30%, #00a86b 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #005239 30%, #008f5a 90%)',
                },
              }}
            >
              {t('menu.items.addToCart')}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Customization Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" component="div">
            {t('menu.customize.title')}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {getLocalizedName()}
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={3}>
            {/* Quantity Selection */}
            <Box>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                {t('menu.customize.quantity')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant="h6" sx={{ minWidth: 40, textAlign: 'center' }}>
                  {quantity}
                </Typography>
                <IconButton
                  onClick={() => handleQuantityChange(1)}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>

            <Divider />

            {/* Spice Level Customization */}
            <Box>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                {t('menu.customize.spiceLevel')}
              </Typography>
              <Box sx={{ px: 1 }}>
                <Slider
                  value={customSpiceLevel}
                  onChange={(_, newValue) => setCustomSpiceLevel(newValue as number)}
                  min={0}
                  max={3}
                  step={1}
                  marks={[
                    { value: 0, label: t('menu.spice.none') },
                    { value: 1, label: t('menu.spice.mild') },
                    { value: 2, label: t('menu.spice.medium') },
                    { value: 3, label: t('menu.spice.hot') },
                  ]}
                  sx={{
                    '& .MuiSlider-markLabel': {
                      fontSize: '0.75rem',
                    },
                    '& .MuiSlider-thumb': {
                      backgroundColor: spiceInfo.color,
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: spiceInfo.color,
                    },
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
                  <SpiceIcon sx={{ color: spiceInfo.color }} />
                  <Typography variant="body2" sx={{ color: spiceInfo.color, fontWeight: 'bold' }}>
                    {spiceInfo.text}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider />

            {/* Price Summary */}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">
                  {t('menu.customize.itemPrice')}:
                </Typography>
                <Typography variant="body1">
                  ${item.price.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">
                  {t('menu.customize.quantity')}:
                </Typography>
                <Typography variant="body1">
                  {quantity}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="bold">
                  {t('menu.customize.total')}:
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                  ${(item.price * quantity).toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            {t('common.cancel')}
          </Button>
          <Button
            onClick={handleAddToCart}
            variant="contained"
            startIcon={<CartIcon />}
            sx={{
              borderRadius: 2,
              background: 'linear-gradient(45deg, #006847 30%, #00a86b 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #005239 30%, #008f5a 90%)',
              },
            }}
          >
            {t('menu.items.addToCart')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MenuItemCard; 