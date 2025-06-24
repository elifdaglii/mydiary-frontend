import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authUtils } from '../services/api';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = authUtils.isAuthenticated();

  const handleLogout = () => {
    authUtils.removeToken();
    navigate('/login');
  };

  return (
    <nav style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 0'
        }}>
          
          {/* Logo */}
          <Link 
            to="/" 
            style={{
              color: 'white',
              fontSize: '24px',
              fontWeight: '900',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            <span style={{ fontSize: '28px' }}>📖</span>
            <span style={{
              background: 'linear-gradient(45deg, #FFD700, #FF69B4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              My Diary
            </span>
          </Link>
          
          {/* Navigation Links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: '600',
                    padding: '8px 16px',
                    borderRadius: '25px',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  🏠 Dashboard
                </Link>
                
                <Link 
                  to="/create" 
                  style={{
                    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: '700',
                    padding: '12px 24px',
                    borderRadius: '25px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    border: 'none'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-3px) scale(1.05)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  ✨ New Entry
                </Link>
                
                <button 
                  onClick={handleLogout}
                  style={{
                    color: 'white',
                    background: 'rgba(255, 99, 132, 0.2)',
                    border: '1px solid rgba(255, 99, 132, 0.4)',
                    fontWeight: '600',
                    padding: '8px 16px',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(255, 99, 132, 0.3)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(255, 99, 132, 0.2)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: '600',
                    padding: '8px 16px',
                    borderRadius: '25px',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  🔑 Login
                </Link>
                
                <Link 
                  to="/register" 
                  style={{
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: '700',
                    padding: '12px 24px',
                    borderRadius: '25px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-3px) scale(1.05)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  ✨ Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;