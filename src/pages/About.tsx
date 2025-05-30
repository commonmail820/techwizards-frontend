import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { motion } from 'framer-motion';

const About = () => {
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
          Our Story
        </Typography>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Typography variant="h5" gutterBottom color="primary">
                Authentic Mexican Cuisine
              </Typography>
              <Typography paragraph>
                Founded in 2020, our restaurant brings the authentic flavors of Mexico
                to your table. Our recipes have been passed down through generations,
                preserving the traditional cooking methods and ingredients that make
                Mexican cuisine so special.
              </Typography>
              <Typography paragraph>
                Each dish is carefully prepared by our skilled chefs who have years
                of experience in traditional Mexican cooking. We source our ingredients
                from local suppliers and import special ingredients directly from Mexico
                to ensure the most authentic taste.
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image="/images/restaurant-interior.jpg"
                  alt="Restaurant Interior"
                />
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        <Box sx={{ my: 8 }}>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Our Values
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                title: 'Quality',
                description: 'We use only the finest ingredients to create our authentic dishes.',
                image: '/images/ingredients.jpg',
              },
              {
                title: 'Tradition',
                description: 'Our recipes preserve the rich culinary heritage of Mexico.',
                image: '/images/cooking.jpg',
              },
              {
                title: 'Community',
                description: 'We create a welcoming space for families and friends to gather.',
                image: '/images/community.jpg',
              },
            ].map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * (index + 3) }}
                >
                  <Card sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={value.image}
                      alt={value.title}
                    />
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        {value.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ mb: 4 }}
          >
            Visit Us
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary">
            123 Mexican Street, Foodie District
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary">
            Open Tuesday - Sunday
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary">
            11:00 AM - 10:00 PM
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default About; 