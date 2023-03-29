import react, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { FormHelperText } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { useSignIn } from 'react-auth-kit';
import axios, { AxiosError } from 'axios'
import logo from 'assets/logo.png'
import { useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://continentalsystems.in/">
        Continental Automation Systems
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme()

export default function SignIn() {
    const isAuthenticated = useIsAuthenticated()
    const navigate = useNavigate();
    const signIn = useSignIn()
    const [error, setError] = useState("")

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/dashboard')
        }
    }, [isAuthenticated])

    const handleSubmit = async (event) => {
        console.log("🚀 ~ file: index.jsx:51 ~ handleSubmit ~ event:", event)
        
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const { REACT_APP_AUTH_SERVER } = process.env
        const formData = { email : data.get('email'), password: data.get('password') }
        console.log(formData)
        try {
            const response = await axios.post(`${REACT_APP_AUTH_SERVER}/api/v1/login`, formData)
            console.log("🚀 ~ file: index.jsx:71 ~ handleSubmit ~ response.data:", response.data)
            
            signIn({
                token: response.data.token,
                expiresIn: Number.parseInt(response.data.expiresIn),
                tokenType: 'Bearer',
                authState : { email: formData.email, first_name : response.data.first_name, machines : response.data.machines, token: response.data.token }
            })

            
            localStorage.setItem('token', response.data.token)            
            setError("");

        } catch (err) {
            if (err && err instanceof AxiosError)
                setError(err.response.data);
            else if (err && err instanceof Error) setError(err.message);
            console.log(err)
        }
    };

    return (
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >

            
            <img src={logo}  alt="Logo"/>

            <Typography sx={{marginTop: "1rem"}} component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                    
                <FormHelperText
                    error={true}
                >
                    {error}    
                </FormHelperText>          

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Login
                </Button>
            </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    </ThemeProvider>
    );
}