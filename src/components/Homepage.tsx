import React from 'react';
import { Link } from 'react-router-dom';

const Homepage: React.FC = () => {
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      color: '#333'
    }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '4rem', 
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
          }}>
            🌮 Authentic Mexican Restaurant
          </h1>
          <p style={{ 
            fontSize: '1.5rem', 
            marginBottom: '2rem',
            textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
          }}>
            Experience the true flavors of Mexico
          </p>
          <Link to="/signup" style={{
            background: '#d4af37',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            fontSize: '1.2rem',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            Join Our Family
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        background: '#f8f8f8'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#d4af37' }}>
          About Our Restaurant
        </h2>
        <p style={{ 
          fontSize: '1.2rem', 
          maxWidth: '800px', 
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Welcome to our authentic Mexican restaurant! We bring you the traditional flavors 
          of Mexico with fresh ingredients, family recipes passed down through generations, 
          and a warm, welcoming atmosphere that makes you feel at home.
        </p>
      </section>

      {/* Featured Dishes */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: '#d4af37' }}>
          Featured Dishes
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '10px',
            padding: '2rem',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#d4af37', marginBottom: '1rem' }}>🌮 Tacos Al Pastor</h3>
            <p>Marinated pork with pineapple, onions, and cilantro on corn tortillas</p>
            <p style={{ fontWeight: 'bold', color: '#d4af37' }}>$12.99</p>
          </div>
          <div style={{
            background: 'white',
            borderRadius: '10px',
            padding: '2rem',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#d4af37', marginBottom: '1rem' }}>🌯 Burrito Supreme</h3>
            <p>Large flour tortilla filled with your choice of meat, beans, rice, and toppings</p>
            <p style={{ fontWeight: 'bold', color: '#d4af37' }}>$14.99</p>
          </div>
          <div style={{
            background: 'white',
            borderRadius: '10px',
            padding: '2rem',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#d4af37', marginBottom: '1rem' }}>🧀 Quesadilla Grande</h3>
            <p>Grilled tortilla with melted cheese, peppers, and your choice of filling</p>
            <p style={{ fontWeight: 'bold', color: '#d4af37' }}>$11.99</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#333',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>Visit Us Today!</h3>
        <p>📍 123 Mexican Street, Food City, FC 12345</p>
        <p>📞 (555) 123-TACO</p>
        <p>🕒 Open Daily: 11AM - 10PM</p>
      </footer>
    </div>
  );
};

export default Homepage; 