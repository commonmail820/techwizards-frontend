import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Paper,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === '',
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      phone: !/^\+?[\d\s-]{10,}$/.test(formData.phone),
      message: formData.message.trim() === '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // TODO: Implement actual form submission
      setSnackbar({
        open: true,
        message: t('contact.form.success'),
        severity: 'success',
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSnackbar({
        open: true,
        message: t('contact.form.error'),
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const contactInfo = [
    {
      icon: <PhoneIcon />,
      primary: 'Phone',
      secondary: '+1 (555) 123-4567',
    },
    {
      icon: <EmailIcon />,
      primary: 'Email',
      secondary: 'info@mexicanrestaurant.com',
    },
    {
      icon: <LocationIcon />,
      primary: 'Address',
      secondary: '123 Mexican Street, Foodie District',
    },
    {
      icon: <TimeIcon />,
      primary: 'Hours',
      secondary: 'Tuesday - Sunday: 11:00 AM - 10:00 PM',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 6 }}
        >
          {t('contact.title')}
        </Typography>

        <Typography variant="h5" gutterBottom align="center" color="text.secondary">
          {t('contact.subtitle')}
        </Typography>

        <Grid container spacing={6} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                {t('contact.form.title')}
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label={t('contact.form.name')}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  helperText={errors.name && t('contact.form.required')}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label={t('contact.form.email')}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  helperText={errors.email && t('contact.form.invalidEmail')}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label={t('contact.form.phone')}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  helperText={errors.phone && t('contact.form.invalidPhone')}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label={t('contact.form.message')}
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  helperText={errors.message && t('contact.form.required')}
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ mt: 3 }}
                >
                  {t('contact.form.submit')}
                </Button>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                {t('contact.info.title')}
              </Typography>

              <List>
                {contactInfo.map((item, index) => (
                  <ListItem key={index} sx={{ py: 2 }}>
                    <ListItemIcon sx={{ color: 'primary.main' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.primary}
                      secondary={item.secondary}
                      primaryTypographyProps={{
                        variant: 'h6',
                        color: 'primary',
                      }}
                      secondaryTypographyProps={{
                        variant: 'body1',
                      }}
                    />
                  </ListItem>
                ))}
              </List>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  {t('contact.location.title')}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mt: 2 }}
                >
                  {t('contact.location.viewMap')}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" gutterBottom align="center">
            Find Us on the Map
          </Typography>
          <Paper elevation={3} sx={{ height: 400, width: '100%' }}>
            {/* Add Google Maps or other map integration here */}
            <Box
              sx={{
                height: '100%',
                width: '100%',
                bgcolor: 'grey.200',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body1" color="text.secondary">
                Map integration coming soon
              </Typography>
            </Box>
          </Paper>
        </Box>
      </motion.div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact; 