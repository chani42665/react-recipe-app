import { useForm, Controller } from "react-hook-form"
import { useDispatch } from "react-redux"
import { createUser } from '../Store/UserSlice'
import { TextField, Typography, Grid, Button, Container } from "@mui/material"
import { useNavigate } from "react-router-dom"
import usePageTitle from '../Hooks/usePageTitle';

const Login = () => {

  usePageTitle("התחברות")
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
