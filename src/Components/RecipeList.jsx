import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import { useSelector } from 'react-redux'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import usePageTitle from '../Hooks/usePageTitle'


const RecipeList = () => {

    usePageTitle("מתכונים")

    const recipes = useSelector((state) => state.recipeSlice.Recipes)

    useEffect(() => {
        console.log(recipes);
    }, [recipes])

    return (
        <>
            <Box sx={{ position: 'relative', width: '74.2vw', height: '55vh', marginRight: '12.5%', marginTop: '2vh', textAlign: 'center' }}>
                <img
                    alt='macaron'
                    src="/Images/macaron.jpg"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Typography
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        color: 'black',
                        fontSize: '100px',
                        transform: 'translate(-50%, -50%)',
                        textShadow: '3px 3px 3px rgba(255, 255, 255, 0.7)'
                    }}
                >
                    מתכונים
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10vh' }}>
                <Grid container spacing={2} sx={{ width: '75%', height: 'auto' }}>
                    {recipes.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <ImageListItem sx={{ position: 'relative', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                                <Link to={`/RecipeList/${item.id}`} style={{
                                    display: 'block',
                                    width: '100%',
                                    height: '100%',
                                    textDecoration: 'none'
                                }}>
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        loading="lazy"
                                        style={{
                                            width: '100%', height: '100%', objectFit: 'cover', maskImage: "radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)",
                                            WebkitMaskImage: "radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)"
                                        }}
                                    />
                                    <ImageListItemBar
                                        sx={{
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            position: 'absolute',
                                            bottom: 0,
                                            width: '100%',
                                        }}
                                        position="bottom"
                                        actionIcon={
                                            <Box sx={{ color: 'white', width: '100%', paddingRight: '7px' }}>
                                                <Typography variant="h6" sx={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '25px' }}>
                                                    {item.name}
                                                </Typography>
                                                <Box sx={{
                                                    display: 'flex',
                                                    marginBottom: '8px',
                                                    gap: '8px',
                                                    alignItems: 'center',
                                                }}>
                                                    <AccessTimeIcon sx={{ fontSize: 20 }} />
                                                    <Typography variant="body2" sx={{ fontSize: '14px' }}>{item.time}</Typography>
                                                </Box>
                                                <Box sx={{
                                                    display: 'flex',
                                                    gap: '8px',
                                                    alignItems: 'center',
                                                }}>
                                                    <RestaurantIcon sx={{ fontSize: 20 }} />
                                                    <Typography variant="body2" sx={{ fontSize: '14px' }}>{item.category}</Typography>
                                                </Box>
                                            </Box>
                                        }
                                        actionPosition="left"
                                    />
                                </Link>
                            </ImageListItem>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}

export default RecipeList
