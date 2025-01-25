import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'  // ייבוא אחד בלבד
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Popover from '@mui/material/Popover' // Import Popover
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../Store/UserSlice' // אם יש לך פעולה ליציאה
import {useState} from 'react'

const pages = [
  { name: 'דף הבית', link: '/' },
  { name: 'מתכונים', link: '/RecipeList'
   },
]

const MyAppBar = () => {
  const userObj = useSelector((state) => state.userSlice)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [anchorEl, setAnchorEl] = useState(null) // Set the anchorEl to manage Popover

  const handleSignIn = () => {
    navigate('/Login') // נווט לעמוד הלוגין
  }

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget) // Open Popover when Avatar is clicked
  }

  const handlePopoverClose = () => {
    setAnchorEl(null) // Close Popover
  }

  const handleSignOut = () => {
    dispatch(logoutUser()) // שלח פעולה ל-Redux כדי להתנתק
    setAnchorEl(null) // סגור את ה-Popover
  }
  const handleFavorite=()=>{
    setAnchorEl(null) 
    navigate('/Favorite')
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <AppBar position="static" sx={{height:'15vh',justifyContent:'center',backgroundColor:'black',color: '#CF885B',}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
             
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography> */}


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                sx={{ my: 2,  display: 'block',fontSize:'20px' }}
              >
                <Link to={page.link} style={{ textDecoration: 'none',color: '#CF885B'}}>
                  {page.name}
                </Link>
              </Button>
            ))}
              {userObj?.name&&<Button sx={{ my: 2, color: '#CF885B', display: 'block' ,fontSize:'20px'}}>
                <Link to="/AddRecipe" style={{ textDecoration: 'none', color: 'inherit' }}>
                  הוספת מתכון
                </Link>
              </Button>}

          </Box>

          <Box sx={{ 
  position: 'absolute', 
  left: '50%', 
  transform: 'translateX(-50%)', 
  width: '7%', 
  height: 'auto' 
}}>
  <img src="/Images/logo.jpg" style={{ width: '100%', height: 'auto' }} />
</Box>


          {/* אם המשתמש מחובר, תראה את ה-Avatar עם Popover */}
          {userObj?.name ? (
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
              <Avatar
                sx={{
                  bgcolor: '#CF885B',
                  width: 40,
                  height: 40,
                  cursor: 'pointer',
                }}
                onClick={handlePopoverOpen} // פתח את ה-Popover בלחיצה
              >
                {userObj.name[0]} {/* אות ראשונה מהשם */}
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
                <Box sx={{ p: 2}}>
                  <Typography variant="body2">שם {userObj.name}</Typography>
                  <Typography variant="body2">מייל: {userObj.email}</Typography>
                  <Button onClick={handleFavorite}>המועדפים שלי ❤️ </Button>
                  <Button onClick={handleSignOut}>התנתק</Button>
                </Box>
              </Popover>
            </Box>
          ) : (
            <Button color="inherit" onClick={handleSignIn}>
              התחבר
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default MyAppBar
