import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { entryAPI } from '../services/api';

const EditEntry = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchLoading, setFetchLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEntry();
  }, [id]);

  const fetchEntry = async () => {
    try {
      const entry = await entryAPI.getById(id);
      setFormData({
        title: entry.title,
        content: entry.content,
        mood: entry.mood || ''
      });
    } catch (err) {
      setError('Failed to load entry');
    } finally {
      setFetchLoading(false);
    }
  };

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
      await entryAPI.update(id, formData);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data 
        ? (typeof err.response.data === 'string' 
            ? err.response.data 
            : err.response.data.message || err.response.data.title || 'Failed to update entry')
        : 'Failed to update entry';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
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
            animation: 'spin 2s linear infinite'
          }}>
            📖
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            Loading your memory...
          </div>
        </div>
      </div>
    );
  }

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
            animation: 'pulse 1.5s infinite'
          }}>
            💫
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            Updating your memory...
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
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        paddingTop: '40px'
      }}>
        
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            fontSize: '64px',
            marginBottom: '20px'
          }}>
            ✏️
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
            Edit Your Memory
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: '0.8',
            margin: '0'
          }}>
            Refine your thoughts and feelings ✨
          </p>
        </div>

        {/* Form */}
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
                textAlign: 'center'
              }}>
                ⚠️ {error}
              </div>
            )}

            {/* Title Input */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '10px',
                color: 'white'
              }}>
                📝 Title
              </label>
              <input
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="What's on your mind today?"
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
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'scale(1)';
                }}
              />
            </div>

            {/* Mood Select */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '10px',
                color: 'white'
              }}>
                🎭 How are you feeling?
              </label>
              <select
                name="mood"
                value={formData.mood}
                onChange={handleChange}
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
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid rgba(255, 255, 255, 0.2)';
                }}
              >
                <option value="" style={{ background: '#333', color: 'white' }}>Select your mood</option>
                <option value="😊 Happy" style={{ background: '#333', color: 'white' }}>😊 Happy</option>
                <option value="😢 Sad" style={{ background: '#333', color: 'white' }}>😢 Sad</option>
                <option value="😌 Calm" style={{ background: '#333', color: 'white' }}>😌 Calm</option>
                <option value="😤 Angry" style={{ background: '#333', color: 'white' }}>😤 Angry</option>
                <option value="😴 Tired" style={{ background: '#333', color: 'white' }}>😴 Tired</option>
                <option value="🤔 Thoughtful" style={{ background: '#333', color: 'white' }}>🤔 Thoughtful</option>
                <option value="😍 Excited" style={{ background: '#333', color: 'white' }}>😍 Excited</option>
              </select>
            </div>

            {/* Content Textarea */}
            <div style={{ marginBottom: '40px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '10px',
                color: 'white'
              }}>
                📖 Your Story
              </label>
              <textarea
                name="content"
                required
                value={formData.content}
                onChange={handleChange}
                rows={12}
                placeholder="Pour your heart out... What happened today? How did it make you feel?"
                style={{
                  width: '100%',
                  padding: '20px',
                  fontSize: '16px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '15px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  lineHeight: '1.6',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid #FFD700';
                  e.target.style.transform = 'scale(1.01)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'scale(1)';
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  color: 'white',
                  border: 'none',
                  padding: '16px 40px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  borderRadius: '25px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                  opacity: loading ? 0.7 : 1
                }}
                onMouseOver={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(-3px) scale(1.05)';
                    e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.3)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                  }
                }}
              >
                {loading ? '💫 Updating...' : '✨ Update Entry'}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  padding: '16px 40px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
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
                🏠 Back to Dashboard
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        input::placeholder, textarea::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </div>
  );
};

export default EditEntry;