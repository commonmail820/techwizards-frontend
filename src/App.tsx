import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './components/Homepage';
import SignupForm from './components/SignupForm';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav style={{
          background: '#333',
          padding: '1rem',
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
          boxSizing: 'border-box'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <Link to="/" style={{
              color: '#d4af37',
              textDecoration: 'none',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              🌮 Mexican Restaurant
            </Link>
            <div>
              <Link to="/" style={{
                color: 'white',
                textDecoration: 'none',
                marginRight: '2rem',
                fontSize: '1.1rem'
              }}>
                Home
              </Link>
              <Link to="/signup" style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.1rem'
              }}>
                Sign Up
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div style={{ marginTop: '70px' }}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={
              <div style={{ 
                padding: '2rem',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  background: 'white',
                  borderRadius: '10px',
                  padding: '2rem',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                  maxWidth: '500px',
                  width: '100%'
                }}>
                  <h1 style={{ 
                    textAlign: 'center', 
                    marginBottom: '2rem',
                    color: '#333'
                  }}>
                    Join Our Restaurant Family
                  </h1>
                  <SignupForm />
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App; 