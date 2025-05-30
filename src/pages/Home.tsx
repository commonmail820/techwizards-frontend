import React from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/constants';
import { useTranslation } from 'react-i18next';

const HeroSection = styled(Box)(({ theme }) => ({
  height: '100vh',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  display: 'flex',
  alignItems: 'center',
  color: 'white',
}));

const FeatureCard = styled(motion.div)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  background: 'white',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}));

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <HeroSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h1" component="h1" gutterBottom>
              {t('home.hero.title')}
            </Typography>
            <Typography variant="h4" gutterBottom>
              {t('home.hero.subtitle')}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate(ROUTES.MENU)}
              sx={{ mt: 4, color: 'white' }}
            >
              {t('home.hero.cta')}
            </Button>
          </motion.div>
        </Container>
      </HeroSection>

      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Typography variant="h5" gutterBottom>
                {t('home.features.freshIngredients.title')}
              </Typography>
              <Typography>
                {t('home.features.freshIngredients.description')}
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Typography variant="h5" gutterBottom>
                {t('home.features.traditionalRecipes.title')}
              </Typography>
              <Typography>
                {t('home.features.traditionalRecipes.description')}
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Typography variant="h5" gutterBottom>
                {t('home.features.authenticExperience.title')}
              </Typography>
              <Typography>
                {t('home.features.authenticExperience.description')}
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;