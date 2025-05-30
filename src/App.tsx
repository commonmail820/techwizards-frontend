import React from 'react';

function App() {
  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center', 
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        🎉 Welcome to TechWizards Frontend
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        Your simple and clean homepage is now live!
      </p>
      <div style={{ 
        background: 'rgba(255,255,255,0.1)', 
        padding: '2rem', 
        borderRadius: '10px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2>🚀 Deployment Successful!</h2>
        <p>This is a clean, simple React application built with:</p>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>⚛️ React 18</li>
          <li>📦 Vite</li>
          <li>🔷 TypeScript</li>
          <li>🌐 Deployed on Render</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
