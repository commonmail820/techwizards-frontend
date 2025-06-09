import React from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/constants';

// Mexican Flag Colors
const MEXICAN_GREEN = '#006847';
const MEXICAN_WHITE = '#FFFFFF';
const MEXICAN_RED = '#CE1126';
const MEXICAN_GOLD = '#FFD700';

const HeroSection = styled(Box)(({ theme }) => ({
  height: '100vh',
  background: `linear-gradient(135deg, ${MEXICAN_GREEN} 0%, rgba(0,104,71,0.75) 30%, rgba(206,17,38,0.75) 70%, ${MEXICAN_RED} 100%), url("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundBlendMode: 'overlay',
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 20% 20%, rgba(255,215,0,0.2) 0%, transparent 50%),
                 radial-gradient(circle at 80% 80%, rgba(255,215,0,0.2) 0%, transparent 50%),
                 radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)`,
    pointerEvents: 'none',
  }
}));

const PizzaSpinner = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '5%',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  background: `conic-gradient(
    ${MEXICAN_RED} 0deg 45deg,
    ${MEXICAN_GREEN} 45deg 90deg,
    ${MEXICAN_GOLD} 90deg 135deg,
    ${MEXICAN_RED} 135deg 180deg,
    ${MEXICAN_GREEN} 180deg 225deg,
    ${MEXICAN_GOLD} 225deg 270deg,
    ${MEXICAN_RED} 270deg 315deg,
    ${MEXICAN_GREEN} 315deg 360deg
  )`,
  border: `8px solid ${MEXICAN_WHITE}`,
  boxShadow: '0 0 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: 'spin 20s linear infinite',
  '@keyframes spin': {
    '0%': { transform: 'translateY(-50%) rotate(0deg)' },
    '100%': { transform: 'translateY(-50%) rotate(360deg)' },
  },
  [theme.breakpoints.down('md')]: {
    width: '200px',
    height: '200px',
    right: '2%',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const FoodSlice = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2rem',
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
  animation: 'counterSpin 20s linear infinite',
  '@keyframes counterSpin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(-360deg)' },
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem',
  },
}));

const SliceContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  textAlign: 'center',
  fontSize: '1.8rem',
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.3rem',
  },
}));

const AboutSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  textAlign: 'center',
  background: `linear-gradient(135deg, ${MEXICAN_WHITE} 0%, #f8f8f8 50%, ${MEXICAN_WHITE} 100%)`,
}));

const FeaturedDishesSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  textAlign: 'center',
  background: `linear-gradient(135deg, ${MEXICAN_GREEN} 0%, #008751 100%)`,
  color: 'white',
}));

const DishCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(145deg, ${MEXICAN_WHITE} 0%, #f9f9f9 100%)`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  transition: 'all 0.3s ease',
  border: `2px solid ${MEXICAN_GOLD}`,
  height: '100%',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
  },
}));

const FooterSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${MEXICAN_RED} 0%, #d41426 100%)`,
  color: 'white',
  padding: theme.spacing(8),
  textAlign: 'center',
}));

const ClassicButton = styled(Button)(({ theme }) => ({
  backgroundColor: MEXICAN_RED,
  color: 'white',
  fontSize: '1.2rem',
  fontWeight: '600',
  padding: '16px 32px',
  borderRadius: '8px',
  border: `2px solid ${MEXICAN_GOLD}`,
  boxShadow: '0 4px 16px rgba(206,17,38,0.3)',
  textTransform: 'none',
  letterSpacing: '0.5px',
  transition: 'all 0.3s ease',
  fontFamily: '"Playfair Display", serif',
  '&:hover': {
    backgroundColor: '#b8112a',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(206,17,38,0.4)',
  },
}));

const Home = () => {
  const navigate = useNavigate();

  const mexicanFoodItems = [
    { emoji: '🌮', name: 'Tacos' },
    { emoji: '🌯', name: 'Burrito' },
    { emoji: '🥑', name: 'Guac' },
    { emoji: '🌶️', name: 'Chiles' },
    { emoji: '🫔', name: 'Tamale' },
    { emoji: '🧀', name: 'Queso' },
    { emoji: '🍅', name: 'Salsa' },
    { emoji: '🌽', name: 'Elote' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <HeroSection>
        {/* Pizza Spinner */}
        <PizzaSpinner>
          {mexicanFoodItems.map((item, index) => (
            <SliceContent
              key={index}
              sx={{
                transform: `rotate(${index * 45}deg) translateY(-80px)`,
                transformOrigin: 'center center',
              }}
            >
              <FoodSlice>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  transform: `rotate(-${index * 45}deg)`,
                }}>
                  <Typography sx={{ fontSize: 'inherit', mb: 0.5 }}>
                    {item.emoji}
                  </Typography>
                  <Typography sx={{ 
                    fontSize: '0.7em', 
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                  }}>
                    {item.name}
                  </Typography>
                </Box>
              </FoodSlice>
            </SliceContent>
          ))}
          
          {/* Center Circle */}
          <Box sx={{
            position: 'absolute',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: `linear-gradient(45deg, ${MEXICAN_GOLD}, #ffed4e)`,
            border: `4px solid ${MEXICAN_WHITE}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            boxShadow: '0 0 20px rgba(255,215,0,0.6)',
            zIndex: 10,
          }}>
            🇲🇽
          </Box>
        </PizzaSpinner>

        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: { md: '60%' } }}>
              <Typography 
                variant="h1" 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '3.5rem', md: '5.5rem' },
                  fontWeight: '400',
                  textShadow: '3px 3px 6px rgba(0,0,0,0.8)',
                  mb: 3,
                  lineHeight: 1.1,
                  fontFamily: '"Playfair Display", serif',
                  letterSpacing: '2px',
                }}
              >
                Las Katrinas
              </Typography>
              <Typography 
                variant="h4" 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '1.4rem', md: '2rem' },
                  fontWeight: '300',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  mb: 4,
                  lineHeight: 1.5,
                  fontStyle: 'italic',
                  fontFamily: '"Poppins", sans-serif',
                  letterSpacing: '1px',
                }}
              >
                Where tradition meets elegance in authentic Mexican cuisine
              </Typography>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ClassicButton
                  variant="contained"
                  size="large"
                  onClick={() => navigate(ROUTES.REGISTER)}
                >
                  Experience Our Heritage
                </ClassicButton>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </HeroSection>

      {/* About Section */}
      <AboutSection>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h2" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '2.8rem', md: '3.8rem' },
                fontWeight: '400',
                color: MEXICAN_GREEN,
                mb: 5,
                fontFamily: '"Playfair Display", serif',
                letterSpacing: '1px',
              }}
            >
              Our Story
            </Typography>
            <Typography 
              variant="body1"
              sx={{ 
                fontSize: { xs: '1.15rem', md: '1.3rem' },
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: 1.8,
                color: '#444',
                fontWeight: '400',
                fontFamily: '"Poppins", sans-serif',
                letterSpacing: '0.3px',
              }}
            >
              Inspired by the elegant spirit of La Catrina, our family has preserved the authentic recipes 
              and traditions of Mexico for generations. Each dish is crafted with passion, using time-honored 
              techniques and the finest ingredients to bring you an unforgettable culinary journey through 
              the heart of Mexican cuisine. We celebrate life, tradition, and the artistry of Mexican gastronomy.
            </Typography>
          </motion.div>
        </Container>
      </AboutSection>

      {/* Featured Dishes */}
      <FeaturedDishesSection>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h2" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '2.8rem', md: '3.8rem' },
                fontWeight: '400',
                color: MEXICAN_GOLD,
                mb: 6,
                fontFamily: '"Playfair Display", serif',
                letterSpacing: '1px',
              }}
            >
              Signature Dishes
            </Typography>
          </motion.div>
          
          <Grid container spacing={4}>
            {[
              {
                title: "Tacos Al Pastor",
                description: "Marinated pork with pineapple, onions, and cilantro on handmade corn tortillas",
                price: "$12.99",
                emoji: "🌮"
              },
              {
                title: "Mole Poblano",
                description: "Traditional chicken in rich, complex mole sauce with chocolate and spices",
                price: "$18.99",
                emoji: "🍗"
              },
              {
                title: "Chiles Rellenos",
                description: "Roasted poblano peppers stuffed with cheese, battered and fried to perfection",
                price: "$15.99",
                emoji: "🌶️"
              }
            ].map((dish, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <DishCard>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography sx={{ fontSize: '2.5rem', mr: 2 }}>
                          {dish.emoji}
                        </Typography>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            color: MEXICAN_GREEN, 
                            fontWeight: '500',
                            fontSize: '1.5rem',
                            fontFamily: '"Playfair Display", serif',
                            letterSpacing: '0.5px',
                          }}
                        >
                          {dish.title}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          mb: 3,
                          fontSize: '1rem',
                          lineHeight: 1.6,
                          color: '#666',
                          fontFamily: '"Poppins", sans-serif',
                          letterSpacing: '0.2px',
                        }}
                      >
                        {dish.description}
                      </Typography>
                      <Typography 
                        variant="h6"
                        sx={{ 
                          fontWeight: '600',
                          color: MEXICAN_RED,
                          fontSize: '1.4rem',
                          fontFamily: '"Playfair Display", serif',
                        }}
                      >
                        {dish.price}
                      </Typography>
                    </CardContent>
                  </DishCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </FeaturedDishesSection>

      {/* Footer */}
      <FooterSection>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant="h4" 
              gutterBottom
              sx={{ 
                fontWeight: '400',
                mb: 4,
                fontFamily: '"Playfair Display", serif',
                fontSize: { xs: '2rem', md: '2.5rem' },
                letterSpacing: '1px',
              }}
            >
              Visit Las Katrinas
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontSize: '1.2rem',
                    fontWeight: '500',
                    mb: 1,
                    fontFamily: '"Playfair Display", serif',
                  }}
                >
                  📍 Location
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontFamily: '"Poppins", sans-serif',
                    letterSpacing: '0.3px',
                  }}
                >
                  123 Heritage Street<br />
                  Downtown, City 12345
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontSize: '1.2rem',
                    fontWeight: '500',
                    mb: 1,
                    fontFamily: '"Playfair Display", serif',
                  }}
                >
                  📞 Contact
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontFamily: '"Poppins", sans-serif',
                    letterSpacing: '0.3px',
                  }}
                >
                  (555) 123-MEXICO<br />
                  info@laskatrinas.com
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography 
                  variant="h6"
                  sx={{ 
                    fontSize: '1.2rem',
                    fontWeight: '500',
                    mb: 1,
                    fontFamily: '"Playfair Display", serif',
                  }}
                >
                  🕒 Hours
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontFamily: '"Poppins", sans-serif',
                    letterSpacing: '0.3px',
                  }}
                >
                  Daily: 11:00 AM - 10:00 PM<br />
                  Friday & Saturday: 11:00 AM - 11:00 PM
                </Typography>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </FooterSection>
    </Box>
  );
};

export default Home;