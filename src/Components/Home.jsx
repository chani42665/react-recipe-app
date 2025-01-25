import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ['Images/i1.jpg', 'Images/i2.jpg', 'Images/i3.jpg'];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length );
    }, 3000); // שינוי תמונה כל 3 שניות

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '85vh',
        overflow: 'hidden',
        backgroundColor: '#eee',
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
            objectFit: 'cover', // מבטיח שהתמונה לא תחתך
            position: 'absolute', // מונע קפיצות או בעיות בגודל
            transition: 'opacity 1s ease-in-out', // מעבר חלק
            opacity: currentImage === index ? 1 : 0, // מציג רק תמונה אחת בכל רגע
          }}
        />
      ))}
    </Box>
  );
};

export default Home;
