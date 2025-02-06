import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Popover from '@mui/material/Popover'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { logoutUser } from '../Store/UserSlice'
import { useState } from 'react'

const pages = [
  { name: 'דף הבית', link: '/' },
  { name: 'מתכונים', link: '/RecipeList' },
]

const MyAppBar = () => {
  const userObj = useSelector((state) => state.userSlice)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleSignIn = () => {
    navigate('/Login')
  }

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = () => {
    dispatch(logoutUser())
    setAnchorEl(null)
    navigate('/')
  }

  const handleFavorite = () => {
    setAnchorEl(null)
    navigate('/Favorite')
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <AppBar position="static" sx={{ height: '15vh', justifyContent: 'center', backgroundColor: 'black', color: '#CF885B' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                sx={{ my: 2, display: 'block', fontSize: '20px', color: 'transparent', position: 'relative' }}
              >
                <Link 
                  to={page.link} 
                  style={{ textDecoration: 'none', color: '#CF885B', paddingBottom: '5px', borderBottom: location.pathname === page.link ? '2px solid #CF885B' : 'none' }}
                >
                  {page.name}
                </Link>
              </Button>
            ))}
            {userObj?.name && (
              <Button sx={{ my: 2, color: '#CF885B', display: 'block', fontSize: '20px', color: 'transparent', position: 'relative' }}>
                <Link to="/AddRecipe" style={{ textDecoration: 'none', color: '#CF885B', paddingBottom: '5px', borderBottom: location.pathname === '/AddRecipe' ? '2px solid #CF885B' : 'none' }}>
                  הוספת מתכון
                </Link>
              </Button>
            )}
          </Box>

          <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '17%', height: 'auto', textAlign: 'center' }}>
            <Typography sx={{ color: '#CF885B', fontFamily: 'Smooch Sans', fontSize: '50px' }}>
              Sweet Heart
            </Typography>
          </Box>

          {userObj?.name ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{
                  bgcolor: '#CF885B',
                  width: 40,
                  height: 40,
                  cursor: 'pointer',
                }}
                onClick={handlePopoverOpen}
              >
                {userObj.name[0]}
              </Avatar>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Box sx={{ p: 2 }}>
                  <Typography variant="body2">שם {userObj.name}</Typography>
                  <Typography variant="body2">מייל: {userObj.email}</Typography>
                  <Button onClick={handleFavorite}>המועדפים שלי ❤️ </Button>
                  <Button onClick={handleSignOut}>התנתק</Button>
                </Box>
              </Popover>
            </Box>
          ) : (
            <Button color="transparent" onClick={handleSignIn}>
              <Typography sx={{ fontSize: '20px' }}>התחבר</Typography>
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default MyAppBar
