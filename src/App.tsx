import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { THEME, ROUTES } from './config/constants';
import { AuthProvider } from './contexts/AuthContext';
import { MenuProvider } from './contexts/MenuContext';
import Navigation from './components/Navigation';
import Box from '@mui/material/Box';

// Import pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/AdminDashboard';
import WorkerDashboard from './pages/WorkerDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Order from './pages/Order';

// Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: THEME.colors.primary,
    },
    secondary: {
      main: THEME.colors.secondary,
    },
    background: {
      default: THEME.colors.background,
    },
  },
  typography: {
    fontFamily: THEME.fonts.primary,
    h1: {
      fontFamily: THEME.fonts.secondary,
      fontSize: '3.5rem',
      fontWeight: 600,
    },
    h2: {
      fontFamily: THEME.fonts.secondary,
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h3: {
      fontFamily: THEME.fonts.secondary,
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 24px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: THEME.colors.primary,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <MenuProvider>
          <Router>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navigation />
              <Box component="main" sx={{ flexGrow: 1 }}>
                <Routes>
                  <Route path={ROUTES.HOME} element={<Home />} />
                  <Route path={ROUTES.MENU} element={<Menu />} />
                  <Route path={ROUTES.LOGIN} element={<Login />} />
                  <Route path={ROUTES.REGISTER} element={<SignUp />} />
                  <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
                  <Route path={ROUTES.WORKER_DASHBOARD} element={<WorkerDashboard />} />
                  <Route path={ROUTES.ABOUT} element={<About />} />
                  <Route path={ROUTES.CONTACT} element={<Contact />} />
                  <Route path={ROUTES.ORDER} element={<Order />} />
                  <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
                </Routes>
              </Box>
            </Box>
          </Router>
        </MenuProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
