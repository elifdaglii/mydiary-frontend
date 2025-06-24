import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI, authUtils } from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      authUtils.setToken(response.token);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data 
        ? (typeof err.response.data === 'string' 
            ? err.response.data 
            : err.response.data.message || err.response.data.title || 'Login failed')
        : 'Login failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <div style={{
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '20px',
            animation: 'fadeIn 2s infinite alternate'
          }}>
            🔑
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            Welcome back...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      
      {/* Background Animation */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'rgba(255, 215, 0, 0.1)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 105, 180, 0.1)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>
      </div>

      <div style={{
        maxWidth: '450px',
        width: '100%',
        position: 'relative',
        zIndex: 10
      }}>
        
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            fontSize: '80px',
            marginBottom: '20px',
            animation: 'bounce 2s infinite'
          }}>
            🔐
          </div>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '900',
            margin: '0 0 10px 0',
            background: 'linear-gradient(45deg, #FFD700, #FF69B4, #00BFFF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Welcome Back
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: '0.8',
            margin: '0'
          }}>
            Enter your sanctuary ✨
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '30px',
            padding: '40px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)'
          }}>
            
            {/* Error Message */}
            {error && (
              <div style={{
                background: 'rgba(255, 99, 132, 0.2)',
                border: '1px solid rgba(255, 99, 132, 0.4)',
                borderRadius: '15px',
                padding: '16px',
                marginBottom: '30px',
                color: '#FF6B6B',
                textAlign: 'center',
                animation: 'shake 0.5s ease-in-out'
              }}>
                ⚠️ {error}
              </div>
            )}

            {/* Email Input */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '10px',
                color: 'white'
              }}>
                📧 Email
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  fontSize: '16px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '15px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid #FFD700';
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Password Input */}
            <div style={{ marginBottom: '35px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '10px',
                color: 'white'
              }}>
                🔒 Password
              </label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  fontSize: '16px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '15px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid #FFD700';
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                color: 'white',
                border: 'none',
                padding: '18px',
                fontSize: '18px',
                fontWeight: 'bold',
                borderRadius: '15px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                opacity: loading ? 0.7 : 1,
                marginBottom: '30px'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.3)';
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                }
              }}
            >
              {loading ? '🔄 Signing in...' : '🚀 Sign In'}
            </button>

            {/* Register Link */}
            <div style={{
              textAlign: 'center',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <p style={{
                fontSize: '16px',
                opacity: '0.8',
                margin: '0 0 15px 0'
              }}>
                Don't have an account yet?
              </p>
              <Link 
                to="/register"
                style={{
                  color: '#FFD700',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  padding: '10px 20px',
                  borderRadius: '25px',
                  background: 'rgba(255, 215, 0, 0.1)',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255, 215, 0, 0.2)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255, 215, 0, 0.1)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                ✨ Create Account
              </Link>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '30px',
          opacity: '0.6'
        }}>
          <p style={{ margin: '0', fontSize: '14px' }}>
            🔐 Your memories are safe with us
          </p>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </div>
  );
};

export default Login;