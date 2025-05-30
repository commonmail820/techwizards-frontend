# TechWizards Frontend - Mexican Restaurant

## Overview
This is the frontend application for the Mexican Restaurant, built with React, TypeScript, and Vite. It provides a modern, responsive user interface for customers, workers, and administrators.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Backend API running (techwizards-backend)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd techwizards-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your backend URL
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 🌐 Production Deployment

### Render Deployment
This repository is configured for deployment on Render.

1. **Environment Variables on Render:**
   - `VITE_BACKEND_URL`: Your backend API URL (e.g., https://techwizards-backend.onrender.com)
   - `VITE_APP_NAME`: Mexican Restaurant
   - `VITE_APP_VERSION`: 1.0.0

2. **Build Command:**
   ```bash
   npm install && npm run build
   ```

3. **Publish Directory:**
   ```
   dist
   ```

### Other Platforms
For other hosting platforms:
- Build the project: `npm run build`
- Deploy the `dist` folder
- Set environment variables as needed

## 📁 Project Structure

```
techwizards-frontend/
├── public/                     # Static assets
├── src/
│   ├── components/            # Reusable UI components
│   ├── contexts/             # React contexts (Auth, etc.)
│   ├── pages/                # Page components
│   ├── services/             # API services
│   ├── config/               # Configuration files
│   ├── types/                # TypeScript type definitions
│   └── App.tsx               # Main app component
├── package.json              # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── .env.example             # Environment variables template
└── README.md                # This file
```

## 🎯 Features

### Authentication System
- ✅ User registration with validation
- ✅ Login with username or email
- ✅ Role-based access control
- ✅ Persistent sessions
- ✅ Remember me functionality

### User Roles & Access
- **Customer**: Menu browsing, ordering, profile management
- **Worker**: Order management, kitchen operations
- **Admin**: Full system access, user management

### UI/UX Features
- ✅ Responsive design (mobile-first)
- ✅ Modern Material-UI components
- ✅ Smooth animations with Framer Motion
- ✅ Mexican-themed color scheme
- ✅ Accessibility features
- ✅ Loading states and error handling

## 🔧 Configuration

### Environment Variables
Create a `.env` file with:
```env
# Backend API URL
VITE_BACKEND_URL=https://your-backend-url.com

# App Configuration
VITE_APP_NAME=Mexican Restaurant
VITE_APP_VERSION=1.0.0
```

### Backend Integration
The frontend communicates with the backend API for:
- User authentication
- User registration
- Data management
- File uploads (future)

## 🛠️ Development

### Available Scripts
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Type checking
npm run type-check
```

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (if configured)
- **Vite**: Fast development and building

## 🎨 Styling

### Design System
- **Primary Color**: #006847 (Mexican Green)
- **Secondary Color**: #CE1126 (Mexican Red)
- **Accent Color**: #FFFFFF (White)
- **Typography**: Roboto font family
- **Components**: Material-UI (MUI)

### Responsive Design
- Mobile-first approach
- Breakpoints: xs, sm, md, lg, xl
- Flexible grid system
- Touch-friendly interfaces

## 🔐 Authentication Flow

1. **Registration**: New users sign up with email/username
2. **Login**: Users authenticate with username or email
3. **Role Assignment**: Automatic role-based redirects
4. **Session Management**: Persistent login with localStorage
5. **Protected Routes**: Role-based access control

## 🧪 Testing

### Manual Testing
1. **Registration Flow**:
   - Navigate to `/register`
   - Fill out signup form
   - Verify success message and redirect

2. **Login Flow**:
   - Navigate to `/login`
   - Enter credentials
   - Verify role-based redirect

3. **Navigation**:
   - Test all menu items
   - Verify protected routes
   - Check responsive design

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔄 Backend Integration

### API Endpoints Used
- `POST /signup` - User registration
- `POST /auth/login` - User authentication
- `GET /users` - User management (admin)
- `GET /health` - Health check

### Error Handling
- Network errors with user-friendly messages
- Form validation with real-time feedback
- Loading states for better UX
- Retry mechanisms for failed requests

## 📱 Pages & Routes

### Public Routes
- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/menu` - Menu (guest access)

### Protected Routes
- `/admin` - Admin dashboard
- `/worker` - Worker dashboard
- `/profile` - User profile
- `/orders` - Order management

## 🚀 Performance

### Optimization Features
- **Code Splitting**: Lazy loading of routes
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image and bundle optimization
- **Caching**: Browser caching strategies
- **CDN Ready**: Static asset delivery

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npm run preview
```

## 🐛 Troubleshooting

### Common Issues
- **Backend Connection**: Check `VITE_BACKEND_URL` environment variable
- **CORS Errors**: Ensure backend allows your frontend domain
- **Build Failures**: Check Node.js version (18+ required)
- **Route Issues**: Verify React Router configuration

### Debug Mode
```bash
# Run with debug logging
npm run dev -- --debug
```

## 📞 Support

For issues or questions:
1. Check this README for common solutions
2. Review browser console for errors
3. Verify backend API is running
4. Check environment variables

## 🔮 Future Enhancements

### Planned Features
- [ ] Menu management interface
- [ ] Order tracking system
- [ ] Payment integration
- [ ] Real-time notifications
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Progressive Web App (PWA)

### Technical Improvements
- [ ] Unit testing with Jest
- [ ] E2E testing with Cypress
- [ ] Storybook for component documentation
- [ ] Performance monitoring
- [ ] Error tracking (Sentry)

---

**Status**: ✅ Production Ready
**Last Updated**: May 29, 2025
**Version**: 1.0.0
**Hosting**: Render.com
**Framework**: React 18 + TypeScript + Vite
