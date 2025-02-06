import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import usePageTitle from '../Hooks/usePageTitle';

const Home = () => {
  usePageTitle("דף הבית")

  const [currentImage, setCurrentImage] = useState(0);
  const images = ['Images/i1.jpg', 'Images/i2.jpg', 'Images/i3.jpg'];
  const recipes = useSelector((state) => state.recipeSlice.Recipes);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); 

    return () => clearInterval(intervalId);
  }, []);

  const lastThreeRecipes = recipes.slice(-3);

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box
        sx={{
          width: '100%',
          height: '75vh', 
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {images.map((src, index) => (
          <Box
            key={index}
            component="img"
            src={src}
            alt={`Image ${index}`}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              transition: 'opacity 1s ease-in-out',
              opacity: currentImage === index ? 1 : 0,
              zIndex: 1,
            }}
          />
        ))}
      </Box>

      <Typography sx={{ marginTop: '20vh', fontSize: '50px', color: '#CF885B' }}>חדש באתר❤️</Typography>

      <Box sx={{ marginTop: '20px', padding: '20px', width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={2}>
          {lastThreeRecipes.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <Link
                  to={`/RecipeList/${item.id}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    textDecoration: 'none',
                  }}
                >
                  <Box
                    component="img"
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      maskImage: 'radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)',
                      WebkitMaskImage: 'radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      padding: '10px',
                    }}
                  >
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
                      {item.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <AccessTimeIcon sx={{ fontSize: 20, color: 'white' }} />
                      <Typography variant="body2" sx={{ fontSize: '14px', color: 'white' }}>
                        {item.time}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <RestaurantIcon sx={{ fontSize: 20, color: 'white' }} />
                      <Typography variant="body2" sx={{ fontSize: '14px', color: 'white' }}>
                        {item.category}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center', marginBottom: '3vh' }}>
        <Typography sx={{ color: '#CF885B', fontSize: '20px' }}>
          כל הזכויות שמורות לעולם הבא והקרן קיימת לעולם הזה
        </Typography>
        <Typography sx={{ color: '#CF885B', fontSize: '18px' }}>
          המתכונים באדיבות אופה לשבת
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
