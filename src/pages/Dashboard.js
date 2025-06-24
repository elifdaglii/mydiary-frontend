import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { entryAPI } from '../services/api';

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const data = await entryAPI.getAll();
      setEntries(data);
    } catch (err) {
      setError('Failed to load entries');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await entryAPI.delete(id);
        setEntries(entries.filter(entry => entry.id !== id));
      } catch (err) {
        setError('Failed to delete entry');
      }
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
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          ⏳ Loading your memories...
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
      
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        marginBottom: '40px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '900',
              margin: '0',
              background: 'linear-gradient(45deg, #FFD700, #FF69B4, #00BFFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              📖 My Diary
            </h1>
            <p style={{
              fontSize: '18px',
              opacity: '0.8',
              margin: '5px 0 0 0'
            }}>
              Your digital sanctuary ✨
            </p>
          </div>
          
          <Link 
            to="/create" 
            style={{
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
              padding: '16px 32px',
              borderRadius: '50px',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
            }}
          >
            ✨ New Entry
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 40px auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '24px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FFD700' }}>
            {entries.length}
          </div>
          <div style={{ fontSize: '14px', opacity: '0.8' }}>Total Entries</div>
        </div>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '24px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#00BFFF' }}>
            {entries.filter(e => e.mood?.includes('😊')).length}
          </div>
          <div style={{ fontSize: '14px', opacity: '0.8' }}>Happy Days</div>
        </div>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '24px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FF69B4' }}>
            {new Date().getDate()}
          </div>
          <div style={{ fontSize: '14px', opacity: '0.8' }}>Today</div>
        </div>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '24px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#32CD32' }}>
            🔥
          </div>
          <div style={{ fontSize: '14px', opacity: '0.8' }}>Streak</div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto 20px auto',
          background: 'rgba(255, 99, 132, 0.2)',
          border: '1px solid rgba(255, 99, 132, 0.3)',
          borderRadius: '15px',
          padding: '16px',
          color: '#FF6B6B'
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {entries.length === 0 ? (
          /* Empty State */
          <div style={{
            textAlign: 'center',
            padding: '80px 20px'
          }}>
            <div style={{
              fontSize: '120px',
              marginBottom: '30px',
              opacity: '0.8'
            }}>
              📝
            </div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              marginBottom: '16px'
            }}>
              Start Your Journey
            </h3>
            <p style={{
              fontSize: '18px',
              opacity: '0.8',
              marginBottom: '40px',
              maxWidth: '400px',
              margin: '0 auto 40px auto'
            }}>
              Every great story starts with a single page. What's yours?
            </p>
            <Link 
              to="/create" 
              style={{
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                padding: '20px 40px',
                borderRadius: '50px',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '18px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
              }}
            >
              🚀 Create First Entry
            </Link>
          </div>
        ) : (
          /* Entries Grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {entries.map((entry, index) => (
              <div 
                key={entry.id} 
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '25px',
                  padding: '30px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.3)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }}
              >
                {/* Entry Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '20px'
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      margin: '0 0 10px 0',
                      color: 'white'
                    }}>
                      {entry.title}
                    </h3>
                    {entry.mood && (
                      <span style={{
                        background: 'rgba(255,255,255,0.2)',
                        padding: '6px 12px',
                        borderRadius: '15px',
                        fontSize: '14px',
                        border: '1px solid rgba(255,255,255,0.3)'
                      }}>
                        {entry.mood}
                      </span>
                    )}
                  </div>
                  <span style={{
                    fontSize: '12px',
                    opacity: '0.7',
                    background: 'rgba(255,255,255,0.1)',
                    padding: '4px 8px',
                    borderRadius: '10px'
                  }}>
                    📅 {new Date(entry.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>

                {/* Entry Content */}
                <p style={{
                  opacity: '0.9',
                  lineHeight: '1.6',
                  marginBottom: '24px',
                  fontSize: '15px'
                }}>
                  {entry.content.length > 150 
                    ? entry.content.substring(0, 150) + '...' 
                    : entry.content}
                </p>

                {/* Entry Actions */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <Link 
                    to={`/edit/${entry.id}`}
                    style={{
                      color: '#00BFFF',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '14px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = '#87CEEB';
                      e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = '#00BFFF';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    ✏️ Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(entry.id)}
                    style={{
                      color: '#FF6B6B',
                      background: 'none',
                      border: 'none',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = '#FF9999';
                      e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = '#FF6B6B';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;