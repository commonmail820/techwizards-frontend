export const API_BASE_URL = 'http://localhost:5000/api';  // Change this when deploying
export const GITHUB_PAGES_URL = 'https://your-username.github.io/cafe';  // Update this with your GitHub username

export const ROUTES = {
  HOME: '/',
  MENU: '/menu',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN_DASHBOARD: '/admin',
  WORKER_DASHBOARD: '/worker',
  ABOUT: '/about',
  CONTACT: '/contact',
  ORDER: '/order',
};

export const USER_ROLES = {
  GUEST: 'guest',
  ADMIN: 'admin',
  WORKER: 'worker',
};

export const THEME = {
  colors: {
    primary: '#E31837',     // Mexican Red
    secondary: '#006847',   // Mexican Green
    accent: '#FFD700',      // Gold
    background: '#FFFFFF',
    text: '#333333',
    error: '#FF0000',
  },
  fonts: {
    primary: "'Poppins', sans-serif",
    secondary: "'Playfair Display', serif",
  },
};

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideIn: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
  },
}; 