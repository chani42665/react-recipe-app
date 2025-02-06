import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
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
    <AppBar position="static" sx={{  minHeight: '15h',backgroundColor: 'black', color: '#CF885B' }}>
      <Toolbar sx={{ padding: 0, margin: 0, alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', paddingLeft: 0 }}>
          {pages.map((page) => (
            <Button
              key={page.name}
              sx={{
                my: 2,
                display: 'block',
                fontSize: '20px',
                color: 'transparent',
                position: 'relative',
                padding: 0,
                margin: 0,
                marginRight: '15px',
                paddingTop: '5px', 

              }}
            >
              <Link 
                to={page.link} 
                style={{ 
                  textDecoration: 'none', 
                  color: '#CF885B', 
                  paddingBottom: '5px', 
                  borderBottom: location.pathname === page.link ? '2px solid #CF885B' : 'none' 
                }}
              >
                {page.name}
              </Link>
            </Button>
          ))}
          {userObj?.name && (
            <Button sx={{ my: 2, display: 'block', fontSize: '20px', color: 'transparent', position: 'relative', padding: 0, marginRight: '15px', paddingTop: '5px'}}>
              <Link 
                to="/AddRecipe" 
                style={{ 
                  textDecoration: 'none', 
                  color: '#CF885B', 
                  paddingBottom: '5px', 
                  borderBottom: location.pathname === '/AddRecipe' ? '2px solid #CF885B' : 'none' 
                }}
              >
                הוספת מתכון
              </Link>
            </Button>
          )}
        </Box>

        <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', }}>
          <Typography sx={{ color: '#CF885B', fontFamily: 'Smooch Sans', fontSize: '50px' , paddingTop: '5px',}}>
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
                <Typography variant="body2">שם: {userObj.name}</Typography>
                <Typography variant="body2">מייל: {userObj.email}</Typography>
                <Button onClick={handleFavorite}>המועדפים שלי ❤️</Button>
                <Button onClick={handleSignOut}>התנתק</Button>
              </Box>
            </Popover>
          </Box>
        ) : (
          <Button 
            sx={{ 
              my: 2, 
              display: 'block', 
              fontSize: '20px', 
              color: 'transparent', 
              position: 'relative', 
              '&:hover': { backgroundColor: 'transparent' }, 
              '&:focus': { backgroundColor: 'transparent' },
              padding: 0,
            }} 
            onClick={handleSignIn}
          >
            <Typography 
              sx={{ 
                color: '#CF885B', 
                fontSize: '20px', 
                textDecoration: 'none', 
                paddingBottom: '5px', 
                paddingTop: '5px',
                borderBottom: location.pathname === '/Login' ? '2px solid #CF885B' : 'none' 
              }}
            >
              התחבר
            </Typography>
          </Button>
        )}
      </Toolbar>
    </AppBar>

  )
}

export default MyAppBar
