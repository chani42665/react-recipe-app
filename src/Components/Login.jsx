// import Box from '@mui/material/Box'
// import CssBaseline from '@mui/material/CssBaseline'
// import Container from '@mui/material/Container'
// import TextField from '@mui/material/TextField'
// import Button from '@mui/material/Button'
// import { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { createUser } from '../Store/UserSlice'
// import { useNavigate } from 'react-router-dom'
// import { Typography } from '@mui/material'


// const Login = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [error, setError] = useState('')

//   const handleSubmit = () => {
//     setError('');
//     if (!name || !email) {
//       setError('שדות חובה')
//       return
//     }
//     if (!/\S+@\S+\.\S+/.test(email)) {
//       setError('הכנס כתובת מייל תקינה!')
//       return
//     }

//     dispatch(createUser({ name, email }))

//     setName('')
//     setEmail('')

//     navigate('/')
//   }

//   return (
//     <>
//       <CssBaseline />
//       <Container
//         fixed

//         maxWidth={false}

//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           // alignItems: 'center',
//           height: '90vh',
//           bgcolor:'black'
//         }}
//       >
//         <Box  sx={{
//             p: 3,
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 2,
//             width: '25vw',
//             height:'50vh',
//             position: 'relative',
//           }}><img src='/Images/login.jpg'></img></Box>
//         <Box
//           sx={{
//             p: 3,
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 2,
//             width: '25vw',
//             height:'50vh',
//             position: 'relative',
//           }}
//         >
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontWeight: 700,
//               color: '#b47904',
//               textDecoration: 'none',
//             }}
//             dir="rtl"
//           >
//             התחברות
//           </Typography>
//           <TextField
//             id="name"
//             label="שם"
//             variant="outlined"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             fullWidth
//             required
//             // sx={{color:'#b47904'}}
//             sx={{
//               '& .MuiOutlinedInput-root': {
//                 '& fieldset': { borderColor: '#b87333' }, // צבע מסגרת נחושת
//                 '&:hover fieldset': { borderColor: '#d2691e' },
//                 '&.Mui-focused fieldset': { borderColor: '#a0522d' },
//               },
//               '& .MuiInputLabel-root': { color: '#b87333' }, // צבע תווית
//               '& .MuiInputLabel-root.Mui-focused': { color: '#a0522d' },
//               '& .MuiInputBase-input': { color: '#808080' }, // צבע אפור לאותיות ב-input
//             }}
//           />
//           <TextField
//             id="email"
//             label="מייל"
//             variant="outlined"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             fullWidth
//             required
//             // sx={{color:'#b47904'}}
//             sx={{
//               '& .MuiOutlinedInput-root': {
//                 '& fieldset': { borderColor: '#b87333' }, // צבע מסגרת נחושת
//                 '&:hover fieldset': { borderColor: '#d2691e' },
//                 '&.Mui-focused fieldset': { borderColor: '#a0522d' },
//               },
//               '& .MuiInputLabel-root': { color: '#b87333' }, // צבע תווית
//               '& .MuiInputLabel-root.Mui-focused': { color: '#a0522d' },
//               '& .MuiInputBase-input': { color: '#808080' }, // צבע אפור לאותיות ב-input
//             }}

//           />
//           {error && <Box color="#b47904">{error}</Box>}
//           <Button variant="contained" onClick={handleSubmit}   sx={{
//     backgroundColor: '#b87333', // צבע נחושת לרקע
//     color: 'black', // צבע שחור לאותיות
//     '&:hover': {
//       backgroundColor: '#d2691e', // צבע נחושת כהה יותר בהובר
//     },
//   }}>
//             התחבר
//           </Button>
//         </Box>
//       </Container>
//     </>
//   )
// }

// export default Login

// import Select from "react-select"
import { useForm, Controller } from "react-hook-form"
import { useDispatch } from "react-redux"
import { createUser } from '../Store/UserSlice'
import { TextField, Typography, Grid, Button, Container } from "@mui/material"
import { Navigate, useNavigate } from "react-router-dom"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {register,    formState: { errors },  control, handleSubmit } = useForm({
    defaultValues: { name: "", email: "" },
  })

  const onSubmit = (data) => {
    console.log(data)
    dispatch(createUser(data))
    navigate("/")
  }

  return (
    <Container maxWidth="lg" sx={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ width: "100%", overflowX: "hidden" }}>
        {/* תמונה */}
        <Grid item xs={12} sm={6} md={3}>
          <img src='/Images/login.jpg' alt="login" width="100%" />
        </Grid>

        {/* טופס ההתחברות */}
        <Grid item xs={12} sm={6} md={3} container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Typography color="white" sx={{ mb: 2 }}>מוזמנים לביקור, קפה ופטיפור</Typography>
          </Grid>
          <Grid item>
            <Typography color="white" sx={{ mb: 2 }}></Typography>
          </Grid>

          {/* טופס */}
          <Grid item>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <TextField {...register("name", { required: true })} sx={{
                                    '& .MuiOutlinedInput-root': {
                                      '& fieldset': { borderColor: '#CF885B' }, // צבע מסגרת נחושת
                                      '&:hover fieldset': { borderColor: '#CF885B' },
                                      '&.Mui-focused fieldset': { borderColor: '#CF885B' },
                                    },
                                    '& .MuiInputLabel-root': { color: '#CF885B' }, // צבע תווית
                                    '& .MuiInputLabel-root.Mui-focused': { color: '#CF885B' },
                                    '& .MuiInputBase-input': { color: '#808080' }, // צבע אפור לאותיות ב-input
                                  }} {...field} label="שם" variant="outlined" fullWidth />}
                  />
                </Grid>
                {errors.name && <Typography sx={{color:"#CF885B"}}>This field is required</Typography>}

                <Grid item>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <TextField  {...register("email", { required: true ,pattern:/\S+@\S+\.\S+/})} sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#CF885B' }, // צבע מסגרת נחושת
                        '&:hover fieldset': { borderColor: '#CF885B' },
                        '&.Mui-focused fieldset': { borderColor: '#CF885B' },
                      },
                      '& .MuiInputLabel-root': { color: '#CF885B' }, // צבע תווית
                      '& .MuiInputLabel-root.Mui-focused': { color: '#CF885B' },
                      '& .MuiInputBase-input': { color: '#808080' }, // צבע אפור לאותיות ב-input
                    }} {...field} label="אימייל" variant="outlined" fullWidth />}
                  />
                </Grid>
                {errors.email && <Typography sx={{color:"#CF885B"}}>This field is required</Typography>}

                <Grid item>
                <Button variant="contained" type="submit"   sx={{
    backgroundColor: '#CF885B', // צבע נחושת לרקע
    color: 'black', // צבע שחור לאותיות
    '&:hover': {
      backgroundColor: '#CF885B', // צבע נחושת כהה יותר בהובר
    },
  }}fullWidth>
            התחבר
          </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
