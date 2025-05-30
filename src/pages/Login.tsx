import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Link,
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES } from '../config/constants';

const LoginContainer = styled(motion(Paper))(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 400,
  margin: '0 auto',
  marginTop: theme.spacing(8),
  background: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #006847 33%, #FFFFFF 33%, #FFFFFF 66%, #CE1126 66%)',
  },
}));

const LoadingButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  '&.MuiButton-containedPrimary': {
    backgroundColor: '#006847',
    '&:hover': {
      backgroundColor: '#005438',
    },
  },
}));

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
  });

  const validateForm = () => {
    const errors = {
      username: '',
      password: '',
    };
    let isValid = true;

    if (!username.trim()) {
      errors.username = 'Username or email is required';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 4) {
      errors.password = 'Password must be at least 4 characters';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await login(username, password);
      
      if (rememberMe) {
        localStorage.setItem('rememberedUser', username);
      }
      
      setSuccess(`Welcome back, ${response.username}!`);
      
      // Navigate based on user role after a short delay to show success message
      setTimeout(() => {
        switch(response.role) {
          case 'admin':
            navigate(ROUTES.ADMIN_DASHBOARD);
            break;
          case 'worker':
            navigate(ROUTES.WORKER_DASHBOARD);
            break;
          case 'customer':
            navigate(ROUTES.MENU);
            break;
          default:
            navigate(ROUTES.HOME);
        }
      }, 1000);
      
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load remembered user on component mount
  React.useEffect(() => {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      setUsername(rememberedUser);
      setRememberMe(true);
    }
  }, []);

  const handleGuestAccess = () => {
    navigate(ROUTES.MENU);
  };

  return (
    <Container>
      <LoginContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: '#006847',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          ¡Bienvenidos!
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              width: '100%', 
              mb: 2,
              '& .MuiAlert-icon': {
                color: '#CE1126'
              }
            }}
          >
            {error}
          </Alert>
        )}

        {success && (
          <Alert 
            severity="success" 
            sx={{ 
              width: '100%', 
              mb: 2,
              '& .MuiAlert-icon': {
                color: '#006847'
              }
            }}
          >
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Username or Email"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setFormErrors({ ...formErrors, username: '' });
              setError('');
            }}
            margin="normal"
            required
            error={!!formErrors.username}
            helperText={formErrors.username}
            sx={{
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#006847',
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFormErrors({ ...formErrors, password: '' });
              setError('');
            }}
            margin="normal"
            required
            error={!!formErrors.password}
            helperText={formErrors.password}
            sx={{
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#006847',
              },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                sx={{
                  color: '#006847',
                  '&.Mui-checked': {
                    color: '#006847',
                  },
                }}
              />
            }
            label="Remember me"
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </LoadingButton>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link
                href={ROUTES.REGISTER}
                sx={{
                  color: '#006847',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleGuestAccess}
            sx={{
              width: '100%',
              borderColor: '#006847',
              color: '#006847',
              '&:hover': {
                borderColor: '#005438',
                backgroundColor: 'rgba(0, 104, 71, 0.04)',
              },
            }}
          >
            Continue as Guest
          </Button>
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate(ROUTES.HOME)}
            sx={{
              color: '#006847',
              '&:hover': {
                backgroundColor: 'rgba(0, 104, 71, 0.04)',
              },
            }}
          >
            Back to Home
          </Button>
        </Box>
      </LoginContainer>
    </Container>
  );
};

export default Login; 