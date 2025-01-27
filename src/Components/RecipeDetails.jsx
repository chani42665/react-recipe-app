import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import styled from 'styled-components';
import { updateFavorite } from '../Store/RecipeSlice';
import { useEffect } from 'react';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipes = useSelector((state) => state.recipeSlice.Recipes);
  const currentRecipe = recipes.find((item) => item.id === parseInt(id));
  const dispatch = useDispatch();
  
   useEffect(() => {
      console.log(recipes);
    }, [recipes]);

  if (!currentRecipe) {
    return <Typography variant="h6">Recipe not found</Typography>;
  }

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Grid container sx={{ width: '100%' }}>
        <Grid item xs={12} md={8}>
          <Box sx={{
            width: '100%',
            height: '85vh', // הגובה של הקופסה הראשונה לוקח את כל גובה המסך
            // bgcolor: '',
            color:'white',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'scroll',  // אפשר גלילה אנכית
  padding: 10,
  paddingTop:2,
  boxSizing: 'border-box',
  scrollbarWidth: 'none',  // עבור Firefox - מסתיר את פס הגלילה
  msOverflowStyle: 'none',
          }}>
            <Box sx={{ color: 'white', width: '100%', textAlign: 'center', marginBottom: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '30px', }}>
                {currentRecipe.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
                <AccessTimeIcon sx={{ fontSize: 25 }} />
                <Typography variant="body2" sx={{ fontSize: '20px' }}>{currentRecipe.time}</Typography>
                <RestaurantIcon sx={{ fontSize: 25 }} />
                <Typography variant="body2" sx={{ fontSize: '20px' }}>{currentRecipe.category}</Typography>

                {/* הוספת הלב לשורה */}
                <StyledWrapper>
                  <label className="container">
                    <input
                      type="checkbox"
                      checked={currentRecipe.favorite}
                      onChange={() => dispatch(updateFavorite(currentRecipe.id))}
                    />
                    <div className="checkmark">
                      <svg viewBox="0 0 256 256">
                        <rect fill="none" height={256} width={256} />
                        <path
                          d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                          strokeWidth="20px"
                          stroke="white"
                          fill="none"
                        />
                      </svg>
                    </div>
                  </label>
                </StyledWrapper>
              </Box>
            </Box>

            {/* רשימת רכיבים */}
            <Box sx={{ width: '100%' }}>
              {currentRecipe.ingredients.map((item) => (
                <Box key={item.title} sx={{ marginBottom: '16px' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold',fontSize:25,color:'#CF885B',  lineHeight: '2' }}>
                    {item.title}
                  </Typography>
                  {item.ingredientsList.map((i, index) => (
                    <Typography key={index} variant="body2" sx={{ fontSize:17,marginLeft: '16px',  lineHeight: '2' }}>
                      {i}
                    </Typography>
                  ))}
                </Box>
              ))}
            </Box>
            <hr style={{border:" 1px solid white",width:"100%"}}/>
            <Box>
              <Typography variant="body2" sx={{  fontWeight: 'bold',fontSize:25,marginLeft: '18px',color:'#CF885B',  lineHeight: '2' }}>
              
                אופן ההכנה:
                
              </Typography>
              <Typography variant="body2" sx={{ fontSize:17,marginLeft: '16px',  lineHeight: '2' }}>
                {currentRecipe.description}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={{ position: 'relative' }}>
          <Box sx={{ height: '90vh', overflow: 'hidden' }}>
            <img 
              src={currentRecipe.img} 
              alt={currentRecipe.name} 
              style={{
                width: '100%', 
                height: '85vh',  // גובה התמונה 90% מהגובה של המסך
                objectFit: 'cover', // שומר על יחס הגובה-רוחב שלה מבלי לחתוך את התמונה
                objectPosition: 'center' // ממקם את התמונה במרכז
              }} 
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const StyledWrapper = styled.div`
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .container {
    display: block;
    position: relative;
    cursor: pointer;
    font-size: 10px;
    user-select: none;
    transition: 100ms;
  }

  .checkmark {
    top: 0;
    left: 0;
    height: 2em;
    width: 2em;
    transition: 100ms;
    animation: dislike_effect 400ms ease;
  }

  .container input:checked ~ .checkmark path {
    fill: #ff5353;
    stroke-width: 0;
  }

  .container input:checked ~ .checkmark {
    animation: like_effect 400ms ease;
  }

  .container:hover {
    transform: scale(1.1);
  }

  @keyframes like_effect {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes dislike_effect {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default RecipeDetails;
