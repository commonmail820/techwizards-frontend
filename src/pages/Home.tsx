import React from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/constants';
import { useTranslation } from 'react-i18next';

const HeroSection = styled(Box)(({ theme }) => ({
  height: '100vh',
  background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  textAlign: 'center',
}));

const AboutSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  textAlign: 'center',
  background: '#f8f8f8',
}));

const FeaturedDishesSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  textAlign: 'center',
}));

const DishCard = styled(Card)(({ theme }) => ({
  background: 'white',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const FooterSection = styled(Box)(({ theme }) => ({
  background: '#333',
  color: 'white',
  padding: theme.spacing(4),
  textAlign: 'center',
}));

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '2.5rem', md: '4rem' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                mb: 2
              }}
            >
              {t('home.hero.title')}
            </Typography>
            <Typography 
              variant="h4" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                mb: 4
              }}
            >
              {t('home.hero.subtitle')}
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(ROUTES.REGISTER)}
              sx={{ 
                mt: 2,
                backgroundColor: '#d4af37',
                color: 'white',
                fontSize: '1.2rem',
                padding: '15px 30px',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                '&:hover': {
                  backgroundColor: '#b8941f',
                }
              }}
            >
              {t('home.hero.cta')}
            </Button>
          </motion.div>
        </Container>
      </HeroSection>

      {/* About Section */}
      <AboutSection>
        <Container>
          <Typography 
            variant="h2" 
            gutterBottom
            sx={{ 
              fontSize: '2.5rem',
              color: '#d4af37',
              mb: 4
            }}
          >
            About Our Restaurant
          </Typography>
          <Typography 
            variant="body1"
            sx={{ 
              fontSize: '1.2rem',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            Welcome to our authentic Mexican restaurant! We bring you the traditional flavors 
            of Mexico with fresh ingredients, family recipes passed down through generations, 
            and a warm, welcoming atmosphere that makes you feel at home.
          </Typography>
        </Container>
      </AboutSection>

      {/* Featured Dishes */}
      <FeaturedDishesSection>
        <Container>
          <Typography 
            variant="h2" 
            gutterBottom
            sx={{ 
              fontSize: '2.5rem',
              color: '#d4af37',
              mb: 6
            }}
          >
            Featured Dishes
          </Typography>
          <Grid container spacing={4} sx={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Grid item xs={12} md={4}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0 * 0.2 }}
              >
                <DishCard>
                  <CardContent>
                    <Typography 
                      variant="h5" 
                      gutterBottom
                      sx={{ color: '#d4af37', mb: 2 }}
                    >
                      {t('home.features.freshIngredients.title')}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {t('home.features.freshIngredients.description')}
                    </Typography>
                    <Typography 
                      variant="h6"
                      sx={{ 
                        fontWeight: 'bold',
                        color: '#d4af37'
                      }}
                    >
                      $12.99
                    </Typography>
                  </CardContent>
                </DishCard>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 * 0.2 }}
              >
                <DishCard>
                  <CardContent>
                    <Typography 
                      variant="h5" 
                      gutterBottom
                      sx={{ color: '#d4af37', mb: 2 }}
                    >
                      {t('home.features.traditionalRecipes.title')}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {t('home.features.traditionalRecipes.description')}
                    </Typography>
                    <Typography 
                      variant="h6"
                      sx={{ 
                        fontWeight: 'bold',
                        color: '#d4af37'
                      }}
                    >
                      $14.99
                    </Typography>
                  </CardContent>
                </DishCard>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2 * 0.2 }}
              >
                <DishCard>
                  <CardContent>
                    <Typography 
                      variant="h5" 
                      gutterBottom
                      sx={{ color: '#d4af37', mb: 2 }}
                    >
                      {t('home.features.authenticExperience.title')}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {t('home.features.authenticExperience.description')}
                    </Typography>
                    <Typography 
                      variant="h6"
                      sx={{ 
                        fontWeight: 'bold',
                        color: '#d4af37'
                      }}
                    >
                      $11.99
                    </Typography>
                  </CardContent>
                </DishCard>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </FeaturedDishesSection>

      {/* Footer */}
      <FooterSection>
        <Container>
          <Typography variant="h5" gutterBottom>
            Visit Us Today!
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            📍 123 Mexican Street, Food City, FC 12345
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            📞 (555) 123-TACO
          </Typography>
          <Typography variant="body1">
            🕒 Open Daily: 11AM - 10PM
          </Typography>
        </Container>
      </FooterSection>
    </Box>
  );
};

export default Home;